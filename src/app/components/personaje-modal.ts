import { Component, computed, effect, inject } from '@angular/core';
import { degradado, iniciales } from './avatar';
import { pct } from './ranking';
import { PJ, ROL_COLOR, ROL_ICONO } from '../data/personajes';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-personaje-modal',
  host: {
    class: 'mo',
    role: 'dialog',
    'aria-modal': 'true',
    '[class.show]': '!!uso()',
    '(click)': 'cerrarFondo($event)',
    '(document:keydown.escape)': 'cerrar()',
  },
  template: `
    @if (uso(); as u) {
      <div class="mb">
        <button class="mx" aria-label="Cerrar" (click)="cerrar()">✕</button>
        @if (pj()?.img; as src) {
          <div class="mi" [style.background-image]="'url(' + src + ')'"></div>
        } @else {
          <div class="mi" [style.background]="fondo(u.nombre)">{{ ini(u.nombre) }}</div>
        }
        <div class="mn">{{ u.nombre }}</div>
        @if (pj()?.rol; as rol) {
          <div class="ms">Rol: <b [style.color]="rolColor[rol]">{{ rol }}</b>@if (rolIcono[rol].endsWith('.svg')) {<img class="ri" [src]="rolIcono[rol]" alt="" />} @else {<span class="ri" [style.color]="rolColor[rol]">{{ rolIcono[rol] }}</span>}</div>
        }
        @if (u.mascota) {
          <div class="ms">🐾 Mascota · usada en {{ u.total }} de {{ total }} equipos ({{ pct(u.total, total) }}%)</div>
          <div class="mbar"><div [style.width.%]="pct(u.total, total)"></div></div>
        } @else {
          <div class="ms">
            Aparece en {{ u.total }} de {{ total }} equipos ({{ pct(u.total, total) }}%) · puesto {{ juego.puesto(u.nombre) }} en uso
          </div>
          <div class="mbar"><div [style.width.%]="pct(u.total, juego.maxUso)"></div></div>
        }
        <div class="ml">
          @for (c of juego.categorias; track c.nombre) {
            @if (u.porCategoria[c.nombre]; as subs) {
              <div class="mg" [style.--c]="c.color">
                <b>{{ c.nombre }}</b>
                @for (s of subs; track $index) {
                  <span>{{ s }}</span>
                }
              </div>
            }
          }
        </div>
      </div>
    }
  `,
})
export class PersonajeModal {
  protected readonly juego = inject(JuegoService);
  protected readonly uso = computed(() => {
    const n = this.juego.abierto();
    return n ? this.juego.usos[n] : null;
  });
  protected readonly pj = computed(() => PJ[this.juego.abierto() ?? '']);
  protected readonly total = this.juego.totalEquipos;
  protected readonly rolColor = ROL_COLOR;
  protected readonly rolIcono = ROL_ICONO;
  protected readonly pct = pct;
  protected readonly fondo = degradado;
  protected readonly ini = iniciales;

  constructor() {
    effect(() => {
      document.body.style.overflow = this.uso() ? 'hidden' : '';
    });
  }

  cerrar(): void {
    this.juego.abierto.set(null);
  }

  cerrarFondo(e: MouseEvent): void {
    if (e.target === e.currentTarget) this.cerrar();
  }
}
