import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { Formacion } from '../components/formacion';
import { Podio, Ranking } from '../components/ranking';
import { COLOR_CATEGORIA } from '../data/modos';
import { JuegoService } from '../juego.service';

const LIMITE = 15;

@Component({
  selector: 'app-uso-personajes',
  imports: [Formacion, Podio, Ranking],
  template: `
    <app-podio [items]="ranking()" [total]="totalFiltrado()" />
    <h2 class="sh">Top de uso{{ filtro() }} ({{ totalFiltrado() }} equipos)</h2>
    <app-ranking [items]="visibles()" [total]="totalFiltrado()" [relativa]="true" />
    @if (ocultos() > 0) {
      <p class="ctr"><button class="sbtn" (click)="limite.set(0)">Ver los {{ ocultos() }} restantes</button></p>
    }

    <h2 class="sh">Favoritos por jefe</h2>
    @if (!juego.categoria()) {
      <div class="schips">
        @for (c of juego.categorias; track c.nombre) {
          <button class="sc" [class.on]="c.nombre === chip()" [style.--c]="c.color" (click)="chip.set(c.nombre)">{{ c.nombre }}</button>
        }
      </div>
    }
    @for (e of modos(); track e.submodo) {
      <div class="smc" [style.--c]="color[e.categoria]">
        <h3>{{ e.submodo }}</h3>
        <div class="spsc">
          @for (n of e.miembros; track n) {
            <button class="spl" [class.sel]="juego.abierto() === n" (click)="juego.abierto.set(n)">{{ n }}</button>
          }
        </div>
        <app-formacion [submodo]="e.submodo" />
      </div>
    }
  `,
})
export class UsoPersonajes {
  protected readonly juego = inject(JuegoService);
  protected readonly color = COLOR_CATEGORIA;
  protected readonly chip = signal(this.juego.categorias[0].nombre);

  protected readonly ranking = this.juego.rankingPersonajes;
  protected readonly totalFiltrado = computed(() => this.juego.equiposFiltrados().length);
  /** Vuelve a 15 cada vez que cambia el filtro. 0 = sin límite. */
  protected readonly limite = linkedSignal({ source: this.ranking, computation: () => LIMITE });
  protected readonly visibles = computed(() => (this.limite() ? this.ranking().slice(0, this.limite()) : this.ranking()));
  protected readonly ocultos = computed(() => this.ranking().length - this.visibles().length);

  protected readonly filtro = computed(() => {
    const c = this.juego.categoria();
    return c ? ' · ' + (this.juego.submodo() ?? c) : '';
  });

  protected readonly modos = computed(() => {
    const c = this.juego.categoria() ?? this.chip(), s = this.juego.submodo();
    return this.juego.equipos.filter((e) => e.categoria === c && (!s || e.submodo === s));
  });
}
