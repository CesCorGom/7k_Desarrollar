import { Routes } from '@angular/router';
import { Lista } from './pages/lista';
import { Submodos } from './pages/submodos';
import { UsoMascotas } from './pages/uso-mascotas';
import { UsoPersonajes } from './pages/uso-personajes';
import { UsoRoles } from './pages/uso-roles';

export const routes: Routes = [
  { path: '', component: Lista, title: 'Lista completa' },
  { path: 'submodos', component: Submodos, title: 'Submodos' },
  { path: 'personajes', component: UsoPersonajes, title: 'Tasa uso personajes' },
  { path: 'mascotas', component: UsoMascotas, title: 'Tasa uso mascotas' },
  { path: 'roles', component: UsoRoles, title: 'Tasa uso roles' },
  { path: '**', redirectTo: '' },
];
