import { Injectable, InjectionToken, inject } from '@angular/core';
import { ReglaEquipo } from '../domain/reglas/regla-equipo';
import { CatalogoService } from './catalogo.service';

/** Reglas registradas (multi-provider). Añadir una regla no modifica este servicio. */
export const REGLAS_EQUIPO = new InjectionToken<ReglaEquipo[]>('REGLAS_EQUIPO');

/** Revisa los datos de los equipos al arrancar y avisa por consola de las incoherencias. */
@Injectable({ providedIn: 'root' })
export class ValidarEquiposService {
  private readonly catalogo = inject(CatalogoService);
  private readonly reglas = inject(REGLAS_EQUIPO, { optional: true }) ?? [];

  ejecutar(): void {
    this.catalogo.equipos.forEach((e) => this.reglas.forEach((r) => r.validar(e).forEach((aviso) => console.warn(aviso))));
  }
}
