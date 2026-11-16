import { Injectable } from '@angular/core';
import { doc, writeBatch } from 'firebase/firestore/lite';
import { ImportadorCatalogo } from '../../domain/ports/importador-catalogo';
import { COLECCION } from '../config';
import { FORMACIONES } from '../data/formaciones.data';
import { CATEGORIAS, EQUIPOS } from '../data/modos.data';
import { MASCOTAS, PERSONAJES } from '../data/personajes.data';
import { db } from './firebase';

/** Vuelca los datos locales de `infrastructure/data` en Firestore (sobrescribe los documentos con el mismo id). */
@Injectable()
export class ImportadorFirestore extends ImportadorCatalogo {
  async importar(): Promise<number> {
    const lote = writeBatch(db);
    let n = 0;
    const poner = (coleccion: string, id: string, datos: object) => {
      // Firestore no admite `undefined`: JSON lo elimina.
      lote.set(doc(db, coleccion, id), JSON.parse(JSON.stringify(datos)));
      n++;
    };
    PERSONAJES.forEach((p) => poner(COLECCION.personajes, p.nombre, { ...p, mascota: false }));
    MASCOTAS.forEach((p) => poner(COLECCION.personajes, p.nombre, { ...p, mascota: true }));
    CATEGORIAS.forEach((c, orden) => poner(COLECCION.categorias, c.nombre, { ...c, orden }));
    EQUIPOS.forEach((e, orden) => poner(COLECCION.equipos, String(orden).padStart(3, '0'), { ...e, orden }));
    Object.entries(FORMACIONES).forEach(([submodo, f]) => poner(COLECCION.formaciones, submodo, f));
    await lote.commit();
    return n;
  }
}
