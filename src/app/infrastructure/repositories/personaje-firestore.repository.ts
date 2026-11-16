import { Injectable, inject } from '@angular/core';
import { Personaje } from '../../domain/models/personaje';
import { PersonajeRepository } from '../../domain/ports/personaje.repository';
import { CatalogoFirestore } from '../firebase/catalogo-firestore';

/** Adaptador de lectura sobre el catálogo cargado desde Firestore. */
@Injectable()
export class PersonajeFirestoreRepository extends PersonajeRepository {
  private readonly catalogo = inject(CatalogoFirestore);
  private readonly porNombre = new Map([...this.catalogo.personajes, ...this.catalogo.mascotas].map((p) => [p.nombre, p]));

  personajes(): readonly Personaje[] {
    return this.catalogo.personajes;
  }

  mascotas(): readonly Personaje[] {
    return this.catalogo.mascotas;
  }

  buscar(nombre: string): Personaje | undefined {
    return this.porNombre.get(nombre);
  }
}
