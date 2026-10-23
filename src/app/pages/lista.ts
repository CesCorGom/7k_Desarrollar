import { Component, computed, inject, signal } from '@angular/core';
import { Avatar } from '../components/avatar';
import { PJ, ROL_COLOR, ROL_ICONO } from '../data/personajes';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-lista',
  imports: [Avatar],
  template: `
    <div class="tools">
      <input type="search" placeholder="Buscar personaje..." autocomplete="off" (input)="termino.set($any($event.target).value)" />
      <button (click)="porUso.set(!porUso())">{{ porUso() ? 'Más usados' : 'A–Z' }}</button>
    </div>
    <p class="cnt">{{ filtrados().length }} de {{ juego.personajes.length }} personajes</p>
    <div class="th"><span>#</span><span></span><span><em>Personaje</em></span></div>
    <div class="list">
      @for (p of filtrados(); track p.nombre; let i = $index) {
        <div class="r" (click)="juego.abierto.set(p.nombre)">
          <div class="no">{{ i + 1 }}</div>
          <app-avatar [nombre]="p.nombre" />
          <div class="tx">
            <div class="nm">
              {{ p.nombre }}
              @if (rol(p.nombre); as r) {
                <span class="rl" [style.color]="rolColor[r]" [style.border-color]="rolColor[r]">{{ r }}</span><span class="ri">{{ rolIcono[r] }}</span>
              }
            </div>
          </div>
        </div>
      } @empty {
        <div class="empty">Sin resultados</div>
      }
    </div>
  `,
})
export class Lista {
  protected readonly juego = inject(JuegoService);
  protected readonly termino = signal('');
  protected readonly porUso = signal(false);
  protected readonly rolColor = ROL_COLOR;
  protected readonly rolIcono = ROL_ICONO;

  protected readonly filtrados = computed(() => {
    const t = this.termino().trim().toLowerCase();
    return this.juego.personajes
      .filter((p) => p.nombre.toLowerCase().includes(t))
      .sort((a, b) => (this.porUso() ? b.total - a.total : 0) || a.nombre.localeCompare(b.nombre));
  });

  protected rol(n: string) {
    return PJ[n]?.rol;
  }
}
