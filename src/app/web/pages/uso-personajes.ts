import { Component, computed, inject, linkedSignal } from '@angular/core';
import { FiltrosStore } from '../../application/filtros.store';
import { RankingsService } from '../../application/rankings.service';
import { porcentaje } from '../../domain/services/conteo';
import { Podio, Ranking } from '../components/ranking';

const LIMITE = 15;

@Component({
  selector: 'app-uso-personajes',
  imports: [Podio, Ranking],
  templateUrl: './uso-personajes.html',
})
export class UsoPersonajes {
  private readonly rankings = inject(RankingsService);
  protected readonly pct = porcentaje;
  protected readonly LIMITE = LIMITE;

  protected readonly ranking = this.rankings.personajes;
  protected readonly totalFiltrado = this.rankings.totalEquipos;
  /** Vuelve a 15 cada vez que cambia el filtro. 0 = sin límite. */
  protected readonly limite = linkedSignal({ source: this.ranking, computation: () => LIMITE });
  protected readonly visibles = computed(() => (this.limite() ? this.ranking().slice(0, this.limite()) : this.ranking()));
  protected readonly ocultos = computed(() => this.ranking().length - this.visibles().length);

  protected readonly filtro = inject(FiltrosStore).sufijo;
}
