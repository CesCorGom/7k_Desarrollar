import { Component, computed, inject, input } from '@angular/core';
import { Avatar } from './avatar';
import { SeleccionStore } from '../../application/seleccion.store';
import { Conteo } from '../../domain/models/estadistica';
import { porcentaje } from '../../domain/services/conteo';

/** Podio de los tres primeros (orden 2º · 1º · 3º). */
@Component({
  selector: 'app-podio',
  imports: [Avatar],
  host: { class: 'spod' },
  templateUrl: './podio.html',
})
export class Podio {
  protected readonly seleccion = inject(SeleccionStore);
  readonly items = input.required<Conteo[]>();
  readonly total = input.required<number>();
  protected readonly pct = porcentaje;
  protected readonly podio = computed(() =>
    [1, 0, 2]
      .map((i, k) => ({ i, c: this.items()[i], medalla: ['🥈', '🥇', '🥉'][k] }))
      .filter((p) => p.c),
  );
}

/** Lista con barras. Con `relativa` la barra se mide contra el primero; si no, contra el total. */
@Component({
  selector: 'app-ranking',
  imports: [Avatar],
  host: { style: 'display:block' },
  templateUrl: './ranking.html',
})
export class Ranking {
  protected readonly seleccion = inject(SeleccionStore);
  readonly items = input.required<Conteo[]>();
  readonly total = input.required<number>();
  readonly relativa = input(false);
  protected readonly pct = porcentaje;
}
