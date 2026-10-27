import { Uso } from '../models/estadistica';
import { Equipo } from '../models/modo';
import { Personaje } from '../models/personaje';

/** Usos de todos los personajes de los equipos y de todas las mascotas (aunque no se usen). */
export function calcularUsos(
  equipos: readonly Equipo[],
  mascotas: readonly Personaje[],
  mascotasDeEquipo: (e: Equipo) => string[],
): Record<string, Uso> {
  const usos: Record<string, Uso> = {};
  const registrar = (nombre: string, e: Equipo, mascota: boolean) => {
    const u = (usos[nombre] ??= { nombre, total: 0, porCategoria: {}, mascota });
    u.total++;
    (u.porCategoria[e.categoria] ??= []).push(e.submodo);
  };
  equipos.forEach((e) => e.miembros.forEach((n) => registrar(n, e, false)));
  mascotas.forEach((m) => {
    usos[m.nombre] = { nombre: m.nombre, total: 0, porCategoria: {}, mascota: true };
    equipos.forEach((e) => {
      if (mascotasDeEquipo(e).includes(m.nombre)) registrar(m.nombre, e, true);
    });
  });
  return usos;
}
