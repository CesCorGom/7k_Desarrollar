import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../application/admin.service';
import { AdminAlineaciones } from '../admin/admin-alineaciones';
import { AdminModos } from '../admin/admin-modos';
import { AdminPersonajes } from '../admin/admin-personajes';

type Pestana = 'personajes' | 'modos' | 'alineaciones';

/** Zona de administración: sesión persistente con Google y edición de todo el catálogo. */
@Component({
  selector: 'app-admin',
  imports: [RouterLink, AdminPersonajes, AdminModos, AdminAlineaciones],
  templateUrl: './admin.html',
  providers: [AdminService],
})
export class Admin {
  protected readonly admin = inject(AdminService);
  protected readonly pestanas: { id: Pestana; nombre: string }[] = [
    { id: 'personajes', nombre: '🦸 Personajes' },
    { id: 'modos', nombre: '🎮 Modos y submodos' },
    { id: 'alineaciones', nombre: '🧩 Alineaciones' },
  ];
  protected readonly pestana = signal<Pestana>('personajes');
  protected readonly submodo = signal<string | null>(null);

  protected verAlineacion(submodo: string): void {
    this.submodo.set(submodo);
    this.pestana.set('alineaciones');
  }

  protected recargarWeb(): void {
    location.reload();
  }

  protected copiarUid(uid: string): void {
    navigator.clipboard?.writeText(uid);
  }
}
