export interface Categoria {
  nombre: string;
  color: string;
  icono: string;
  linea1: string;
  linea2: string;
}

/** Equipo recomendado para un submodo de una categoría. */
export interface Equipo {
  categoria: string;
  submodo: string;
  miembros: string[];
}

/** Categoría tal como se edita: con su posición en el menú. */
export interface CategoriaEditable extends Categoria {
  orden: number;
}

/** Submodo (equipo) tal como se edita: con el id de su documento y su posición. */
export interface EquipoEditable extends Equipo {
  id: string;
  orden: number;
}
