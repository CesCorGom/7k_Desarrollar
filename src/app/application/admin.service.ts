import { Injectable, computed, effect, inject, signal, untracked } from '@angular/core';
import { Alineacion, Formacion } from '../domain/models/formacion';
import { Categoria, CategoriaEditable, Equipo, EquipoEditable } from '../domain/models/modo';
import { PersonajeEditable } from '../domain/models/personaje';
import { AlmacenImagenes } from '../domain/ports/almacen-imagenes';
import { CatalogoEditorRepository } from '../domain/ports/catalogo-editor.repository';
import { PersonajeEditorRepository } from '../domain/ports/personaje-editor.repository';
import { SesionService } from './sesion.service';

export const FORMATOS_IMAGEN = ['image/png', 'image/jpeg', 'image/webp'];
export const TAMANO_MAX_IMAGEN = 2_000_000;

/** Casos de uso de la zona de administración: sesión, personajes, modos, submodos y alineaciones. */
@Injectable()
export class AdminService {
  private readonly repo = inject(PersonajeEditorRepository);
  private readonly catalogoRepo = inject(CatalogoEditorRepository);
  private readonly imagenes = inject(AlmacenImagenes);
  private readonly sesion = inject(SesionService);

  readonly usuario = this.sesion.usuario;
  /** `true` hasta que se sabe si hay sesión. */
  readonly comprobando = this.sesion.comprobando;
  readonly personajes = signal<PersonajeEditable[]>([]);
  readonly categorias = signal<CategoriaEditable[]>([]);
  readonly equipos = signal<EquipoEditable[]>([]);
  readonly formaciones = signal<Record<string, Formacion>>({});
  /** `true` cuando ya se ha leído la base de datos al menos una vez. */
  readonly cargado = signal(false);
  readonly ocupado = signal(false);
  readonly mensaje = signal<{ tipo: 'ok' | 'error'; texto: string } | null>(null);

  readonly nombresPersonajes = computed(() => this.personajes().filter((p) => !p.mascota).map((p) => p.nombre));
  readonly nombresMascotas = computed(() => this.personajes().filter((p) => p.mascota).map((p) => p.nombre));
  /** La base de datos todavía no tiene ningún modo. */
  readonly sinModos = computed(() => this.cargado() && !this.categorias().length);

  constructor() {
    this.sesion.escuchar();
    // Al entrar como administrador se lee la base de datos; al salir se olvida.
    effect(() => {
      const admin = !!this.usuario()?.admin;
      untracked(() => (admin ? this.cargar() : this.cargado.set(false)));
    });
  }

  entrar(): Promise<boolean> {
    return this.tarea(() => this.sesion.entrar());
  }

  salir(): Promise<boolean> {
    return this.tarea(() => this.sesion.salir());
  }

  cargar(): Promise<boolean> {
    return this.tarea(() => this.recargar());
  }

  equiposDe(categoria: string): EquipoEditable[] {
    return this.equipos().filter((e) => e.categoria === categoria);
  }

  // ---------- Personajes ----------

  /** Sube la imagen (si se elige una) y guarda el personaje. */
  guardar(personaje: PersonajeEditable, archivo: File | null): Promise<boolean> {
    return this.tarea(async () => {
      const nombre = validarNombre(personaje.nombre, 'El nombre');
      if (!personaje.mascota && !personaje.rol) throw new Error('Elige un rol (o marca que es mascota).');
      const img = archivo ? await this.imagenes.subir(this.validarImagen(archivo)) : personaje.img;
      // Las mascotas no tienen rol.
      await this.repo.guardar({ ...personaje, nombre, img, rol: personaje.mascota ? null : personaje.rol });
      await this.recargar();
      return `«${nombre}» guardado.`;
    });
  }

  eliminar(nombre: string): Promise<boolean> {
    return this.tarea(async () => {
      await this.repo.eliminar(nombre);
      await this.recargar();
      return `«${nombre}» eliminado.`;
    });
  }

  // ---------- Modos (categorías) ----------

  guardarCategoria(c: Categoria, anterior: string | null): Promise<boolean> {
    return this.tarea(async () => {
      const nombre = validarNombre(c.nombre, 'El nombre del modo');
      if (this.categorias().some((x) => x.nombre === nombre && x.nombre !== anterior)) throw new Error(`Ya existe el modo «${nombre}».`);
      const existente = anterior ? this.categorias().find((x) => x.nombre === anterior) : undefined;
      const orden = existente?.orden ?? siguiente(this.categorias());
      const datos: Categoria = {
        nombre,
        color: /^#[0-9a-f]{6}$/i.test(c.color) ? c.color : '#e8c26a',
        icono: c.icono.trim(),
        linea1: c.linea1.trim() || nombre,
        linea2: c.linea2.trim(),
      };
      await this.catalogoRepo.guardarCategoria(datos, orden, anterior);
      await this.recargar();
      return `Modo «${nombre}» guardado.`;
    });
  }

  eliminarCategoria(nombre: string): Promise<boolean> {
    return this.tarea(async () => {
      await this.catalogoRepo.eliminarCategoria(nombre);
      await this.recargar();
      return `Modo «${nombre}» eliminado.`;
    });
  }

  moverCategoria(nombre: string, paso: -1 | 1): Promise<boolean> {
    return this.tarea(async () => {
      const nombres = mover(this.categorias().map((c) => c.nombre), nombre, paso);
      if (!nombres) return;
      await this.catalogoRepo.ordenarCategorias(nombres);
      await this.recargar();
    });
  }

  // ---------- Submodos (equipos) ----------

  guardarEquipo(e: Equipo, actual: EquipoEditable | null): Promise<boolean> {
    return this.tarea(async () => {
      const submodo = validarNombre(e.submodo, 'El nombre del submodo');
      if (!this.categorias().some((c) => c.nombre === e.categoria)) throw new Error('Elige el modo al que pertenece.');
      if (this.equipos().some((x) => x.submodo === submodo && x.id !== actual?.id)) throw new Error(`Ya existe el submodo «${submodo}».`);
      const miembros = sinRepetir(e.miembros);
      const mascotas = sinRepetir(e.mascotas ?? []);
      const orden = actual?.orden ?? siguiente(this.equipos());
      await this.catalogoRepo.guardarEquipo({ categoria: e.categoria, submodo, miembros, mascotas }, orden, actual?.id ?? null, actual?.submodo ?? null);
      await this.recargar();
      return `Submodo «${submodo}» guardado.`;
    });
  }

  eliminarEquipo(e: EquipoEditable): Promise<boolean> {
    return this.tarea(async () => {
      await this.catalogoRepo.eliminarEquipo(e);
      await this.recargar();
      return `Submodo «${e.submodo}» eliminado.`;
    });
  }

  /** Sube o baja el submodo dentro de su modo. */
  moverEquipo(e: EquipoEditable, paso: -1 | 1): Promise<boolean> {
    return this.tarea(async () => {
      const ids = this.equipos().map((x) => x.id);
      const hermanos = this.equiposDe(e.categoria);
      const vecino = hermanos[hermanos.findIndex((x) => x.id === e.id) + paso];
      if (!vecino) return;
      const [i, j] = [ids.indexOf(e.id), ids.indexOf(vecino.id)];
      [ids[i], ids[j]] = [ids[j], ids[i]];
      await this.catalogoRepo.ordenarEquipos(ids);
      await this.recargar();
    });
  }

  // ---------- Alineaciones y prioridad de habilidad ----------

  /**
   * Guarda la alineación del submodo. Con `sincronizar`, los miembros del submodo pasan a ser
   * los personajes de todas sus fases (en Asedio deben coincidir), y sus mascotas las de las fases
   * (si las fases no tienen mascotas, se conservan las del submodo).
   */
  guardarFormacion(equipo: EquipoEditable, fases: Alineacion[], prioridad: string[], sincronizar: boolean): Promise<boolean> {
    return this.tarea(async () => {
      const limpias = fases
        .map((f) => ({ adelante: sinRepetir(f.adelante), atras: sinRepetir(f.atras), mascota: sinRepetir(f.mascota) }))
        .map((f) => ({ al: `${f.adelante.length}-${f.atras.length}`, ...f }));
      if (!limpias.length || limpias.some((f) => !f.adelante.length && !f.atras.length)) {
        throw new Error('Cada fase necesita al menos un personaje.');
      }
      const repetido = limpias.flatMap((f) => f.adelante.filter((n) => f.atras.includes(n)))[0];
      if (repetido) throw new Error(`«${repetido}» está a la vez adelante y atrás.`);
      const [principal, ...alternativas] = limpias;
      const pri = sinRepetir(prioridad);
      const f: Formacion = { ...principal, ...(alternativas.length ? { alternativas } : {}), ...(pri.length ? { prioridad: pri } : {}) };
      await this.catalogoRepo.guardarFormacion(equipo.submodo, f);
      if (sincronizar) {
        const miembros = sinRepetir(limpias.flatMap((x) => [...x.adelante, ...x.atras]));
        const deFases = sinRepetir(limpias.flatMap((x) => x.mascota));
        const mascotas = deFases.length ? deFases : (equipo.mascotas ?? []);
        if (miembros.join() !== equipo.miembros.join() || mascotas.join() !== (equipo.mascotas ?? []).join()) {
          await this.catalogoRepo.guardarEquipo({ ...equipo, miembros, mascotas }, equipo.orden, equipo.id, null);
        }
      }
      await this.recargar();
      return `Alineación de «${equipo.submodo}» guardada.`;
    });
  }

  eliminarFormacion(submodo: string): Promise<boolean> {
    return this.tarea(async () => {
      await this.catalogoRepo.eliminarFormacion(submodo);
      await this.recargar();
      return `Alineación de «${submodo}» eliminada.`;
    });
  }

  // ---------- Internos ----------

  private async recargar(): Promise<void> {
    const [personajes, catalogo] = await Promise.all([this.repo.listar(), this.catalogoRepo.leer()]);
    this.personajes.set(personajes);
    this.categorias.set(catalogo.categorias);
    this.equipos.set(catalogo.equipos);
    this.formaciones.set(catalogo.formaciones);
    this.cargado.set(true);
  }

  private validarImagen(archivo: File): File {
    if (!FORMATOS_IMAGEN.includes(archivo.type)) throw new Error('La imagen debe ser PNG, JPG o WEBP.');
    if (archivo.size > TAMANO_MAX_IMAGEN) throw new Error('La imagen no puede pasar de 2 MB.');
    return archivo;
  }

  /** Ejecuta una acción mostrando el estado de carga y el resultado o error. Devuelve si fue bien. */
  private async tarea(accion: () => Promise<string | void>): Promise<boolean> {
    this.ocupado.set(true);
    this.mensaje.set(null);
    try {
      const ok = await accion();
      if (ok) this.mensaje.set({ tipo: 'ok', texto: ok });
      return true;
    } catch (e) {
      this.mensaje.set({ tipo: 'error', texto: traducir(e) });
      return false;
    } finally {
      this.ocupado.set(false);
    }
  }
}

function validarNombre(valor: string, campo: string): string {
  const v = valor.trim();
  if (!v) throw new Error(`${campo} es obligatorio.`);
  if (v.includes('/')) throw new Error(`${campo} no puede contener «/».`);
  return v;
}

function sinRepetir(lista: string[]): string[] {
  return [...new Set(lista.map((x) => x.trim()).filter(Boolean))];
}

function siguiente(lista: { orden: number }[]): number {
  return lista.reduce((max, x) => Math.max(max, x.orden ?? 0), -1) + 1;
}

/** Copia de la lista con `item` desplazado `paso` posiciones; `null` si ya está en el extremo. */
function mover(lista: string[], item: string, paso: -1 | 1): string[] | null {
  const i = lista.indexOf(item);
  const j = i + paso;
  if (i < 0 || j < 0 || j >= lista.length) return null;
  const copia = [...lista];
  [copia[i], copia[j]] = [copia[j], copia[i]];
  return copia;
}

function traducir(e: unknown): string {
  const codigo = (e as { code?: string })?.code ?? '';
  if (codigo.includes('permission-denied')) return 'Sin permiso: tu UID no está en las reglas de Firestore.';
  if (codigo.includes('popup-closed') || codigo.includes('cancelled-popup')) return 'Se cerró la ventana de inicio de sesión.';
  if (codigo.includes('unauthorized-domain')) return 'Este dominio no está autorizado en Firebase Authentication.';
  if (codigo.includes('network-request-failed')) return 'Sin conexión. Inténtalo de nuevo.';
  return e instanceof Error ? e.message : String(e);
}
