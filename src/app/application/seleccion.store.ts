import { Injectable, signal } from '@angular/core';

/** Personaje o mascota seleccionado para ver su detalle. */
@Injectable({ providedIn: 'root' })
export class SeleccionStore {
  readonly abierto = signal<string | null>(null);

  abrir(nombre: string): void {
    this.abierto.set(nombre);
  }

  cerrar(): void {
    this.abierto.set(null);
  }
}
