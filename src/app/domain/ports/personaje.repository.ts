import { Personaje } from '../models/personaje';

/** Puerto de salida: catálogo de personajes y mascotas. */
export abstract class PersonajeRepository {
  abstract personajes(): readonly Personaje[];
  abstract mascotas(): readonly Personaje[];
  /** Personaje o mascota por nombre; `undefined` si no existe. */
  abstract buscar(nombre: string): Personaje | undefined;
}
