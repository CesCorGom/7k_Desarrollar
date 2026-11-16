import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService, FORMATOS_IMAGEN } from '../../application/admin.service';
import { PersonajeEditable, Rol } from '../../domain/models/personaje';
import { degradado, iniciales } from '../components/avatar';
import { ROL_COLOR } from '../shared/rol-estilo';

const VACIO: PersonajeEditable = { nombre: '', img: null, rol: null, mascota: false };

/** Alta, edición y baja de personajes y mascotas con su imagen. */
@Component({
  selector: 'app-admin-personajes',
  imports: [FormsModule],
  templateUrl: './admin-personajes.html',
})
export class AdminPersonajes {
  protected readonly admin = inject(AdminService);
  protected readonly roles: Rol[] = ['Attack', 'Mage', 'Healer', 'Debuffer', 'Tank'];
  protected readonly rolColor = ROL_COLOR;
  protected readonly aceptar = FORMATOS_IMAGEN.join(',');
  protected readonly degradado = degradado;
  protected readonly iniciales = iniciales;

  /** Personaje en edición; `null` si el formulario está cerrado. */
  protected readonly editando = signal<PersonajeEditable | null>(null);
  /** `true` si es un alta (el nombre se puede escribir). */
  protected readonly nuevo = signal(false);
  protected readonly archivo = signal<File | null>(null);
  protected readonly vistaPrevia = signal<string | null>(null);
  protected readonly filtro = signal('');
  protected readonly tipo = signal<'todos' | 'personajes' | 'mascotas'>('todos');

  protected readonly lista = computed(() => {
    const t = this.filtro().trim().toLowerCase();
    const tipo = this.tipo();
    return this.admin
      .personajes()
      .filter((p) => tipo === 'todos' || (tipo === 'mascotas') === p.mascota)
      .filter((p) => p.nombre.toLowerCase().includes(t));
  });

  /** Abre el formulario de alta de un personaje o de una mascota. */
  protected crear(mascota: boolean): void {
    this.abrir({ ...VACIO, mascota }, true);
  }

  protected editar(p: PersonajeEditable): void {
    this.abrir({ ...p }, false);
  }

  protected cancelar(): void {
    this.editando.set(null);
    this.elegir(null);
  }

  protected elegir(archivo: File | null): void {
    const previa = this.vistaPrevia();
    if (previa) URL.revokeObjectURL(previa);
    this.archivo.set(archivo);
    this.vistaPrevia.set(archivo ? URL.createObjectURL(archivo) : null);
  }

  protected alElegir(e: Event): void {
    this.elegir((e.target as HTMLInputElement).files?.[0] ?? null);
  }

  protected async guardar(): Promise<void> {
    const p = this.editando();
    if (!p) return;
    if (this.nuevo() && this.admin.personajes().some((x) => x.nombre === p.nombre.trim())) {
      if (!confirm(`Ya existe «${p.nombre.trim()}». ¿Reemplazarlo?`)) return;
    }
    if (await this.admin.guardar(p, this.archivo())) this.cancelar();
  }

  protected async eliminar(p: PersonajeEditable): Promise<void> {
    if (confirm(`¿Eliminar «${p.nombre}»? Los equipos que lo usen dejarán de mostrar su imagen y rol.`)) {
      await this.admin.eliminar(p.nombre);
    }
  }

  private abrir(p: PersonajeEditable, nuevo: boolean): void {
    this.elegir(null);
    this.nuevo.set(nuevo);
    this.editando.set(p);
  }
}
