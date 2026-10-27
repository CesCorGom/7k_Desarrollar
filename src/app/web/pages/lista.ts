import { Component, inject } from '@angular/core';
import { CatalogoService } from '../../application/catalogo.service';
import { ListaPersonajesService } from '../../application/lista-personajes.service';
import { SeleccionStore } from '../../application/seleccion.store';
import { Avatar } from '../components/avatar';
import { ROL_COLOR, ROL_ICONO } from '../shared/rol-estilo';

@Component({
  selector: 'app-lista',
  imports: [Avatar],
  templateUrl: './lista.html',
})
export class Lista {
  private readonly catalogo = inject(CatalogoService);
  private readonly lista = inject(ListaPersonajesService);
  protected readonly seleccion = inject(SeleccionStore);
  protected readonly rolColor = ROL_COLOR;
  protected readonly rolIcono = ROL_ICONO;
  protected readonly filtrados = this.lista.filtrados;
  protected readonly total = this.lista.total;

  protected rol(n: string) {
    return this.catalogo.rol(n);
  }
}
