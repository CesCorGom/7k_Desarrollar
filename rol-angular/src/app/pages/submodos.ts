import { Component, computed, inject } from '@angular/core';
import { Formacion } from '../components/formacion';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-submodos',
  imports: [Formacion],
  template: `
    @for (c of categorias(); track c.nombre) {
      <h2 class="sh">{{ c.nombre }}</h2>
      <div class="schips">
        @for (e of equiposDe(c.nombre); track e.submodo) {
          <button
            class="sc"
            [class.on]="juego.submodo() === e.submodo"
            [style.--c]="c.color"
            (click)="juego.toggleSubmodo(c.nombre, e.submodo)"
          >{{ e.submodo }}</button>
        }
      </div>
    }
    @if (juego.submodo(); as s) {
      <app-formacion [submodo]="s" />
    } @else {
      <div class="empty">Elige un submodo para ver su alineación</div>
    }
  `,
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
