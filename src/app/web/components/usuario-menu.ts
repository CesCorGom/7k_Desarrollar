import { Component, ElementRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SesionService } from '../../application/sesion.service';
import { iniciales } from './avatar';

/** Icono de usuario de la cabecera: iniciar sesión con Google, ir a Administración y salir. */
@Component({
  selector: 'app-usuario-menu',
  imports: [RouterLink],
  templateUrl: './usuario-menu.html',
  host: {
    class: 'umenu',
    '(document:click)': 'fuera($event)',
    '(document:keydown.escape)': 'abierto.set(false)',
  },
})
export class UsuarioMenu {
  protected readonly sesion = inject(SesionService);
  private readonly el = inject(ElementRef<HTMLElement>);
  protected readonly abierto = signal(false);
  protected readonly entrando = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly iniciales = iniciales;

  protected alternar(): void {
    this.error.set(null);
    this.abierto.update((a) => !a);
  }

  protected fuera(e: Event): void {
    if (!this.el.nativeElement.contains(e.target as Node)) this.abierto.set(false);
  }

  protected async entrar(): Promise<void> {
    this.entrando.set(true);
    this.error.set(null);
    try {
      await this.sesion.entrar();
    } catch (e) {
      const codigo = (e as { code?: string })?.code ?? '';
      this.error.set(
        codigo.includes('popup-closed') || codigo.includes('cancelled-popup')
          ? 'Se cerró la ventana de Google.'
          : codigo.includes('unauthorized-domain')
            ? 'Este dominio no está autorizado en Firebase.'
            : 'No se pudo iniciar sesión. Inténtalo de nuevo.',
      );
    } finally {
      this.entrando.set(false);
    }
  }

  protected async salir(): Promise<void> {
    await this.sesion.salir();
    this.abierto.set(false);
  }
}
