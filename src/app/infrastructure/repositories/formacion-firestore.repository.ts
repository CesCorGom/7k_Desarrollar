import { Injectable, inject } from '@angular/core';
import { Formacion } from '../../domain/models/formacion';
import { FormacionRepository } from '../../domain/ports/formacion.repository';
import { CatalogoFirestore } from '../firebase/catalogo-firestore';

/** Adaptador de lectura sobre el catálogo cargado desde Firestore. */
@Injectable()
export class FormacionFirestoreRepository extends FormacionRepository {
  private readonly catalogo = inject(CatalogoFirestore);

  deSubmodo(submodo: string): Formacion | undefined {
    return this.catalogo.formaciones[submodo];
  }
}
