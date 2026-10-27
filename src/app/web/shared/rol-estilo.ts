import { Rol } from '../../domain/models/personaje';

export const ROL_COLOR: Record<Rol, string> = {
  Healer: '#f5d142',
  Debuffer: '#b86bff',
  Attack: '#ff4d5e',
  Mage: '#4aa3ff',
  Mago: '#4aa3ff',
  Tank: '#a0693b',
};

export const ROL_ICONO: Record<Rol, string> = {
  Healer: '✚',
  Debuffer: 'images/estrella.svg',
  Attack: 'images/espadas.svg',
  Mage: 'images/varita.svg',
  Mago: 'images/varita.svg',
  Tank: 'images/escudo.svg',
};
