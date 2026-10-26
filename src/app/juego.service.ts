import { Injectable, computed, signal } from '@angular/core';
import { CATEGORIAS, EQUIPOS, Equipo } from './data/modos';
import { FORMACIONES, mascotasDe } from './data/formaciones';
import { MASCOTAS, PJ } from './data/personajes';

/** Uso de un personaje o mascota: total de equipos y submodos por categoría. */
export interface Uso {
  nombre: string;
  total: number;
  porCategoria: Record<string, string[]>;
  mascota: boolean;
}

export interface Conteo {
  nombre: string;
  total: number;
}

function ordenar<T extends Conteo>(a: T, b: T): number {
  return b.total - a.total || a.nombre.localeCompare(b.nombre);
}

function contar(nombres: string[]): Conteo[] {
  const m = new Map<string, number>();
  nombres.forEach((n) => m.set(n, (m.get(n) ?? 0) + 1));
  return [...m].map(([nombre, total]) => ({ nombre, total })).sort(ordenar);
}

@Injectable({ providedIn: 'root' })
export class JuegoService {
  readonly categorias = CATEGORIAS;
  readonly equipos = EQUIPOS;
  readonly totalEquipos = EQUIPOS.length;

  /** Filtro de categoría (leyenda) y de submodo (pestaña Submodos). */
  readonly categoria = signal<string | null>(null);
  readonly submodo = signal<string | null>(null);
  /** Personaje abierto en el modal. */
  readonly abierto = signal<string | null>(null);

  readonly usos: Record<string, Uso> = this.calcularUsos();
  readonly personajes = Object.values(this.usos).filter((u) => !u.mascota);
  readonly maxUso = Math.max(...this.personajes.map((u) => u.total));

  readonly equiposFiltrados = computed(() => {
    const c = this.categoria(), s = this.submodo();
    return EQUIPOS.filter((e) => (!c || e.categoria === c) && (!s || e.submodo === s));
  });

  readonly rankingPersonajes = computed(() =>
    contar(this.equiposFiltrados().flatMap((e) => e.miembros)),
  );

  readonly rankingMascotas = computed(() =>
    contar(this.equiposFiltrados().flatMap((e) => this.mascotasDeEquipo(e))),
  );

  /** Puestos ocupados por cada rol en los equipos filtrados. */
  readonly rankingRoles = computed(() =>
    contar(this.equiposFiltrados().flatMap((e) => e.miembros.map((n) => PJ[n]?.rol ?? 'Sin rol'))),
  );

  constructor() {
    this.validarAsedio();
  }

  toggleCategoria(c: string): void {
    this.categoria.update((act) => (act === c ? null : c));
    this.submodo.set(null);
  }

  toggleSubmodo(categoria: string, submodo: string): void {
    this.categoria.set(categoria);
    this.submodo.update((act) => (act === submodo ? null : submodo));
  }

  mascotasDeEquipo(e: Equipo): string[] {
    const f = FORMACIONES[e.submodo];
    return f ? mascotasDe(f) : [];
  }

  /** Puesto en el ranking global de uso (1 = más usado). */
  puesto(nombre: string): number {
    const t = this.usos[nombre]?.total ?? 0;
    return 1 + this.personajes.filter((u) => u.total > t).length;
  }

  private calcularUsos(): Record<string, Uso> {
    const usos: Record<string, Uso> = {};
    const registrar = (nombre: string, e: Equipo, mascota: boolean) => {
      const u = (usos[nombre] ??= { nombre, total: 0, porCategoria: {}, mascota });
      u.total++;
      (u.porCategoria[e.categoria] ??= []).push(e.submodo);
    };
    EQUIPOS.forEach((e) => e.miembros.forEach((n) => registrar(n, e, false)));
    MASCOTAS.forEach((m) => {
      usos[m.nombre] = { nombre: m.nombre, total: 0, porCategoria: {}, mascota: true };
      EQUIPOS.forEach((e) => {
        if (this.mascotasDeEquipo(e).includes(m.nombre)) registrar(m.nombre, e, true);
      });
    });
    return usos;
  }

  private validarAsedio(): void {
    EQUIPOS.forEach((e) => {
      e.miembros.forEach((n) => PJ[n] || console.warn('Personaje sin datos:', n));
      const f = FORMACIONES[e.submodo];
      if (!f || e.categoria !== 'Asedio') return;
      const a = [...f.adelante, ...f.atras].sort().join();
      if (a !== [...e.miembros].sort().join()) console.warn('Alineación no coincide con el equipo:', e.submodo);
    });
  }
}
