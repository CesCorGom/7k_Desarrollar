import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Avatar, degradado } from './avatar';
import { CatalogoService } from '../../application/catalogo.service';
import { SeleccionStore } from '../../application/seleccion.store';
import { fasesDe } from '../../domain/models/formacion';
import { ROL_COLOR, ROL_ICONO } from '../shared/rol-estilo';

@Component({
  selector: 'app-formacion',
  imports: [Avatar, NgTemplateOutlet],
  host: { style: 'display:contents' },
  templateUrl: './formacion.html',
})
export class Formacion {
  private readonly catalogo = inject(CatalogoService);
  protected readonly seleccion = inject(SeleccionStore);
  readonly submodo = input.required<string>();
  protected readonly formacion = computed(() => this.catalogo.formacion(this.submodo()));
  protected readonly fases = computed(() => fasesDe(this.formacion()));
  protected readonly fondo = degradado;
  protected readonly rolColor = ROL_COLOR;
  protected readonly rolIcono = ROL_ICONO;

  protected rol(n: string) {
    return this.catalogo.rol(n);
  }
}
