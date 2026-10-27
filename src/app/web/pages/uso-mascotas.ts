import { Component, computed, inject, linkedSignal } from '@angular/core';
import { FiltrosStore } from '../../application/filtros.store';
import { RankingsService } from '../../application/rankings.service';
import { SeleccionStore } from '../../application/seleccion.store';
import { porcentaje } from '../../domain/services/conteo';
import { Avatar } from '../components/avatar';
import { Podio, Ranking } from '../components/ranking';

@Component({
  selector: 'app-uso-mascotas',
  imports: [Avatar, Podio, Ranking],
  templateUrl: './uso-mascotas.html',
})
export class UsoMascotas {
  private readonly rankings = inject(RankingsService);
  protected readonly seleccion = inject(SeleccionStore);
  protected readonly pct = porcentaje;
  protected readonly total = this.rankings.totalEquipos;
  protected readonly ranking = this.rankings.mascotas;
  protected readonly porModo = this.rankings.mascotasPorModo;
  protected readonly filtro = inject(FiltrosStore).sufijo;

  /** Modos desplegados; al cambiar el filtro solo queda abierto el primero. */
  protected readonly abiertas = linkedSignal({
    source: this.porModo,
    computation: (g) => new Set(g.slice(0, 1).map((x) => x.categoria.nombre)),
  });
  protected readonly todasAbiertas = computed(() => this.abiertas().size === this.porModo().length);

  protected alternar(cat: string): void {
    this.abiertas.update((s) => {
      const n = new Set(s);
      if (!n.delete(cat)) n.add(cat);
      return n;
    });
  }

  protected alternarTodas(): void {
    this.abiertas.set(new Set(this.todasAbiertas() ? [] : this.porModo().map((g) => g.categoria.nombre)));
  }
}
