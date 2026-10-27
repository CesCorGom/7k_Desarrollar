import { Component, computed, inject } from '@angular/core';
import { FiltrosStore } from '../../application/filtros.store';
import { RankingsService } from '../../application/rankings.service';
import { SeleccionStore } from '../../application/seleccion.store';
import { Rol } from '../../domain/models/personaje';
import { porcentaje } from '../../domain/services/conteo';
import { ROL_COLOR, ROL_ICONO } from '../shared/rol-estilo';

@Component({
  selector: 'app-uso-roles',
  templateUrl: './uso-roles.html',
})
export class UsoRoles {
  private readonly rankings = inject(RankingsService);
  protected readonly seleccion = inject(SeleccionStore);
  protected readonly pct = porcentaje;
  protected readonly equipos = this.rankings.totalEquipos;
  protected readonly puestos = this.rankings.puestos;
  protected readonly filtro = inject(FiltrosStore).sufijo;

  protected readonly roles = computed(() =>
    this.rankings.rolesDetalle().map((r) => ({
      ...r,
      color: ROL_COLOR[r.nombre as Rol] ?? '#888',
      icono: ROL_ICONO[r.nombre as Rol] ?? '?',
    })),
  );
}
