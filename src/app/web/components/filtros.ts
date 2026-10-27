import { Component, computed, inject, input } from '@angular/core';
import { PERSONAJES, PJ, ROL_COLOR, ROL_ICONO, Rol } from '../data/personajes';
import { JuegoService } from '../juego.service';
import { Leyenda } from './leyenda';

/** Submenú del menú principal con los filtros de la página activa. */
@Component({
  selector: 'app-filtros',
  imports: [Leyenda],
  host: { class: 'subm' },
  templateUrl: './filtros.html',
})
export class Filtros {
  protected readonly juego = inject(JuegoService);
  readonly ruta = input.required<string>();
  protected readonly roles = [...new Set(PERSONAJES.map((p) => p.rol).filter((r): r is Rol => !!r))];
  protected readonly rolColor = ROL_COLOR;
  protected readonly rolIcono = ROL_ICONO;

  protected readonly conteo = computed(() => {
    const c: Partial<Record<Rol, number>> = {};
    for (const p of this.juego.personajes) {
      const r = PJ[p.nombre]?.rol;
      if (r) c[r] = (c[r] ?? 0) + 1;
    }
    return c;
  });

  protected readonly categorias = computed(() => {
    const c = this.juego.categoria();
    return this.juego.categorias.filter((x) => !c || x.nombre === c);
  });

  protected equiposDe(categoria: string) {
    return this.juego.equipos.filter((e) => e.categoria === categoria);
  }
}
