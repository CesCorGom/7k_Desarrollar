/** Puerto de salida: vuelca el catálogo inicial en la base de datos. */
export abstract class ImportadorCatalogo {
  /** Devuelve el número de documentos escritos. */
  abstract importar(): Promise<number>;
}
