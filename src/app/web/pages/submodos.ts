import { Component, computed, inject } from '@angular/core';
import { CatalogoService } from '../../application/catalogo.service';
import { FiltrosStore } from '../../application/filtros.store';
import { fasesDe } from '../../domain/models/formacion';
import { Formacion } from '../components/formacion';

@Component({
  selector: 'app-submodos',
  imports: [Formacion],
  templateUrl: './submodos.html',
})
export class Submodos {
  private readonly catalogo = inject(CatalogoService);
  protected readonly filtros = inject(FiltrosStore);

  /** Categoría del submodo elegido (para su color e icono). */
  protected readonly categoria = computed(() => {
    const c = this.filtros.categoria();
    return this.catalogo.categorias.find((x) => x.nombre === c);
  });

  /** Resumen del submodo: número de fases y de héroes distintos. */
  protected readonly resumen = computed(() => {
    const s = this.filtros.submodo();
    const fases = fasesDe(s ? this.catalogo.formacion(s) : undefined);
    const heroes = new Set(fases.flatMap((f) => [...f.adelante, ...f.atras]));
    return { fases: fases.length, heroes: heroes.size };
  });
}
