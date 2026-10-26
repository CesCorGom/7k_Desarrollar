import { Component, inject } from '@angular/core';
import { Formacion } from '../components/formacion';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-submodos',
  imports: [Formacion],
  templateUrl: './submodos.html',
})
export class Submodos {
  protected readonly juego = inject(JuegoService);
}
