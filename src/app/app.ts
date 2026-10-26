import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { Filtros } from './components/filtros';
import { PersonajeModal } from './components/personaje-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Filtros, PersonajeModal],
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);
  protected readonly secciones = [
    { ruta: '/', icono: '📜', nombre: 'Lista completa' },
    { ruta: '/submodos', icono: '🎮', nombre: 'Submodos' },
    { ruta: '/personajes', icono: '🦸', nombre: 'Tasa Uso Personajes' },
    { ruta: '/mascotas', icono: '🐾', nombre: 'Tasa Uso Mascotas' },
    { ruta: '/roles', icono: '🛡️', nombre: 'Tasa Uso Roles' },
  ];
  protected readonly ruta = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url.split(/[?#]/)[0]),
    ),
    { initialValue: '/' },
  );
  /** Submenú de filtros de la pestaña activa. */
  protected readonly submenu = signal(true);

  /** Pulsar la pestaña activa pliega o despliega su submenú; cambiar de pestaña lo abre. */
  protected pulsar(ruta: string): void {
    this.submenu.update((abierto) => (ruta === this.ruta() ? !abierto : true));
  }
}
