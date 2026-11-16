import { Injectable } from '@angular/core';
import { collection, doc, getDoc, getDocs, query, where, writeBatch } from 'firebase/firestore/lite';
import { Formacion } from '../../domain/models/formacion';
import { Categoria, CategoriaEditable, Equipo, EquipoEditable } from '../../domain/models/modo';
import { CatalogoEditable, CatalogoEditorRepository } from '../../domain/ports/catalogo-editor.repository';
import { COLECCION } from '../config';
import { db } from './firebase';

/**
 * Adaptador de escritura de modos, submodos y alineaciones en Firestore.
 * Ids: categoría = nombre, alineación = nombre del submodo, equipo = id automático.
 * Los cambios que afectan a varios documentos se hacen en un lote (todo o nada).
 */
@Injectable()
export class CatalogoEditorFirestoreRepository extends CatalogoEditorRepository {
  async leer(): Promise<CatalogoEditable> {
    const [c, e, f] = await Promise.all([
      getDocs(collection(db, COLECCION.categorias)),
      getDocs(collection(db, COLECCION.equipos)),
      getDocs(collection(db, COLECCION.formaciones)),
    ]);
    const porOrden = (a: { orden: number }, b: { orden: number }) => (a.orden ?? 0) - (b.orden ?? 0);
    return {
      categorias: c.docs.map((d) => d.data() as CategoriaEditable).sort(porOrden),
      equipos: e.docs.map((d) => ({ ...(d.data() as Omit<EquipoEditable, 'id'>), id: d.id })).sort(porOrden),
      formaciones: Object.fromEntries(f.docs.map((d) => [d.id, d.data() as Formacion])),
    };
  }

  async guardarCategoria(c: Categoria, orden: number, anterior: string | null): Promise<void> {
    const lote = writeBatch(db);
    lote.set(doc(db, COLECCION.categorias, c.nombre), limpio({ ...c, orden }));
    if (anterior && anterior !== c.nombre) {
      lote.delete(doc(db, COLECCION.categorias, anterior));
      for (const d of await this.equiposDe(anterior)) lote.update(d.ref, { categoria: c.nombre });
    }
    await lote.commit();
  }

  async eliminarCategoria(nombre: string): Promise<void> {
    const lote = writeBatch(db);
    for (const d of await this.equiposDe(nombre)) {
      lote.delete(d.ref);
      lote.delete(doc(db, COLECCION.formaciones, (d.data() as Equipo).submodo));
    }
    lote.delete(doc(db, COLECCION.categorias, nombre));
    await lote.commit();
  }

  async ordenarCategorias(nombres: string[]): Promise<void> {
    const lote = writeBatch(db);
    nombres.forEach((n, orden) => lote.update(doc(db, COLECCION.categorias, n), { orden }));
    await lote.commit();
  }

  async guardarEquipo(e: Equipo, orden: number, id: string | null, submodoAnterior: string | null): Promise<void> {
    const lote = writeBatch(db);
    const ref = id ? doc(db, COLECCION.equipos, id) : doc(collection(db, COLECCION.equipos));
    lote.set(ref, limpio({ categoria: e.categoria, submodo: e.submodo, miembros: e.miembros, orden }));
    if (submodoAnterior && submodoAnterior !== e.submodo) {
      const vieja = await getDoc(doc(db, COLECCION.formaciones, submodoAnterior));
      if (vieja.exists()) {
        lote.set(doc(db, COLECCION.formaciones, e.submodo), vieja.data());
        lote.delete(vieja.ref);
      }
    }
    await lote.commit();
  }

  async eliminarEquipo(e: EquipoEditable): Promise<void> {
    const lote = writeBatch(db);
    lote.delete(doc(db, COLECCION.equipos, e.id));
    lote.delete(doc(db, COLECCION.formaciones, e.submodo));
    await lote.commit();
  }

  async ordenarEquipos(ids: string[]): Promise<void> {
    const lote = writeBatch(db);
    ids.forEach((id, orden) => lote.update(doc(db, COLECCION.equipos, id), { orden }));
    await lote.commit();
  }

  async guardarFormacion(submodo: string, f: Formacion): Promise<void> {
    const lote = writeBatch(db);
    lote.set(doc(db, COLECCION.formaciones, submodo), limpio(f));
    await lote.commit();
  }

  async eliminarFormacion(submodo: string): Promise<void> {
    const lote = writeBatch(db);
    lote.delete(doc(db, COLECCION.formaciones, submodo));
    await lote.commit();
  }

  private async equiposDe(categoria: string) {
    return (await getDocs(query(collection(db, COLECCION.equipos), where('categoria', '==', categoria)))).docs;
  }
}

/** Firestore no admite `undefined`: JSON lo elimina. */
function limpio<T extends object>(datos: T): T {
  return JSON.parse(JSON.stringify(datos));
}
