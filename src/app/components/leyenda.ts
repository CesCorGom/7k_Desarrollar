import { Component, inject } from '@angular/core';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-leyenda',
  host: { class: 'leg' },
  template: `
    @for (c of juego.categorias; track c.nombre) {
      <button class="lg" [class.on]="juego.categoria() === c.nombre" [style.--c]="c.color" (click)="juego.toggleCategoria(c.nombre)">
        <span class="ic">{{ c.icono }}</span>
        <span><b>{{ c.linea1 }}</b><br />{{ c.linea2 }}</span>
      </button>
    }
  `,
})
export class Leyenda {
  protected readonly juego = inject(JuegoService);
}
