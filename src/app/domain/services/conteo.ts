import { Conteo } from '../models/estadistica';

/** Orden de ranking: más total primero y, a igualdad, alfabético. */
export function ordenarConteo(a: Conteo, b: Conteo): number {
  return b.total - a.total || a.nombre.localeCompare(b.nombre);
}

/** Cuenta las apariciones de cada nombre y las devuelve ordenadas como ranking. */
export function contar(nombres: string[]): Conteo[] {
  const m = new Map<string, number>();
  nombres.forEach((n) => m.set(n, (m.get(n) ?? 0) + 1));
  return [...m].map(([nombre, total]) => ({ nombre, total })).sort(ordenarConteo);
}

export function porcentaje(n: number, total: number): number {
  return total ? Math.round((n / total) * 100) : 0;
}
