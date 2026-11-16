import { Usuario } from '../models/usuario';

/** Puerto de salida: inicio y cierre de sesión. */
export abstract class Autenticacion {
  /** Avisa de cada cambio de sesión; devuelve la función para dejar de escuchar. */
  abstract observar(cambio: (usuario: Usuario | null) => void): () => void;
  abstract entrar(): Promise<void>;
  abstract salir(): Promise<void>;
}
