import { Equipo } from '../models/modo';
import { PersonajeRepository } from '../ports/personaje.repository';
import { ReglaEquipo } from './regla-equipo';

/** Todos los miembros del equipo deben existir en el catálogo de personajes. */
export class PersonajesConocidos implements ReglaEquipo {
  /** Solo depende de la búsqueda, no del repositorio completo. */
  constructor(private readonly personajes: Pick<PersonajeRepository, 'buscar'>) {}

  validar(e: Equipo): string[] {
    return e.miembros.filter((n) => !this.personajes.buscar(n)).map((n) => `Personaje sin datos: ${n}`);
  }
}
