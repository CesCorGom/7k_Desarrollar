import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore/lite';
import { PersonajeEditable } from '../../domain/models/personaje';
import { PersonajeEditorRepository } from '../../domain/ports/personaje-editor.repository';
import { COLECCION } from '../config';
import { db } from './firebase';

/** Adaptador de escritura de personajes en Firestore. El id del documento es el nombre. */
@Injectable()
export class PersonajeEditorFirestoreRepository extends PersonajeEditorRepository {
  async listar(): Promise<PersonajeEditable[]> {
    const snap = await getDocs(collection(db, COLECCION.personajes));
    return snap.docs.map((d) => d.data() as PersonajeEditable).sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  async guardar({ nombre, img, rol, mascota }: PersonajeEditable): Promise<void> {
    await setDoc(doc(db, COLECCION.personajes, nombre), { nombre, img, rol: mascota ? null : rol, mascota });
  }

  async eliminar(nombre: string): Promise<void> {
    await deleteDoc(doc(db, COLECCION.personajes, nombre));
  }
}
