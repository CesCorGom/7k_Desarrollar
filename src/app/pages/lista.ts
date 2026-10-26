import { Component, computed, inject, signal } from '@angular/core';
import { Avatar } from '../components/avatar';
import { PERSONAJES, PJ, ROL_COLOR, ROL_ICONO, Rol } from '../data/personajes';
import { JuegoService } from '../juego.service';

@Component({
  selector: 'app-lista',
  imports: [Avatar],
  template: `
    <div class="tools">
      <input type="search" placeholder="Buscar personaje..." autocomplete="off" (input)="termino.set($any($event.target).value)" />
      <button (click)="porUso.set(!porUso())">{{ porUso() ? 'Más usados' : 'A–Z' }}</button>
    </div>
    <div class="roles">
      <button [class.on]="!filtroRol()" (click)="filtroRol.set(null)">Todos</button>
      @for (r of roles; track r) {
        <button [class.on]="filtroRol() === r" [style.--c]="rolColor[r]" (click)="filtroRol.set(filtroRol() === r ? null : r)">
          @if (rolIcono[r].endsWith('.svg')) {<img class="ri" [src]="rolIcono[r]" alt="" />} @else {<span class="ri">{{ rolIcono[r] }}</span>}
          {{ r }}
        </button>
      }
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
                <span class="rl" [style.color]="rolColor[r]" [style.border-color]="rolColor[r]">{{ r }}</span>@if (rolIcono[r].endsWith('.svg')) {<img class="ri" [src]="rolIcono[r]" alt="" />} @else {<span class="ri">{{ rolIcono[r] }}</span>}
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
  protected readonly filtroRol = signal<Rol | null>(null);
  protected readonly roles = [...new Set(PERSONAJES.map((p) => p.rol).filter((r): r is Rol => !!r))];
  protected readonly rolColor = ROL_COLOR;
  protected readonly rolIcono = ROL_ICONO;

  protected readonly filtrados = computed(() => {
    const t = this.termino().trim().toLowerCase();
    const r = this.filtroRol();
    return this.juego.personajes
      .filter((p) => p.nombre.toLowerCase().includes(t) && (!r || this.rol(p.nombre) === r))
      .sort((a, b) => (this.porUso() ? b.total - a.total : 0) || a.nombre.localeCompare(b.nombre));
  });

  protected rol(n: string) {
    return PJ[n]?.rol;
  }
}
