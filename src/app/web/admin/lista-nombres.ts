import { Avatar } from '../components/avatar';
import { Component, computed, input, model, signal } from '@angular/core';

let siguienteId = 0;

/**
 * Editor de una lista ordenada de textos (miembros de un equipo, una fila de la alineación o la
 * prioridad de habilidad): añadir con sugerencias, quitar y reordenar.
 */
@Component({
  selector: 'app-lista-nombres',
  imports: [Avatar],
  templateUrl: './lista-nombres.html',
})
export class ListaNombres {
  readonly nombres = model.required<string[]>();
  /** Sugerencias del campo de alta. */
  readonly opciones = input<readonly string[]>([]);
  /** Si se indica, los nombres que no estén aquí se marcan como desconocidos. */
  readonly validos = input<readonly string[] | null>(null);
  readonly placeholder = input('Añadir…');
  /** Lista vertical numerada (para la prioridad). */
  readonly numerada = input(false);
  readonly deshabilitada = input(false);
  /** Muestra el avatar de cada nombre en su chip. */
  readonly avatares = input(false);

  protected readonly lista = `ln-${++siguienteId}`;
  protected readonly nuevo = signal('');
  protected readonly sugerencias = computed(() => this.opciones().filter((o) => !this.nombres().includes(o)));

  protected desconocido(n: string): boolean {
    const v = this.validos();
    return !!v && !v.includes(n);
  }

  protected agregar(e?: Event): void {
    e?.preventDefault();
    const n = this.nuevo().trim();
    if (n && !this.nombres().includes(n)) this.nombres.set([...this.nombres(), n]);
    this.nuevo.set('');
  }

  /** Añade directamente al elegir una sugerencia del desplegable (no al teclear). */
  protected alEscribir(e: Event): void {
    const valor = (e.target as HTMLInputElement).value;
    this.nuevo.set(valor);
    const delDesplegable = !(e instanceof InputEvent) || e.inputType === 'insertReplacementText';
    if (delDesplegable && this.sugerencias().includes(valor)) this.agregar();
  }

  protected quitar(i: number): void {
    this.nombres.set(this.nombres().filter((_, j) => j !== i));
  }

  protected mover(i: number, paso: -1 | 1): void {
    const j = i + paso;
    const copia = [...this.nombres()];
    if (j < 0 || j >= copia.length) return;
    [copia[i], copia[j]] = [copia[j], copia[i]];
    this.nombres.set(copia);
  }
}
