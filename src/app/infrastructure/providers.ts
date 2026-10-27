import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { FormacionRepository } from '../domain/ports/formacion.repository';
import { ModoRepository } from '../domain/ports/modo.repository';
import { PersonajeRepository } from '../domain/ports/personaje.repository';
import { FormacionMemoriaRepository } from './repositories/formacion-memoria.repository';
import { ModoMemoriaRepository } from './repositories/modo-memoria.repository';
import { PersonajeMemoriaRepository } from './repositories/personaje-memoria.repository';

/** Conecta cada puerto del dominio con su adaptador. Para cambiar de fuente (p. ej. HTTP) basta con otro adaptador aquí. */
export function provideInfraestructura(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: PersonajeRepository, useClass: PersonajeMemoriaRepository },
    { provide: ModoRepository, useClass: ModoMemoriaRepository },
    { provide: FormacionRepository, useClass: FormacionMemoriaRepository },
  ]);
}
