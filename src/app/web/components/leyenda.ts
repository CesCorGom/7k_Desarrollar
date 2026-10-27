import { Component, inject } from '@angular/core';
import { CatalogoService } from '../../application/catalogo.service';
import { FiltrosStore } from '../../application/filtros.store';

@Component({
  selector: 'app-leyenda',
  host: { class: 'leg', role: 'group', 'aria-label': 'Modos de juego' },
  templateUrl: './leyenda.html',
})
export class Leyenda {
  protected readonly catalogo = inject(CatalogoService);
  protected readonly filtros = inject(FiltrosStore);
}
