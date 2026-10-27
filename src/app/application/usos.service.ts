import { Injectable, inject } from '@angular/core';
import { Uso } from '../domain/models/estadistica';
import { Rol } from '../domain/models/personaje';
import { calcularUsos } from '../domain/services/usos';
import { CatalogoService } from './catalogo.service';

/** Uso global (sin filtros) de cada personaje y mascota. */
@Injectable({ providedIn: 'root' })
export class UsosService {
  private readonly catalogo = inject(CatalogoService);

  readonly usos: Record<string, Uso> = calcularUsos(this.catalogo.equipos, this.catalogo.mascotas, (e) =>
    this.catalogo.mascotasDeEquipo(e),
  );
  readonly personajes = Object.values(this.usos).filter((u) => !u.mascota);
  readonly maxUso = Math.max(...this.personajes.map((u) => u.total));

  /** Personajes usados de cada rol. */
  readonly porRol: Partial<Record<Rol, number>> = this.contarPorRol();

  uso(nombre: string): Uso | undefined {
    return this.usos[nombre];
  }

  /** Puesto en el ranking global de uso (1 = más usado). */
  puesto(nombre: string): number {
    const t = this.usos[nombre]?.total ?? 0;
    return 1 + this.personajes.filter((u) => u.total > t).length;
  }

  private contarPorRol(): Partial<Record<Rol, number>> {
    const c: Partial<Record<Rol, number>> = {};
    for (const p of this.personajes) {
      const r = this.catalogo.rol(p.nombre);
      if (r) c[r] = (c[r] ?? 0) + 1;
    }
    return c;
  }
}
