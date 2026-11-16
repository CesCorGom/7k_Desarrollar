import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore/lite';
import { Formacion } from '../../domain/models/formacion';
import { Categoria, Equipo } from '../../domain/models/modo';
import { Personaje, PersonajeEditable } from '../../domain/models/personaje';
import { COLECCION } from '../config';
import { FORMACIONES } from '../data/formaciones.data';
import { CATEGORIAS, EQUIPOS } from '../data/modos.data';
import { MASCOTAS, PERSONAJES } from '../data/personajes.data';
import { db } from './firebase';

const ESPERA_MAXIMA_MS = 8000;

type ConOrden<T> = T & { orden: number };

/**
 * Copia en memoria del catálogo guardado en Firestore. Se carga una vez al arrancar para que
 * los repositorios puedan responder de forma síncrona. Si Firestore no responde o una colección
 * está vacía, se usan los datos locales de `infrastructure/data`.
 */
@Injectable({ providedIn: 'root' })
export class CatalogoFirestore {
  personajes: readonly Personaje[] = PERSONAJES;
  mascotas: readonly Personaje[] = MASCOTAS;
  categorias: readonly Categoria[] = CATEGORIAS;
  equipos: readonly Equipo[] = EQUIPOS;
  formaciones: Readonly<Record<string, Formacion>> = FORMACIONES;

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
      if (personajes.length) {
        const orden = [...personajes].sort((a, b) => a.datos.nombre.localeCompare(b.datos.nombre));
        this.personajes = orden.filter((p) => !p.datos.mascota).map((p) => aPersonaje(p.datos));
        this.mascotas = orden.filter((p) => p.datos.mascota).map((p) => aPersonaje(p.datos));
      }
      // Modos, submodos y alineaciones van juntos: si hay categorías en Firestore se usa todo de
      // allí (aunque un submodo no tenga alineación); si no, todo lo local.
      if (categorias.length) {
        this.categorias = porOrden(categorias).map(({ orden, ...c }) => c);
        this.equipos = porOrden(equipos).map(({ orden, ...e }) => e);
        this.formaciones = Object.fromEntries(formaciones.map((f) => [f.id, f.datos]));
      }
    } catch (e) {
      console.warn('No se pudo leer Firestore; se usan los datos locales.', e);
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

function aPersonaje({ nombre, img, rol }: PersonajeEditable): Personaje {
  return { nombre, img: img ?? null, rol: rol ?? null };
}

function conLimite<T>(p: Promise<T>): Promise<T> {
  return Promise.race([
    p,
    new Promise<never>((_, rechazar) => setTimeout(() => rechazar(new Error('Tiempo de espera agotado')), ESPERA_MAXIMA_MS)),
  ]);
}
