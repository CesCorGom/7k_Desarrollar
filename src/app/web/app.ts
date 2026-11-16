import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { SesionAdminStore } from '../application/sesion-admin.store';
import { Filtros } from './components/filtros';
import { PersonajeModal } from './components/personaje-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Filtros, PersonajeModal],
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);
  private readonly sesionAdmin = inject(SesionAdminStore);
  private readonly publicas = [
    { ruta: '/', icono: '📜', nombre: 'Lista completa' },
    { ruta: '/submodos', icono: '🎮', nombre: 'Submodos' },
    { ruta: '/personajes', icono: '🦸', nombre: 'Tasa Uso Personajes' },
    { ruta: '/mascotas', icono: '🐾', nombre: 'Tasa Uso Mascotas' },
    { ruta: '/roles', icono: '🛡️', nombre: 'Tasa Uso Roles' },
  ];
  /** La pestaña «Admin» solo aparece en el navegador donde se inició sesión como administrador. */
  protected readonly secciones = computed(() =>
    this.sesionAdmin.activa() ? [...this.publicas, { ruta: '/admin', icono: '⚙️', nombre: 'Admin' }] : this.publicas,
  );
  protected readonly ruta = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url.split(/[?#]/)[0]),
    ),
    { initialValue: '/' },
  );
  /** Submenú de filtros de la pestaña activa. */
  protected readonly submenu = signal(true);
  /** La zona de administración no tiene filtros. */
  protected readonly conFiltros = computed(() => this.submenu() && this.ruta() !== '/admin');

  /** Pulsar la pestaña activa pliega o despliega su submenú; cambiar de pestaña lo abre. */
  protected pulsar(ruta: string): void {
    this.submenu.update((abierto) => (ruta === this.ruta() ? !abierto : true));
  }
}
