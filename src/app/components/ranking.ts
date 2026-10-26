import { Component, computed, inject, input } from '@angular/core';
import { Avatar } from './avatar';
import { Conteo, JuegoService } from '../juego.service';

export function pct(n: number, total: number): number {
  return total ? Math.round((n / total) * 100) : 0;
}

/** Podio de los tres primeros (orden 2º · 1º · 3º). */
@Component({
  selector: 'app-podio',
  imports: [Avatar],
  host: { class: 'spod' },
  templateUrl: './podio.html',
})
export class Podio {
  protected readonly juego = inject(JuegoService);
  readonly items = input.required<Conteo[]>();
  readonly total = input.required<number>();
  protected readonly pct = pct;
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
  protected readonly juego = inject(JuegoService);
  readonly items = input.required<Conteo[]>();
  readonly total = input.required<number>();
  readonly relativa = input(false);
  protected readonly pct = pct;
}
