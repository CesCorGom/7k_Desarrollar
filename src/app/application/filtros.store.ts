import { Injectable, computed, signal } from '@angular/core';
import { Rol } from '../domain/models/personaje';

/** Estado de los filtros que elige el usuario. */
@Injectable({ providedIn: 'root' })
export class FiltrosStore {
  /** Filtro de categoría (leyenda) y de submodo (pestaña Submodos). */
  readonly categoria = signal<string | null>(null);
  readonly submodo = signal<string | null>(null);
  /** Filtros de la lista completa. */
  readonly termino = signal('');
  readonly porUso = signal(false);
  readonly rol = signal<Rol | null>(null);

  /** Sufijo « · submodo» (o categoría) para los títulos; vacío sin filtro. */
  readonly sufijo = computed(() => {
    const c = this.categoria();
    return c ? ' · ' + (this.submodo() ?? c) : '';
  });

  toggleCategoria(c: string): void {
    this.categoria.update((act) => (act === c ? null : c));
    this.submodo.set(null);
  }

  toggleSubmodo(categoria: string, submodo: string): void {
    this.categoria.set(categoria);
    this.submodo.update((act) => (act === submodo ? null : submodo));
  }

  toggleRol(r: Rol): void {
    this.rol.update((act) => (act === r ? null : r));
  }
}
