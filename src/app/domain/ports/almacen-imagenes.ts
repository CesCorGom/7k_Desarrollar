/** Puerto de salida: almacenamiento de imágenes. */
export abstract class AlmacenImagenes {
  /** Sube la imagen y devuelve su URL pública. */
  abstract subir(archivo: File): Promise<string>;
}
