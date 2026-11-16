import { Component, computed, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { AdminService } from '../../application/admin.service';
import { Categoria, CategoriaEditable, Equipo, EquipoEditable } from '../../domain/models/modo';
import { ListaNombres } from './lista-nombres';

interface EdicionModo {
  datos: Categoria;
  anterior: string | null;
}

interface EdicionSubmodo {
  datos: Equipo;
  actual: EquipoEditable | null;
  /** Modo en cuya tarjeta se muestra el formulario. */
  origen: string;
}

/** Modos de juego (categorías) y sus submodos con los miembros recomendados. */
@Component({
  selector: 'app-admin-modos',
  imports: [FormsModule, NgTemplateOutlet, ListaNombres],
  templateUrl: './admin-modos.html',
})
export class AdminModos {
  protected readonly admin = inject(AdminService);
  /** Pide abrir la alineación de un submodo. */
  readonly alineacion = output<string>();

  protected readonly modo = signal<EdicionModo | null>(null);
  protected readonly submodo = signal<EdicionSubmodo | null>(null);
  /** Modos plegados (por nombre). */
  protected readonly plegados = signal<ReadonlySet<string>>(new Set());
  protected readonly busqueda = signal('');

  protected readonly totalSubmodos = computed(() => this.admin.equipos().length);
  protected readonly totalAlineaciones = computed(
    () => this.admin.equipos().filter((e) => this.tieneAlineacion(e.submodo)).length,
  );

  /** Modos con los submodos que coinciden con la búsqueda (por nombre de submodo o de miembro). */
  protected readonly vista = computed(() => {
    const q = normalizar(this.busqueda());
    return this.admin
      .categorias()
      .map((c, i, todas) => {
        const equipos = this.admin.equiposDe(c.nombre);
        const coincideModo = !q || normalizar(c.nombre).includes(q);
        const visibles = coincideModo
          ? equipos
          : equipos.filter((e) => normalizar(e.submodo).includes(q) || [...e.miembros, ...(e.mascotas ?? [])].some((m) => normalizar(m).includes(q)));
        return { c, equipos: visibles, total: equipos.length, primero: i === 0, ultimo: i === todas.length - 1 };
      })
      .filter((v) => !q || v.equipos.length || normalizar(v.c.nombre).includes(q));
  });

  protected plegado(nombre: string): boolean {
    return !this.busqueda().trim() && this.plegados().has(nombre);
  }

  protected alternar(nombre: string): void {
    this.plegados.update((s) => {
      const n = new Set(s);
      if (n.has(nombre)) n.delete(nombre);
      else n.add(nombre);
      return n;
    });
  }

  protected plegarTodo(plegar: boolean): void {
    this.plegados.set(new Set(plegar ? this.admin.categorias().map((c) => c.nombre) : []));
  }

  protected todoPlegado(): boolean {
    const cs = this.admin.categorias();
    return cs.length > 0 && cs.every((c) => this.plegados().has(c.nombre));
  }

  protected abrir(nombre: string): void {
    this.plegados.update((s) => {
      const n = new Set(s);
      n.delete(nombre);
      return n;
    });
  }

  protected nuevoModo(): void {
    this.submodo.set(null);
    this.modo.set({ datos: { nombre: '', color: '#e8c26a', icono: '', linea1: '', linea2: '' }, anterior: null });
  }

  protected editarModo(c: CategoriaEditable): void {
    const { orden, ...datos } = c;
    this.submodo.set(null);
    this.abrir(c.nombre);
    this.modo.set({ datos: { ...datos }, anterior: c.nombre });
  }

  protected async guardarModo(): Promise<void> {
    const m = this.modo();
    if (m && (await this.admin.guardarCategoria(m.datos, m.anterior))) this.modo.set(null);
  }

  protected async eliminarModo(c: CategoriaEditable): Promise<void> {
    const n = this.admin.equiposDe(c.nombre).length;
    const aviso = n ? ` También se borrarán sus ${n} submodos y sus alineaciones.` : '';
    if (confirm(`¿Eliminar el modo «${c.nombre}»?${aviso}`)) await this.admin.eliminarCategoria(c.nombre);
  }

  protected nuevoSubmodo(categoria: string): void {
    this.modo.set(null);
    this.abrir(categoria);
    this.submodo.set({ datos: { categoria, submodo: '', miembros: [], mascotas: [] }, actual: null, origen: categoria });
  }

  protected editarSubmodo(e: EquipoEditable): void {
    this.modo.set(null);
    this.submodo.set({
      datos: { categoria: e.categoria, submodo: e.submodo, miembros: [...e.miembros], mascotas: [...(e.mascotas ?? [])] },
      actual: e,
      origen: e.categoria,
    });
  }

  protected async guardarSubmodo(): Promise<void> {
    const s = this.submodo();
    if (s && (await this.admin.guardarEquipo(s.datos, s.actual))) this.submodo.set(null);
  }

  protected async eliminarSubmodo(e: EquipoEditable): Promise<void> {
    if (confirm(`¿Eliminar el submodo «${e.submodo}» y su alineación?`)) await this.admin.eliminarEquipo(e);
  }

  protected tieneAlineacion(submodo: string): boolean {
    return !!this.admin.formaciones()[submodo];
  }
}

function normalizar(t: string): string {
  return t
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}
