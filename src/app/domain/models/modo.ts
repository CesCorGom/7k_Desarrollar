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
