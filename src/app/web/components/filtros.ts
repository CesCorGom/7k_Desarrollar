import { Component, computed, inject, input } from '@angular/core';
import { CatalogoService } from '../../application/catalogo.service';
import { FiltrosStore } from '../../application/filtros.store';
import { UsosService } from '../../application/usos.service';
import { ROL_COLOR, ROL_ICONO } from '../shared/rol-estilo';
import { Leyenda } from './leyenda';

/** Submenú del menú principal con los filtros de la página activa. */
@Component({
  selector: 'app-filtros',
  imports: [Leyenda],
  host: { class: 'subm' },
  templateUrl: './filtros.html',
})
export class Filtros {
  protected readonly catalogo = inject(CatalogoService);
  protected readonly filtros = inject(FiltrosStore);
  readonly ruta = input.required<string>();
  protected readonly roles = this.catalogo.roles;
  private readonly usos = inject(UsosService);
  protected readonly porRol = this.usos.porRol;
  protected readonly totalPersonajes = this.usos.personajes.length;
  protected readonly rolColor = ROL_COLOR;
  protected readonly rolIcono = ROL_ICONO;

  protected readonly categorias = computed(() => {
    const c = this.filtros.categoria();
    return this.catalogo.categorias.filter((x) => !c || x.nombre === c);
  });
}
