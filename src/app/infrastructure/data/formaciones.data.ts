export interface Alineacion {
  al: string;
  adelante: string[];
  atras: string[];
  mascota: string[];
}

export interface Formacion extends Alineacion {
  alternativas?: Alineacion[];
  prioridad?: string[];
}

export const FORMACIONES: Record<string, Formacion> = {
  'Ventisca Spike': { al: '3-2', adelante: ['Feng Yan', 'Biscuit', 'Rachel'], atras: ['Sunran', 'Ryan'], mascota: ['Ventoso'] },
  'Muerte Dellions': { al: '3-2', adelante: ['Biscuit', 'Deo', 'Rachel'], atras: ['Sunran', 'Ryan'], mascota: ['Ventoso'] },
  'Inmortal Rachel': { al: '4-1', adelante: ['Lina', 'Biscuit', 'Ryan', 'Miho'], atras: ['Nezha'], mascota: ['Ventoso'] },
  'Infierno Jave': { al: '3-2', adelante: ['Sieg', 'Biscuit', 'Eileene'], atras: ['Ryan', 'Rachel'], mascota: ['Ventoso'] },
  'Guardián Rudy': { al: '4-1', adelante: ['Miho', 'Biscuit', 'Orly', 'Evan'], atras: ['Nezha'], mascota: ['Ventoso'] },
  'Llama Eileene': { al: '4-1', adelante: ['Chole', 'Lina', 'Biscuit', 'Miho'], atras: ['Nezha'], mascota: ['Ventoso'] },
  'Oscuridad Kris': { al: '4-1', adelante: ['Xiao', 'Biscuit', 'Eileene', 'Heavenia'], atras: ['Shane'], mascota: ['Ventoso'] },
  'Dios Destrucción': { al: '4-1', adelante: ['Reginleif', 'Xiao Qiao', 'Miho', 'Sunran'], atras: ['Pascal'], mascota: ['Jeo'] },
  'Teo Shadow': {
    al: '4-1', adelante: ['Kyrielle', 'Vanessa', 'Dongyoung', 'Xiao'], atras: ['Pascal'], mascota: ['Jeo'],
    alternativas: [{ al: '3-2', adelante: ['Miho', 'Orly', 'Biscuit'], atras: ['Xiao Qiao', 'Daisy'], mascota: ['Ventoso'] }],
  },
  'Kyle Shadow': {
    al: '3-2', adelante: ['Fai', 'Sunran', 'Guan Yu'], atras: ['Shane', 'Randgrid'], mascota: ['Jeo'],
    alternativas: [{ al: '4-1', adelante: ['Heavenia', 'Dellons', 'Biscuit', 'Lina'], atras: ['Bai Long'], mascota: ['Ventoso'] }],
  },
  'Yeonhee Shadow': {
    al: '4-1', adelante: ['Dongyoung', 'Vanessa', 'Orly', 'Chole'], atras: ['Ruri'], mascota: ['Jeo'],
    alternativas: [{ al: '2-3', adelante: ['Miho', 'Biscuit'], atras: ['Lina', 'Nezha', 'Sun Wukong'], mascota: ['Ventoso'] }],
  },
  'Karma Shadow': {
    al: '2-3', adelante: ['Sunran', 'Randgrid'], atras: ['Taka', 'Karl Heron', 'Feng Yan'], mascota: ['Jeo'],
    alternativas: [{ al: '4-1', adelante: ['Lu Bu', 'Guan Yu', 'Rachel', 'Biscuit'], atras: ['Ryan'], mascota: ['Ventoso'] }],
  },
  Calistra: {
    al: '3-2', adelante: ['Biscuit', 'Rachel', 'Guan Yu'], atras: ['Sunran', 'Fai'], mascota: ['Ventoso'],
    prioridad: ['2da de Biscuit', '1ra de Rachel', '1ra de Fai', '2da de Sunran', '3ra de Sunran'],
  },
  Astrea: {
    al: '4-1', adelante: ['Biscuit', 'Miho', 'Daisy', 'Espada'], atras: ['Orly'], mascota: ['Ventoso'],
    prioridad: ['2da de Biscuit', '1ra de Daisy', '2da de Espada', '2da de Daisy', '1ra de Espada', '1ra de Miho'],
  },
  Leonid: {
    al: '4-1', adelante: ['Lu Bu', 'Xiao', 'Biscuit', 'Guan Yu'], atras: ['Bai Long'], mascota: ['Ventoso'],
    prioridad: ['2da de Biscuit', '2da de Guan Yu', '1ra de Lu Bu', '2da de Taka', '1ra de Taka'],
  },
  Fuego: {
    al: '4-1', adelante: ['Heavenia', 'Lucy', 'Gelidus', 'Yui'], atras: ['Lania'], mascota: ['Ventoso'],
    prioridad: ['1ra de Gelidus', '2da de Gelidus', '3ra de Heavenia'],
  },
  Agua: {
    al: '4-1', adelante: ['Dongyoung', 'Hayeon', 'Feng Yan', 'Bai Jiao'], atras: ['Shinobu'], mascota: ['Ventoso'],
    prioridad: ['2da de Bai Jiao', '2da de shinobu', '2da de dongyoung', '3ra de hayeon'],
  },
  Tierra: {
    al: '4-1', adelante: ['Randgrid', 'Tanjiro', 'Sieg', 'Rachel'], atras: ['Fai'], mascota: ['Ventoso'],
    prioridad: ['2da Fai', '1ra de Fai', '2da de Tanjiro', '3ra de Tanjiro', '2da de Rachel'],
  },
  Luz: {
    al: '4-1', adelante: ['Xiao Qiao', 'Joker', 'Aris', 'Chole'], atras: ['Bai Jiao'], mascota: ['Ventoso'],
    prioridad: ['2ra de Bai Jiao', '2da de Chole', '2da de Bai Jiao', '2da de Xiao Qiao', '2da de Joker', '3ra de Aris'],
  },
  Oscuridad: {
    al: '4-1', adelante: ['Bi Dam', 'Freyja', 'Xiao', 'Hayeon'], atras: ['Bai Jiao'], mascota: ['Ventoso'],
    prioridad: ['1ra de Hayeon', '2da de Xiao', '1ra de Bai Jiao', '2da de Xiao', '3ra de Hayeon', '2da de Bi Dam', '2da de Freyja', '1ra de Bi Dam'],
  },
  'Red Ox': {
    al: '4-1', adelante: ['Biscuit', 'Orly', 'Karon', 'Daisy'], atras: ['Espada'], mascota: ['Ventoso'],
    prioridad: ['2da de Biscuit', '1ra de Daisy', '2da de Espada', '1ra de Espada', '2da de Daisy', '2da de Karon', '1ra de Karon'],
  },
  Letal: {
    al: '3-2', adelante: ['Biscuit', 'Sieg', 'Yui'], atras: ['Sunran', 'Shane'], mascota: ['Ventoso'],
    prioridad: ['2da de biscuit', '2da de Shane', '1ra de Sunran', '2da de Yui', '2da de Sunran', '3ra de sunran', '1ra de Sieg'],
  },
  'Come Hierros': {
    al: '3-2', adelante: ['Biscuit', 'Melia', 'Sunran'], atras: ['Xiao Qiao', 'Pascal'], mascota: ['Ventoso'],
    prioridad: ['2da de Biscuit', '2da de Xiao Qiao', '1ra de Xiao Qiao', '1ra de Pascal', '2da de Pascal'],
  },
};

/** Todas las mascotas de una formación, incluidas las de sus alternativas (sin repetir). */
export function mascotasDe(f: Formacion): string[] {
  const todas = [f, ...(f.alternativas ?? [])].flatMap((x) => x.mascota);
  return [...new Set(todas)];
}
