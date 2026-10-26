import { Component, computed, inject } from '@angular/core';
import { Avatar } from '../components/avatar';
import { Podio, Ranking, pct } from '../components/ranking';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-uso-mascotas',
  imports: [Avatar, Podio, Ranking],
  templateUrl: './uso-mascotas.html',
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
