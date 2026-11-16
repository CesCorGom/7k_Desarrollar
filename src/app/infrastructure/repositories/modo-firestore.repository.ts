import { Injectable, inject } from '@angular/core';
import { Categoria, Equipo } from '../../domain/models/modo';
import { ModoRepository } from '../../domain/ports/modo.repository';
import { CatalogoFirestore } from '../firebase/catalogo-firestore';

/** Adaptador de lectura sobre el catálogo cargado desde Firestore. */
@Injectable()
export class ModoFirestoreRepository extends ModoRepository {
  private readonly catalogo = inject(CatalogoFirestore);

  categorias(): readonly Categoria[] {
    return this.catalogo.categorias;
  }

  equipos(): readonly Equipo[] {
    return this.catalogo.equipos;
  }
}
