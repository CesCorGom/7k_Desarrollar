import { Component, computed, inject, linkedSignal, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../application/admin.service';
import { Alineacion, Formacion, fasesDe } from '../../domain/models/formacion';
import { EquipoEditable } from '../../domain/models/modo';
import { ListaNombres } from './lista-nombres';

const HABILIDADES = ['1ra', '2da', '3ra'];

interface Borrador {
  existe: boolean;
  fases: Alineacion[];
  prioridad: string[];
  sincronizar: boolean;
}

/** Alineación por fases (adelante, atrás, mascota) y prioridad de habilidad de cada submodo. */
@Component({
  selector: 'app-admin-alineaciones',
  imports: [FormsModule, ListaNombres],
  templateUrl: './admin-alineaciones.html',
})
export class AdminAlineaciones {
  protected readonly admin = inject(AdminService);
  /** Submodo elegido. */
  readonly submodo = model<string | null>(null);

  protected readonly equipo = computed(() => this.admin.equipos().find((e) => e.submodo === this.submodo()) ?? null);

  /** Copia editable; se reinicia al cambiar de submodo o al recargar los datos guardados. */
  protected readonly borrador = linkedSignal<Borrador | null>(() => {
    const e = this.equipo();
    return e ? crearBorrador(e, this.admin.formaciones()[e.submodo]) : null;
  });

  protected agregarFase(b: Borrador): void {
    b.fases = [...b.fases, { al: '', adelante: [], atras: [], mascota: [] }];
  }

  protected quitarFase(b: Borrador, i: number): void {
    if (confirm(`¿Quitar la fase ${i + 1}?`)) b.fases = b.fases.filter((_, j) => j !== i);
  }

  protected crear(b: Borrador, e: EquipoEditable): void {
    b.existe = true;
    // Propuesta inicial: los miembros del submodo, 4 adelante y el resto atrás.
    b.fases = [{ al: '', adelante: e.miembros.slice(0, 4), atras: e.miembros.slice(4, 5), mascota: [] }];
  }

  /** Personajes de todas las fases. */
  protected personajesDe(b: Borrador): string[] {
    return [...new Set(b.fases.flatMap((f) => [...f.adelante, ...f.atras]))];
  }

  /** Sugerencias para la prioridad: «1ra de X», «2da de X», «3ra de X» de cada personaje de la alineación. */
  protected sugerenciasPrioridad(b: Borrador): string[] {
    return this.personajesDe(b).flatMap((n) => HABILIDADES.map((h) => `${h} de ${n}`));
  }

  /** Diferencias entre los miembros del submodo y los de la alineación. */
  protected diferencias(b: Borrador, e: EquipoEditable): { sobran: string[]; faltan: string[] } {
    const al = this.personajesDe(b);
    return { sobran: e.miembros.filter((m) => !al.includes(m)), faltan: al.filter((m) => !e.miembros.includes(m)) };
  }

  protected async guardar(b: Borrador, e: EquipoEditable): Promise<void> {
    await this.admin.guardarFormacion(e, b.fases, b.prioridad, b.sincronizar);
  }

  protected async eliminar(e: EquipoEditable): Promise<void> {
    if (confirm(`¿Eliminar la alineación y la prioridad de «${e.submodo}»?`)) await this.admin.eliminarFormacion(e.submodo);
  }

  protected descartar(): void {
    const e = this.equipo();
    this.borrador.set(e ? crearBorrador(e, this.admin.formaciones()[e.submodo]) : null);
  }
}

function crearBorrador(e: EquipoEditable, f: Formacion | undefined): Borrador {
  const copia = (x: Alineacion): Alineacion => ({ al: x.al, adelante: [...x.adelante], atras: [...x.atras], mascota: [...x.mascota] });
  const fases = fasesDe(f).map(copia);
  const al = new Set(fases.flatMap((x) => [...x.adelante, ...x.atras]));
  const coinciden = al.size === new Set(e.miembros).size && e.miembros.every((m) => al.has(m));
  return { existe: !!f, fases, prioridad: [...(f?.prioridad ?? [])], sincronizar: !f || coinciden || e.categoria === 'Asedio' };
}
