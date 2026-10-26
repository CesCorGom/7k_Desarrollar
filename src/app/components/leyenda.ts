import { Component, inject } from '@angular/core';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-leyenda',
  host: { class: 'leg' },
  templateUrl: './leyenda.html',
})
export class Leyenda {
  protected readonly juego = inject(JuegoService);
}
