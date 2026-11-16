import { Injectable, signal } from '@angular/core';

const CLAVE = 'rol7k.admin';

/**
 * Recuerda en este navegador que hay una sesión de administrador, para mostrar la pestaña
 * «Admin» sin tener que cargar Firebase Auth en la web pública.
 */
@Injectable({ providedIn: 'root' })
export class SesionAdminStore {
  readonly activa = signal(leer());

  marcar(activa: boolean): void {
    this.activa.set(activa);
    try {
      if (activa) localStorage.setItem(CLAVE, '1');
      else localStorage.removeItem(CLAVE);
    } catch {
      // Almacenamiento bloqueado: solo se pierde el atajo del menú.
    }
  }
}

function leer(): boolean {
  try {
    return localStorage.getItem(CLAVE) === '1';
  } catch {
    return false;
  }
}
