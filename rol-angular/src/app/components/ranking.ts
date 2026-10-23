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
  template: `
    @for (p of podio(); track p.c.nombre) {
      <div class="sp" [class.f]="p.i === 0" (click)="juego.abierto.set(p.c.nombre)">
        <div class="medal">{{ p.medalla }}</div>
        <app-avatar [nombre]="p.c.nombre" />
        <b>{{ p.c.nombre }}</b>
        <span>{{ p.c.total }} de {{ total() }} ({{ pct(p.c.total, total()) }}%)</span>
      </div>
    }
  `,
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
  template: `
    @for (p of items(); track p.nombre; let i = $index) {
      <div class="sr" (click)="juego.abierto.set(p.nombre)">
        <span class="no">{{ i + 1 }}</span>
        <app-avatar [nombre]="p.nombre" />
        <div class="mid">
          <div class="t">
            {{ p.nombre }}
            <i>{{ p.total }}{{ relativa() ? '' : ' de ' + total() }} ({{ pct(p.total, total()) }}%)</i>
          </div>
          <div class="sb">
            <div
              [style.width.%]="relativa() ? pct(p.total, items()[0].total) : pct(p.total, total())"
              [style.background]="i === 0 ? 'linear-gradient(90deg,#f5b301,#ff4d5e)' : 'linear-gradient(90deg,#4aa3ff,#b86bff)'"
            ></div>
          </div>
        </div>
      </div>
    } @empty {
      <div class="empty">Sin datos</div>
    }
  `,
})
export class Ranking {
  protected readonly juego = inject(JuegoService);
  readonly items = input.required<Conteo[]>();
  readonly total = input.required<number>();
  readonly relativa = input(false);
  protected readonly pct = pct;
}
