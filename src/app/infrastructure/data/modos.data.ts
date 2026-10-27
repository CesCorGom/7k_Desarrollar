import { Categoria, Equipo } from '../../domain/models/modo';

export const CATEGORIAS: Categoria[] = [
  { nombre: 'Expedición de los Adviento', color: '#4aa3ff', icono: '🧭', linea1: 'Expedición', linea2: 'de los Adviento' },
  { nombre: 'Incursión Avanzada', color: '#b86bff', icono: '🔮', linea1: 'Incursión', linea2: 'Avanzada' },
  { nombre: 'Asedio', color: '#ff4d5e', icono: '⚔️', linea1: 'Asedio', linea2: '' },
  { nombre: 'Power Up Honguitos', color: '#5de07a', icono: '🍄', linea1: 'Power Up', linea2: 'Honguitos' },
  { nombre: 'Incursiones', color: '#f5a623', icono: '👹', linea1: 'Incursiones', linea2: '' },
];

const eq = (categoria: string, submodo: string, miembros: string[]): Equipo => ({ categoria, submodo, miembros });

export const EQUIPOS: Equipo[] = [
  eq('Expedición de los Adviento', 'Teo Shadow', ['Pascal', 'Xiao', 'Kyrielle', 'Vanessa', 'Dongyoung', 'Miho', 'Orly', 'Biscuit', 'Xiao Qiao', 'Daisy']),
  eq('Expedición de los Adviento', 'Kyle Shadow', ['Fai', 'Shane', 'Sunran', 'Randgrid', 'Guan Yu', 'Heavenia', 'Dellons', 'Biscuit', 'Lina', 'Bai Long']),
  eq('Expedición de los Adviento', 'Yeonhee Shadow', ['Dongyoung', 'Vanessa', 'Chole', 'Ruri', 'Orly', 'Miho', 'Biscuit', 'Lina', 'Nezha', 'Sun Wukong']),
  eq('Expedición de los Adviento', 'Karma Shadow', ['Taka', 'Sunran', 'Karl Heron', 'Randgrid', 'Feng Yan', 'Lu Bu', 'Guan Yu', 'Ryan', 'Rachel', 'Biscuit']),
  eq('Expedición de los Adviento', 'Dios Destrucción', ['Pascal', 'Sunran', 'Miho', 'Xiao Qiao', 'Reginleif']),
  eq('Incursión Avanzada', 'Calistra', ['Biscuit', 'Sunran', 'Rachel', 'Fai', 'Guan Yu']),
  eq('Incursión Avanzada', 'Astrea', ['Biscuit', 'Miho', 'Espada', 'Daisy', 'Orly']),
  eq('Incursión Avanzada', 'Leonid', ['Lu Bu', 'Biscuit', 'Guan Yu', 'Xiao', 'Bai Long']),
  eq('Asedio', 'Ventisca Spike', ['Sunran', 'Feng Yan', 'Biscuit', 'Rachel', 'Ryan']),
  eq('Asedio', 'Muerte Dellions', ['Rachel', 'Biscuit', 'Sunran', 'Deo', 'Ryan']),
  eq('Asedio', 'Inmortal Rachel', ['Lina', 'Biscuit', 'Nezha', 'Ryan', 'Miho']),
  eq('Asedio', 'Infierno Jave', ['Rachel', 'Ryan', 'Biscuit', 'Sieg', 'Eileene']),
  eq('Asedio', 'Guardián Rudy', ['Miho', 'Biscuit', 'Nezha', 'Evan', 'Orly']),
  eq('Asedio', 'Llama Eileene', ['Miho', 'Nezha', 'Lina', 'Biscuit', 'Chole']),
  eq('Asedio', 'Oscuridad Kris', ['Heavenia', 'Eileene', 'Biscuit', 'Xiao', 'Shane']),
  eq('Power Up Honguitos', 'Fuego', ['Lucy', 'Heavenia', 'Gelidus', 'Yui', 'Lania']),
  eq('Power Up Honguitos', 'Agua', ['Hayeon', 'Dongyoung', 'Feng Yan', 'Shinobu', 'Bai Jiao']),
  eq('Power Up Honguitos', 'Tierra', ['Rachel', 'Tanjiro', 'Sunran', 'Sieg', 'Fai']),
  eq('Power Up Honguitos', 'Luz', ['Joker', 'Bai Jiao', 'Chole', 'Ling Ling', 'Aris']),
  eq('Power Up Honguitos', 'Oscuridad', ['Bai Jiao', 'Xiao', 'Bi Dam', 'Freyja', 'Hayeon']),
  eq('Incursiones', 'Letal', ['Biscuit', 'Sunran', 'Shane', 'Yui', 'Sieg']),
  eq('Incursiones', 'Red Ox', ['Biscuit', 'Espada', 'Karon', 'Daisy', 'Orly']),
  eq('Incursiones', 'Come Hierros', ['Biscuit', 'Sunran', 'Pascal', 'Melia', 'Xiao Qiao']),
];
