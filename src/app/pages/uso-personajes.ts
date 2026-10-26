import { Component, computed, inject, linkedSignal } from '@angular/core';
import { Podio, Ranking } from '../components/ranking';
import { JuegoService } from '../juego.service';

const LIMITE = 15;

@Component({
  selector: 'app-uso-personajes',
  imports: [Podio, Ranking],
  templateUrl: './uso-personajes.html',
})
export class UsoPersonajes {
  protected readonly juego = inject(JuegoService);

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
}
