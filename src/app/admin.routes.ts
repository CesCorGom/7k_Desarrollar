import { Routes } from '@angular/router';
import { provideAdminInfraestructura } from './infrastructure/admin.providers';
import { Admin } from './web/pages/admin';

/** Zona de administración. Se carga de forma diferida: el login y la escritura no pesan en la web pública. */
export const ADMIN_ROUTES: Routes = [
  { path: '', component: Admin, title: 'Administración', providers: [provideAdminInfraestructura()] },
];
