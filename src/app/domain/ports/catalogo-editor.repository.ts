import { Formacion } from '../models/formacion';
import { Categoria, CategoriaEditable, Equipo, EquipoEditable } from '../models/modo';

export interface CatalogoEditable {
  categorias: CategoriaEditable[];
  equipos: EquipoEditable[];
  /** Alineación de cada submodo, por nombre del submodo. */
  formaciones: Record<string, Formacion>;
}

/** Puerto de salida de escritura: modos (categorías), submodos (equipos) y alineaciones. */
export abstract class CatalogoEditorRepository {
  /** Categorías y equipos ordenados por `orden`. */
  abstract leer(): Promise<CatalogoEditable>;

  /** Crea o actualiza una categoría. Si cambia de nombre (`anterior`), sus submodos pasan a la nueva. */
  abstract guardarCategoria(c: Categoria, orden: number, anterior: string | null): Promise<void>;
  /** Elimina la categoría junto con sus submodos y sus alineaciones. */
  abstract eliminarCategoria(nombre: string): Promise<void>;
  /** Guarda el orden de las categorías (posición = índice). */
  abstract ordenarCategorias(nombres: string[]): Promise<void>;

  /** Crea (`id` nulo) o actualiza un submodo. Si cambia de nombre, su alineación se mueve con él. */
  abstract guardarEquipo(e: Equipo, orden: number, id: string | null, submodoAnterior: string | null): Promise<void>;
  /** Elimina el submodo y su alineación. */
  abstract eliminarEquipo(e: EquipoEditable): Promise<void>;
  /** Guarda el orden de los submodos (posición = índice). */
  abstract ordenarEquipos(ids: string[]): Promise<void>;

  abstract guardarFormacion(submodo: string, f: Formacion): Promise<void>;
  abstract eliminarFormacion(submodo: string): Promise<void>;
}
