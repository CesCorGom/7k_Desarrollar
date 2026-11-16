import { Injectable } from '@angular/core';
import { Usuario } from '../../domain/models/usuario';
import { Autenticacion } from '../../domain/ports/autenticacion';

/**
 * Carga Firebase Auth solo cuando se necesita (al iniciar sesión o si ya había una), para que la
 * web pública no descargue el SDK de autenticación.
 */
@Injectable()
export class AutenticacionDiferida extends Autenticacion {
  private real?: Promise<Autenticacion>;

  private cargar(): Promise<Autenticacion> {
    return (this.real ??= import('./autenticacion-firebase').then((m) => new m.AutenticacionFirebase()));
  }

  observar(cambio: (usuario: Usuario | null) => void): () => void {
    let dejar: (() => void) | null = null;
    let terminado = false;
    this.cargar().then((a) => {
      if (!terminado) dejar = a.observar(cambio);
    });
    return () => {
      terminado = true;
      dejar?.();
    };
  }

  async entrar(): Promise<void> {
    await (await this.cargar()).entrar();
  }

  async salir(): Promise<void> {
    await (await this.cargar()).salir();
  }
}
