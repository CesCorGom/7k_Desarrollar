import { Component, computed, effect, inject, signal } from '@angular/core';
import { degradado, iniciales } from './avatar';
import { CatalogoService } from '../../application/catalogo.service';
import { SeleccionStore } from '../../application/seleccion.store';
import { UsosService } from '../../application/usos.service';
import { porcentaje } from '../../domain/services/conteo';
import { ROL_COLOR, ROL_ICONO } from '../shared/rol-estilo';

@Component({
  selector: 'app-personaje-modal',
  host: {
    class: 'modal fade mo',
    role: 'dialog',
    'aria-modal': 'true',
    tabindex: '-1',
    '[class.show]': '!!uso()',
    '[attr.aria-labelledby]': "uso() ? 'mt-' + uso()!.nombre : null",
    '(click)': 'cerrarFondo($event)',
    '(document:keydown.escape)': 'cerrar()',
  },
  templateUrl: './personaje-modal.html',
})
export class PersonajeModal {
  protected readonly catalogo = inject(CatalogoService);
  protected readonly usos = inject(UsosService);
  private readonly seleccion = inject(SeleccionStore);
  protected readonly uso = computed(() => {
    const n = this.seleccion.abierto();
    return (n && this.usos.uso(n)) || null;
  });
  protected readonly pj = computed(() => this.catalogo.personaje(this.seleccion.abierto() ?? ''));
  protected readonly total = this.catalogo.totalEquipos;
  protected readonly rolColor = ROL_COLOR;
  protected readonly rolIcono = ROL_ICONO;
  protected readonly pct = porcentaje;
  protected readonly fondo = degradado;
  protected readonly ini = iniciales;
  /** Categorías desplegadas en el acordeón; se reinicia al abrir otro personaje. */
  private readonly abiertas = signal(new Set<string>());
  /** Imagen girada mostrando el rol; vuelve al frente al abrir otro personaje. */
  protected readonly volteada = signal(false);

  constructor() {
    effect(() => {
      document.body.style.overflow = this.uso() ? 'hidden' : '';
    });
    effect(() => {
      const u = this.uso();
      const primera = u && this.catalogo.categorias.find((c) => u.porCategoria[c.nombre]);
      this.abiertas.set(new Set(primera ? [primera.nombre] : []));
      this.volteada.set(false);
    });
  }

  estaAbierta(cat: string): boolean {
    return this.abiertas().has(cat);
  }

  alternar(cat: string): void {
    this.abiertas.update((s) => {
      const n = new Set(s);
      if (!n.delete(cat)) n.add(cat);
      return n;
    });
  }

  cerrar(): void {
    this.seleccion.cerrar();
  }

  cerrarFondo(e: MouseEvent): void {
    if (e.target === e.currentTarget) this.cerrar();
  }
}
