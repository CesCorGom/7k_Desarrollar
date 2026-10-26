import { Component, computed, inject } from '@angular/core';
import { Formacion } from '../components/formacion';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-submodos',
  imports: [Formacion],
  templateUrl: './submodos.html',
})
export class Submodos {
  protected readonly juego = inject(JuegoService);
  protected readonly categorias = computed(() => {
    const c = this.juego.categoria();
    return this.juego.categorias.filter((x) => !c || x.nombre === c);
  });

  protected equiposDe(categoria: string) {
    return this.juego.equipos.filter((e) => e.categoria === categoria);
  }
}
