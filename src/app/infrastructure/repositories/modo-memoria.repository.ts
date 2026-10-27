import { Injectable } from '@angular/core';
import { Categoria, Equipo } from '../../domain/models/modo';
import { ModoRepository } from '../../domain/ports/modo.repository';
import { CATEGORIAS, EQUIPOS } from '../data/modos.data';

/** Adaptador en memoria sobre los datos estáticos de categorías y equipos. */
@Injectable()
export class ModoMemoriaRepository extends ModoRepository {
  categorias(): readonly Categoria[] {
    return CATEGORIAS;
  }

  equipos(): readonly Equipo[] {
    return EQUIPOS;
  }
}
