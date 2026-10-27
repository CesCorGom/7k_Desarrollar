import { Component, computed, input } from '@angular/core';
import { PJ } from '../data/personajes';

export function hue(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
}

export function degradado(s: string): string {
  const h = hue(s);
  return `linear-gradient(135deg,hsl(${h},60%,45%),hsl(${h + 40},60%,28%))`;
}

export function iniciales(n: string): string {
  const p = n.split(' ');
  return (p.length > 1 ? p[0][0] + p[1][0] : n.slice(0, 2)).toUpperCase();
}

@Component({
  selector: 'app-avatar',
  host: { style: 'display:contents' },
  templateUrl: './avatar.html',
})
export class Avatar {
  readonly nombre = input.required<string>();
  protected readonly img = computed(() => PJ[this.nombre()]?.img);
  protected readonly fondo = computed(() => degradado(this.nombre()));
  protected readonly ini = computed(() => iniciales(this.nombre()));
}
