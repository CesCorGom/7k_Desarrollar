import { Component, inject } from '@angular/core';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-leyenda',
  host: { class: 'leg', role: 'group', 'aria-label': 'Modos de juego' },
  templateUrl: './leyenda.html',
})
export class Leyenda {
  protected readonly juego = inject(JuegoService);
}
