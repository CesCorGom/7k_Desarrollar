import { Injectable } from '@angular/core';
import { Formacion } from '../../domain/models/formacion';
import { FormacionRepository } from '../../domain/ports/formacion.repository';
import { FORMACIONES } from '../data/formaciones.data';

/** Adaptador en memoria sobre los datos estáticos de formaciones. */
@Injectable()
export class FormacionMemoriaRepository extends FormacionRepository {
  deSubmodo(submodo: string): Formacion | undefined {
    return FORMACIONES[submodo];
  }
}
