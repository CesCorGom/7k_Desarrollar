import { Equipo } from '../models/modo';
import { FormacionRepository } from '../ports/formacion.repository';
import { ReglaEquipo } from './regla-equipo';

/** En Asedio la alineación debe tener exactamente los mismos miembros que el equipo. */
export class AlineacionAsedio implements ReglaEquipo {
  constructor(private readonly formaciones: Pick<FormacionRepository, 'deSubmodo'>) {}

  validar(e: Equipo): string[] {
    const f = this.formaciones.deSubmodo(e.submodo);
    if (!f || e.categoria !== 'Asedio') return [];
    const a = [...f.adelante, ...f.atras].sort().join();
    return a === [...e.miembros].sort().join() ? [] : [`Alineación no coincide con el equipo: ${e.submodo}`];
  }
}
