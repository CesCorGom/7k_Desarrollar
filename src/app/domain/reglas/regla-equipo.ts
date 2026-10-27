import { Equipo } from '../models/modo';

/**
 * Regla de consistencia de un equipo. Para añadir una validación se crea
 * otra implementación y se registra; el validador no se modifica.
 */
export interface ReglaEquipo {
  /** Avisos por cada incumplimiento; vacío si el equipo es válido. */
  validar(e: Equipo): string[];
}
