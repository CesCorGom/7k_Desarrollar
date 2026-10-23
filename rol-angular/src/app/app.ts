import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { Leyenda } from './components/leyenda';
import { PersonajeModal } from './components/personaje-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Leyenda, PersonajeModal],
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);
  /** La leyenda (filtro por categoría) no aplica a la lista completa. */
  protected readonly enLista = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url.split('?')[0] === '/'),
    ),
    { initialValue: true },
  );
}
