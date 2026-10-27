import { Injectable, computed, inject } from '@angular/core';
import { Conteo } from '../domain/models/estadistica';
import { Categoria } from '../domain/models/modo';
import { contar } from '../domain/services/conteo';
import { CatalogoService } from './catalogo.service';
import { FiltrosStore } from './filtros.store';

export const SIN_ROL = 'Sin rol';
const TOP_POR_ROL = 5;

export interface MascotasDeModo {
  categoria: Categoria;
  total: number;
  mascotas: { nombre: string; submodos: string[] }[];
}

export interface RolDetalle extends Conteo {
  /** Equipos con al menos un miembro del rol. */
  enEquipos: number;
  top: Conteo[];
}

/** Rankings de uso sobre los equipos que pasan el filtro de categoría/submodo. */
@Injectable({ providedIn: 'root' })
export class RankingsService {
  private readonly catalogo = inject(CatalogoService);
  private readonly filtros = inject(FiltrosStore);

  readonly equipos = computed(() => {
    const c = this.filtros.categoria(), s = this.filtros.submodo();
    return this.catalogo.equipos.filter((e) => (!c || e.categoria === c) && (!s || e.submodo === s));
  });
  readonly totalEquipos = computed(() => this.equipos().length);

  readonly personajes = computed(() => contar(this.equipos().flatMap((e) => e.miembros)));

  readonly mascotas = computed(() => contar(this.equipos().flatMap((e) => this.catalogo.mascotasDeEquipo(e))));

  /** Puestos ocupados por cada rol. */
  readonly roles = computed(() => contar(this.equipos().flatMap((e) => e.miembros.map((n) => this.rolDe(n)))));

  /** Total de puestos (miembros) en los equipos filtrados. */
  readonly puestos = computed(() => this.roles().reduce((s, r) => s + r.total, 0));

  /** Por rol: equipos donde aparece y sus personajes más usados. */
  readonly rolesDetalle = computed<RolDetalle[]>(() => {
    const equipos = this.equipos();
    return this.roles().map((r) => {
      const deRol = (n: string) => this.rolDe(n) === r.nombre;
      return {
        ...r,
        enEquipos: equipos.filter((e) => e.miembros.some(deRol)).length,
        top: contar(equipos.flatMap((e) => e.miembros.filter(deRol))).slice(0, TOP_POR_ROL),
      };
    });
  });

  /** Mascotas usadas en cada modo, con los submodos donde aparecen. */
  readonly mascotasPorModo = computed<MascotasDeModo[]>(() => {
    const equipos = this.equipos();
    return this.catalogo.categorias
      .map((categoria) => {
        const deCat = equipos.filter((e) => e.categoria === categoria.nombre);
        const m = new Map<string, string[]>();
        deCat.forEach((e) => this.catalogo.mascotasDeEquipo(e).forEach((x) => m.set(x, [...(m.get(x) ?? []), e.submodo])));
        const mascotas = [...m]
          .map(([nombre, submodos]) => ({ nombre, submodos }))
          .sort((a, b) => b.submodos.length - a.submodos.length || a.nombre.localeCompare(b.nombre));
        return { categoria, total: deCat.length, mascotas };
      })
      .filter((g) => g.mascotas.length);
  });

  private rolDe(nombre: string): string {
    return this.catalogo.rol(nombre) ?? SIN_ROL;
  }
}
