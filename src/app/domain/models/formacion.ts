export interface Alineacion {
  al: string;
  adelante: string[];
  atras: string[];
  mascota: string[];
}

export interface Formacion extends Alineacion {
  alternativas?: Alineacion[];
  prioridad?: string[];
}

/** Todas las mascotas de una formación, incluidas las de sus alternativas (sin repetir). */
export function mascotasDe(f: Formacion): string[] {
  const todas = [f, ...(f.alternativas ?? [])].flatMap((x) => x.mascota);
  return [...new Set(todas)];
}

/** Las fases de una formación: la principal seguida de sus alternativas. */
export function fasesDe(f: Formacion | undefined): Alineacion[] {
  return f ? [f, ...(f.alternativas ?? [])] : [];
}
