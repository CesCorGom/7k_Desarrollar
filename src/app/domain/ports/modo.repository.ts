import { Categoria, Equipo } from '../models/modo';

/** Puerto de salida: categorías de juego y sus equipos. */
export abstract class ModoRepository {
  abstract categorias(): readonly Categoria[];
  abstract equipos(): readonly Equipo[];
}
