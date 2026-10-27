import { Injectable, computed, inject } from '@angular/core';
import { CatalogoService } from './catalogo.service';
import { FiltrosStore } from './filtros.store';
import { UsosService } from './usos.service';

/** Lista completa de personajes según búsqueda, rol y orden elegidos. */
@Injectable({ providedIn: 'root' })
export class ListaPersonajesService {
  private readonly catalogo = inject(CatalogoService);
  private readonly filtros = inject(FiltrosStore);
  private readonly usos = inject(UsosService);

  readonly total = this.usos.personajes.length;

  readonly filtrados = computed(() => {
    const t = this.filtros.termino().trim().toLowerCase();
    const r = this.filtros.rol();
    const porUso = this.filtros.porUso();
    return this.usos.personajes
      .filter((p) => p.nombre.toLowerCase().includes(t) && (!r || this.catalogo.rol(p.nombre) === r))
      .sort((a, b) => (porUso ? b.total - a.total : 0) || a.nombre.localeCompare(b.nombre));
  });
}
