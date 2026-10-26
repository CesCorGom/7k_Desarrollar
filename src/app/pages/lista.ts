import { Component, computed, inject, signal } from '@angular/core';
import { Avatar } from '../components/avatar';
import { PERSONAJES, PJ, ROL_COLOR, ROL_ICONO, Rol } from '../data/personajes';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-lista',
  imports: [Avatar],
  templateUrl: './lista.html',
})
export class Lista {
  protected readonly juego = inject(JuegoService);
  protected readonly termino = signal('');
  protected readonly porUso = signal(false);
  protected readonly filtroRol = signal<Rol | null>(null);
  protected readonly roles = [...new Set(PERSONAJES.map((p) => p.rol).filter((r): r is Rol => !!r))];
  protected readonly rolColor = ROL_COLOR;
  protected readonly rolIcono = ROL_ICONO;

  protected readonly filtrados = computed(() => {
    const t = this.termino().trim().toLowerCase();
    const r = this.filtroRol();
    return this.juego.personajes
      .filter((p) => p.nombre.toLowerCase().includes(t) && (!r || this.rol(p.nombre) === r))
      .sort((a, b) => (this.porUso() ? b.total - a.total : 0) || a.nombre.localeCompare(b.nombre));
  });

  protected readonly conteo = computed(() => {
    const c: Partial<Record<Rol, number>> = {};
    for (const p of this.juego.personajes) {
      const r = this.rol(p.nombre);
      if (r) c[r] = (c[r] ?? 0) + 1;
    }
    return c;
  });

  protected rol(n: string) {
    return PJ[n]?.rol;
  }
}
