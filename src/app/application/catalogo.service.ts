import { Injectable, inject } from '@angular/core';
import { Formacion, mascotasDe } from '../domain/models/formacion';
import { Equipo } from '../domain/models/modo';
import { Personaje, Rol } from '../domain/models/personaje';
import { FormacionRepository } from '../domain/ports/formacion.repository';
import { ModoRepository } from '../domain/ports/modo.repository';
import { PersonajeRepository } from '../domain/ports/personaje.repository';

/** Consultas de solo lectura sobre personajes, modos y formaciones. */
@Injectable({ providedIn: 'root' })
export class CatalogoService {
  private readonly personajes = inject(PersonajeRepository);
  private readonly modos = inject(ModoRepository);
  private readonly formaciones = inject(FormacionRepository);

  readonly categorias = this.modos.categorias();
  readonly equipos = this.modos.equipos();
  readonly totalEquipos = this.equipos.length;
  readonly mascotas = this.personajes.mascotas();
  /** Roles presentes en el catálogo, en orden de aparición. */
  readonly roles = [...new Set(this.personajes.personajes().map((p) => p.rol).filter((r): r is Rol => !!r))];

  personaje(nombre: string): Personaje | undefined {
    return this.personajes.buscar(nombre);
  }

  rol(nombre: string): Rol | null {
    return this.personajes.buscar(nombre)?.rol ?? null;
  }

  formacion(submodo: string): Formacion | undefined {
    return this.formaciones.deSubmodo(submodo);
  }

  equiposDe(categoria: string): Equipo[] {
    return this.equipos.filter((e) => e.categoria === categoria);
  }

  mascotasDeEquipo(e: Equipo): string[] {
    const f = this.formacion(e.submodo);
    return f ? mascotasDe(f) : [];
  }
}
