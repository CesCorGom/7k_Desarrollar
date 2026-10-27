import { Component, inject } from '@angular/core';
import { FiltrosStore } from '../../application/filtros.store';
import { Formacion } from '../components/formacion';

@Component({
  selector: 'app-submodos',
  imports: [Formacion],
  templateUrl: './submodos.html',
})
export class Submodos {
  protected readonly filtros = inject(FiltrosStore);
}
