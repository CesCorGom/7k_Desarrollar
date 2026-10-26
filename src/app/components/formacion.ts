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
  template: `
    @if (formacion(); as f) {
      <div class="fm">
        @if (fases().length > 1) {
          <div class="fph">
            @for (x of fases(); track $index) {
              <div class="fp">
                <div class="fpt">Fase {{ $index + 1 }}</div>
                <ng-container *ngTemplateOutlet="lineup; context: { $implicit: x }" />
              </div>
            }
          </div>
        } @else {
          <ng-container *ngTemplateOutlet="lineup; context: { $implicit: f }" />
        }

        @if (f.prioridad?.length) {
          <div class="fh">Prioridad habilidad</div>
          <div class="fr">
            <span class="fl"> </span>
            <div class="fsc">
              @for (p of f.prioridad; track $index) {
                <div class="ft2">
                  <div class="av pn" [style.background]="fondo(p)">{{ $index + 1 }}</div>
                  <i>{{ p }}</i>
                </div>
              }
            </div>
          </div>
        } @else {
          <div class="fr"><span class="fl"> </span></div>
        }
      </div>
    }

    <ng-template #lineup let-x>
      <div class="fh">Alineación <b>{{ x.al }}</b></div>
      <ng-container *ngTemplateOutlet="fila; context: { $implicit: 'Adelante', n: x.adelante }" />
      <ng-container *ngTemplateOutlet="fila; context: { $implicit: 'Atrás', n: x.atras }" />
      <ng-container *ngTemplateOutlet="fila; context: { $implicit: 'Mascota', n: x.mascota }" />
    </ng-template>

    <ng-template #fila let-label let-n="n">
      <div class="fr">
        <span class="fl">{{ label }}</span>
        @for (nombre of n; track nombre) {
          <button class="ft2" (click)="juego.abierto.set(nombre)">
            <span class="fav">
              <app-avatar [nombre]="nombre" />
              @if (rol(nombre); as r) {
                <span class="frb" [style.border-color]="rolColor[r]">
                  @if (rolIcono[r].endsWith('.svg')) {<img [src]="rolIcono[r]" alt="" />} @else {<span [style.color]="rolColor[r]">{{ rolIcono[r] }}</span>}
                </span>
              }
            </span>
            <i>{{ nombre }}</i>
          </button>
        }
      </div>
    </ng-template>
  `,
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
