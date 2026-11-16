import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { AlmacenImagenes } from '../domain/ports/almacen-imagenes';
import { CatalogoEditorRepository } from '../domain/ports/catalogo-editor.repository';
import { PersonajeEditorRepository } from '../domain/ports/personaje-editor.repository';
import { AlmacenCloudinary } from './cloudinary/almacen-cloudinary';
import { CatalogoEditorFirestoreRepository } from './firebase/catalogo-editor-firestore.repository';
import { PersonajeEditorFirestoreRepository } from './firebase/personaje-editor-firestore.repository';

/** Adaptadores que solo usa la zona de administración (se cargan de forma diferida con su ruta). */
export function provideAdminInfraestructura(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: PersonajeEditorRepository, useClass: PersonajeEditorFirestoreRepository },
    { provide: CatalogoEditorRepository, useClass: CatalogoEditorFirestoreRepository },
    { provide: AlmacenImagenes, useClass: AlmacenCloudinary },
  ]);
}
