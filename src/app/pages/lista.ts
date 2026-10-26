import { Component, computed, inject } from '@angular/core';
import { Avatar } from '../components/avatar';
import { PJ, ROL_COLOR, ROL_ICONO } from '../data/personajes';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-lista',
  imports: [Avatar],
  templateUrl: './lista.html',
})
export class Lista {
  protected readonly juego = inject(JuegoService);
  protected readonly rolColor = ROL_COLOR;
  protected readonly rolIcono = ROL_ICONO;

  protected readonly filtrados = computed(() => {
    const t = this.juego.termino().trim().toLowerCase();
    const r = this.juego.filtroRol();
    return this.juego.personajes
      .filter((p) => p.nombre.toLowerCase().includes(t) && (!r || this.rol(p.nombre) === r))
      .sort((a, b) => (this.juego.porUso() ? b.total - a.total : 0) || a.nombre.localeCompare(b.nombre));
  });

  protected rol(n: string) {
    return PJ[n]?.rol;
  }
}
