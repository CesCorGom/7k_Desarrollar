import { PersonajeEditable } from '../models/personaje';

/** Puerto de salida de escritura: alta, edición y baja de personajes y mascotas. */
export abstract class PersonajeEditorRepository {
  abstract listar(): Promise<PersonajeEditable[]>;
  /** Crea o reemplaza el personaje identificado por su nombre. */
  abstract guardar(personaje: PersonajeEditable): Promise<void>;
  abstract eliminar(nombre: string): Promise<void>;
}
