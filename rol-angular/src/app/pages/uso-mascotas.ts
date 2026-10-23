import { Component, computed, inject } from '@angular/core';
import { Avatar } from '../components/avatar';
import { Podio, Ranking, pct } from '../components/ranking';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-uso-mascotas',
  imports: [Avatar, Podio, Ranking],
  template: `
    <app-podio [items]="juego.rankingMascotas()" [total]="total()" />
    <h2 class="sh">Uso de mascotas{{ filtro() }} ({{ total() }} equipos)</h2>
    <app-ranking [items]="juego.rankingMascotas()" [total]="total()" />

    <h2 class="sh">Mascotas por modo</h2>
    @for (g of porModo(); track g.categoria.nombre) {
      <div class="smc" [style.--c]="g.categoria.color">
        <h3>{{ g.categoria.nombre }}</h3>
        @for (m of g.mascotas; track m.nombre) {
          <div class="sr" (click)="juego.abierto.set(m.nombre)">
            <app-avatar [nombre]="m.nombre" />
            <div class="mid">
              <div class="t">{{ m.nombre }}<i>{{ m.submodos.length }} de {{ g.total }} ({{ pct(m.submodos.length, g.total) }}%)</i></div>
              <div class="sb"><div [style.width.%]="pct(m.submodos.length, g.total)" [style.background]="g.categoria.color"></div></div>
              <div class="bs">{{ m.submodos.join(' · ') }}</div>
            </div>
          </div>
        }
      </div>
    } @empty {
      <div class="empty">Sin datos</div>
    }
  `,
})
export class UsoMascotas {
  protected readonly juego = inject(JuegoService);
  protected readonly pct = pct;
  protected readonly total = computed(() => this.juego.equiposFiltrados().length);

  protected readonly filtro = computed(() => {
    const c = this.juego.categoria();
    return c ? ' · ' + (this.juego.submodo() ?? c) : '';
  });

  protected readonly porModo = computed(() => {
    const equipos = this.juego.equiposFiltrados();
    return this.juego.categorias
      .map((categoria) => {
        const deCat = equipos.filter((e) => e.categoria === categoria.nombre);
        const m = new Map<string, string[]>();
        deCat.forEach((e) => this.juego.mascotasDeEquipo(e).forEach((x) => m.set(x, [...(m.get(x) ?? []), e.submodo])));
        const mascotas = [...m]
          .map(([nombre, submodos]) => ({ nombre, submodos }))
          .sort((a, b) => b.submodos.length - a.submodos.length || a.nombre.localeCompare(b.nombre));
        return { categoria, total: deCat.length, mascotas };
      })
      .filter((g) => g.mascotas.length);
  });
}
