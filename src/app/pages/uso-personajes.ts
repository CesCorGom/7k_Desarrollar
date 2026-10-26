import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { Formacion } from '../components/formacion';
import { Podio, Ranking } from '../components/ranking';
import { COLOR_CATEGORIA } from '../data/modos';
import { JuegoService } from '../juego.service';

const LIMITE = 15;

@Component({
  selector: 'app-uso-personajes',
  imports: [Formacion, Podio, Ranking],
  templateUrl: './uso-personajes.html',
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
