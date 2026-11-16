import { ApplicationConfig, Injector, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { REGLAS_EQUIPO, ValidarEquiposService } from './application/validar-equipos.service';
import { FormacionRepository } from './domain/ports/formacion.repository';
import { PersonajeRepository } from './domain/ports/personaje.repository';
import { AlineacionAsedio } from './domain/reglas/alineacion-asedio';
import { PersonajesConocidos } from './domain/reglas/personajes-conocidos';
import { CatalogoFirestore } from './infrastructure/firebase/catalogo-firestore';
import { provideInfraestructura } from './infrastructure/providers';
import { routes } from './web/app.routes';

/** Raíz de composición: une las capas web, aplicación, dominio e infraestructura. */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideInfraestructura(),
    { provide: REGLAS_EQUIPO, multi: true, useFactory: () => new PersonajesConocidos(inject(PersonajeRepository)) },
    { provide: REGLAS_EQUIPO, multi: true, useFactory: () => new AlineacionAsedio(inject(FormacionRepository)) },
    // Primero se carga el catálogo; después se valida (los servicios leen los datos al crearse).
    provideAppInitializer(async () => {
      const injector = inject(Injector);
      await injector.get(CatalogoFirestore).cargar();
      injector.get(ValidarEquiposService).ejecutar();
    }),
  ]
};
