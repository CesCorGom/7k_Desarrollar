import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { SesionService } from '../application/sesion.service';
import { Filtros } from './components/filtros';
import { PersonajeModal } from './components/personaje-modal';
import { UsuarioMenu } from './components/usuario-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Filtros, PersonajeModal, UsuarioMenu],
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);
  private readonly sesion = inject(SesionService);
  private readonly publicas = [
    { ruta: '/', icono: '📜', nombre: 'Lista completa', corto: 'Lista' },
    { ruta: '/submodos', icono: '🎮', nombre: 'Submodos', corto: 'Submodos' },
    { ruta: '/personajes', icono: '🦸', nombre: 'Tasa Uso Personajes', corto: 'Personajes' },
    { ruta: '/mascotas', icono: '🐾', nombre: 'Tasa Uso Mascotas', corto: 'Mascotas' },
    { ruta: '/roles', icono: '🛡️', nombre: 'Tasa Uso Roles', corto: 'Roles' },
  ];
  /** La pestaña «Admin» solo aparece con una sesión de administrador. */
  protected readonly secciones = computed(() =>
    this.sesion.admin() ? [...this.publicas, { ruta: '/admin', icono: '⚙️', nombre: 'Admin', corto: 'Admin' }] : this.publicas,
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
