import { Component, computed, inject } from '@angular/core';
import { pct } from '../components/ranking';
import { PJ, ROL_COLOR, ROL_ICONO, Rol } from '../data/personajes';
import { Conteo, JuegoService } from '../juego.service';

const TOP = 5;

@Component({
  selector: 'app-uso-roles',
  templateUrl: './uso-roles.html',
})
export class UsoRoles {
  protected readonly juego = inject(JuegoService);
  protected readonly pct = pct;
  protected readonly equipos = computed(() => this.juego.equiposFiltrados().length);
  /** Total de puestos (miembros) en los equipos filtrados. */
  protected readonly puestos = computed(() => this.juego.rankingRoles().reduce((s, r) => s + r.total, 0));

  protected readonly filtro = computed(() => {
    const c = this.juego.categoria();
    return c ? ' · ' + (this.juego.submodo() ?? c) : '';
  });

  protected readonly roles = computed(() => {
    const equipos = this.juego.equiposFiltrados();
    return this.juego.rankingRoles().map((r) => {
      const deRol = (n: string) => (PJ[n]?.rol ?? 'Sin rol') === r.nombre;
      const m = new Map<string, number>();
      equipos.forEach((e) => e.miembros.filter(deRol).forEach((n) => m.set(n, (m.get(n) ?? 0) + 1)));
      const top: Conteo[] = [...m]
        .map(([nombre, total]) => ({ nombre, total }))
        .sort((a, b) => b.total - a.total || a.nombre.localeCompare(b.nombre))
        .slice(0, TOP);
      return {
        ...r,
        color: ROL_COLOR[r.nombre as Rol] ?? '#888',
        icono: ROL_ICONO[r.nombre as Rol] ?? '?',
        enEquipos: equipos.filter((e) => e.miembros.some(deRol)).length,
        top,
      };
    });
  });
}
