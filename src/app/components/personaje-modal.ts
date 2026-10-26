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
  templateUrl: './personaje-modal.html',
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
