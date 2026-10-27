export interface Conteo {
  nombre: string;
  total: number;
}

/** Uso de un personaje o mascota: total de equipos y submodos por categoría. */
export interface Uso extends Conteo {
  porCategoria: Record<string, string[]>;
  mascota: boolean;
}
