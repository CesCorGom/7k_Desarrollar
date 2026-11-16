import { Injectable, computed, inject, signal } from '@angular/core';
import { Usuario } from '../domain/models/usuario';
import { Autenticacion } from '../domain/ports/autenticacion';

const CLAVE = 'rol7k.sesion';
type Recuerdo = 'admin' | 'usuario' | null;

/**
 * Sesión del usuario en toda la web. Solo se consulta Firebase si en este navegador hubo una
 * sesión o al pulsar «Entrar»; mientras tanto se usa lo recordado para pintar el menú al instante.
 */
@Injectable({ providedIn: 'root' })
export class SesionService {
  private readonly auth = inject(Autenticacion);
  private escuchando = false;

  readonly usuario = signal<Usuario | null>(null);
  /** `true` mientras se averigua si hay sesión. */
  readonly comprobando = signal(false);
  private readonly recordada = signal<Recuerdo>(leer());

  readonly conectado = computed(() => (this.comprobando() ? !!this.recordada() : !!this.usuario()));
  readonly admin = computed(() => (this.comprobando() ? this.recordada() === 'admin' : !!this.usuario()?.admin));

  constructor() {
    if (this.recordada()) this.escuchar();
  }

  /** Empieza a seguir la sesión (carga Firebase Auth si aún no lo estaba). */
  escuchar(): void {
    if (this.escuchando) return;
    this.escuchando = true;
    this.comprobando.set(true);
    this.auth.observar((u) => {
      this.usuario.set(u);
      this.comprobando.set(false);
      this.recordar(u ? (u.admin ? 'admin' : 'usuario') : null);
    });
  }

  async entrar(): Promise<void> {
    // Si el login va por redirección, al volver hay que escuchar para recoger el resultado.
    if (!this.recordada()) this.recordar('usuario');
    this.escuchar();
    try {
      await this.auth.entrar();
    } catch (e) {
      if (!this.usuario()) this.recordar(null);
      throw e;
    }
  }

  async salir(): Promise<void> {
    await this.auth.salir();
  }

  private recordar(r: Recuerdo): void {
    this.recordada.set(r);
    try {
      if (r) localStorage.setItem(CLAVE, r);
      else localStorage.removeItem(CLAVE);
    } catch {
      // Almacenamiento bloqueado: solo se pierde el atajo.
    }
  }
}

function leer(): Recuerdo {
  try {
    const v = localStorage.getItem(CLAVE);
    return v === 'admin' || v === 'usuario' ? v : null;
  } catch {
    return null;
  }
}
