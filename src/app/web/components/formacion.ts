import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Avatar, degradado } from './avatar';
import { FORMACIONES } from '../data/formaciones';
import { PJ, ROL_COLOR, ROL_ICONO } from '../data/personajes';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-formacion',
  imports: [Avatar, NgTemplateOutlet],
  host: { style: 'display:contents' },
  templateUrl: './formacion.html',
})
export class Formacion {
  protected readonly juego = inject(JuegoService);
  readonly submodo = input.required<string>();
  protected readonly formacion = computed(() => FORMACIONES[this.submodo()]);
  protected readonly fases = computed(() => {
    const f = this.formacion();
    return f ? [f, ...(f.alternativas ?? [])] : [];
  });
  protected readonly fondo = degradado;
  protected readonly rolColor = ROL_COLOR;
  protected readonly rolIcono = ROL_ICONO;

  protected rol(n: string) {
    return PJ[n]?.rol;
  }
}
