import { Injectable } from '@angular/core';
import { Personaje } from '../../domain/models/personaje';
import { PersonajeRepository } from '../../domain/ports/personaje.repository';
import { MASCOTAS, PERSONAJES } from '../data/personajes.data';

/** Adaptador en memoria sobre los datos estáticos de personajes. */
@Injectable()
export class PersonajeMemoriaRepository extends PersonajeRepository {
  private readonly porNombre = new Map([...PERSONAJES, ...MASCOTAS].map((p) => [p.nombre, p]));

  personajes(): readonly Personaje[] {
    return PERSONAJES;
  }

  mascotas(): readonly Personaje[] {
    return MASCOTAS;
  }

  buscar(nombre: string): Personaje | undefined {
    return this.porNombre.get(nombre);
  }
}
