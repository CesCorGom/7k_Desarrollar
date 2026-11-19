import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore/lite';
import { Formacion } from '../../domain/models/formacion';
import { Categoria, Equipo } from '../../domain/models/modo';
import { Personaje, PersonajeEditable } from '../../domain/models/personaje';
import { COLECCION } from '../config';
import { db } from './firebase';

const ESPERA_MAXIMA_MS = 8000;

type ConOrden<T> = T & { orden: number };

/**
 * Copia en memoria del catálogo guardado en Firestore. Se carga una vez al arrancar para que
 * los repositorios puedan responder de forma síncrona. Todo el contenido sale de la base de datos:
 * si Firestore no responde, el catálogo queda vacío.
 */
@Injectable({ providedIn: 'root' })
export class CatalogoFirestore {
  personajes: readonly Personaje[] = [];
  mascotas: readonly Personaje[] = [];
  categorias: readonly Categoria[] = [];
  equipos: readonly Equipo[] = [];
  formaciones: Readonly<Record<string, Formacion>> = {};

  async cargar(): Promise<void> {
    try {
      const [personajes, categorias, equipos, formaciones] = await conLimite(
        Promise.all([
          leer<PersonajeEditable>(COLECCION.personajes),
          leer<ConOrden<Categoria>>(COLECCION.categorias),
          leer<ConOrden<Equipo>>(COLECCION.equipos),
          leer<Formacion>(COLECCION.formaciones),
        ]),
      );
      const orden = [...personajes].sort((a, b) => a.datos.nombre.localeCompare(b.datos.nombre));
      this.personajes = orden.filter((p) => !p.datos.mascota).map((p) => aPersonaje(p.datos));
      this.mascotas = orden.filter((p) => p.datos.mascota).map((p) => aPersonaje(p.datos));
      this.categorias = porOrden(categorias).map(({ orden, ...c }) => c);
      this.equipos = porOrden(equipos).map(({ orden, ...e }) => e);
      this.formaciones = Object.fromEntries(formaciones.map((f) => [f.id, f.datos]));
    } catch (e) {
      console.error('No se pudo leer el catálogo de Firestore.', e);
    }
  }
}

async function leer<T>(nombre: string): Promise<{ id: string; datos: T }[]> {
  const snap = await getDocs(collection(db, nombre));
  return snap.docs.map((d) => ({ id: d.id, datos: d.data() as T }));
}

function porOrden<T>(docs: { datos: ConOrden<T> }[]): ConOrden<T>[] {
  return docs.map((d) => d.datos).sort((a, b) => a.orden - b.orden);
}

function aPersonaje({ nombre, img, rol, armaDedicada }: PersonajeEditable): Personaje {
  return { nombre, img: img ?? null, rol: rol ?? null, armaDedicada: !!armaDedicada };
}

function conLimite<T>(p: Promise<T>): Promise<T> {
  return Promise.race([
    p,
    new Promise<never>((_, rechazar) => setTimeout(() => rechazar(new Error('Tiempo de espera agotado')), ESPERA_MAXIMA_MS)),
  ]);
}
