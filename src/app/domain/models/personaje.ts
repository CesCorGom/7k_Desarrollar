export type Rol = 'Healer' | 'Debuffer' | 'Attack' | 'Mage' | 'Mago' | 'Tank';

/** Personaje o mascota. Las mascotas no tienen rol. */
export interface Personaje {
  nombre: string;
  img: string | null;
  rol: Rol | null;
}
