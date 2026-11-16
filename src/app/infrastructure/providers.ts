import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { Autenticacion } from '../domain/ports/autenticacion';
import { FormacionRepository } from '../domain/ports/formacion.repository';
import { ModoRepository } from '../domain/ports/modo.repository';
import { PersonajeRepository } from '../domain/ports/personaje.repository';
import { AutenticacionDiferida } from './firebase/autenticacion-diferida';
import { FormacionFirestoreRepository } from './repositories/formacion-firestore.repository';
import { ModoFirestoreRepository } from './repositories/modo-firestore.repository';
import { PersonajeFirestoreRepository } from './repositories/personaje-firestore.repository';

/**
 * Conecta cada puerto del dominio con su adaptador. Los adaptadores Firestore leen de
 * `CatalogoFirestore`, que se carga al arrancar (ver `app.config.ts`). Para volver a los datos
 * estáticos basta con usar los adaptadores `*MemoriaRepository`.
 */
export function provideInfraestructura(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: PersonajeRepository, useClass: PersonajeFirestoreRepository },
    { provide: ModoRepository, useClass: ModoFirestoreRepository },
    { provide: FormacionRepository, useClass: FormacionFirestoreRepository },
    { provide: Autenticacion, useClass: AutenticacionDiferida },
  ]);
}
