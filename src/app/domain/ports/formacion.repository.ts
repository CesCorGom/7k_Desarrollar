import { Formacion } from '../models/formacion';

/** Puerto de salida: formaciones por submodo. */
export abstract class FormacionRepository {
  /** Formación del submodo; `undefined` si no tiene. */
  abstract deSubmodo(submodo: string): Formacion | undefined;
}
