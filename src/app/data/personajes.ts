export type Rol = 'Healer' | 'Debuffer' | 'Attack' | 'Mage' | 'Mago' | 'Tank';

export interface Personaje {
  nombre: string;
  img: string | null;
  rol: Rol | null;
}

export const PERSONAJES: Personaje[] = [
  { nombre: 'Aris', img: 'images/aris.png', rol: 'Debuffer' },
  { nombre: 'Bai Jiao', img: 'images/baijiao.png', rol: 'Debuffer' },
  { nombre: 'Bai Long', img: 'images/bailong.png', rol: 'Attack' },
  { nombre: 'Bi Dam', img: 'images/bidam.png', rol: 'Attack' },
  { nombre: 'Biscuit', img: 'images/biscuit.png', rol: 'Healer' },
  { nombre: 'Chole', img: 'images/chole.png', rol: 'Healer' },
  { nombre: 'Daisy', img: 'images/daisy.png', rol: 'Mage' },
  { nombre: 'Dellons', img: 'images/Dellons.png', rol: 'Attack' },
  { nombre: 'Deo', img: 'images/deo.png', rol: 'Attack' },
  { nombre: 'Dongyoung', img: 'images/dongyoung.png', rol: 'Mage' },
  { nombre: 'Eileene', img: 'images/eileene.png', rol: 'Debuffer' },
  { nombre: 'Espada', img: 'images/espada.png', rol: 'Mage' },
  { nombre: 'Evan', img: 'images/evan.png', rol: 'Tank' },
  { nombre: 'Fai', img: 'images/fai.png', rol: 'Attack' },
  { nombre: 'Feng Yan', img: 'images/fengyan.png', rol: 'Attack' },
  { nombre: 'Freyja', img: 'images/freyja.png', rol: 'Mage' },
  { nombre: 'Gelidus', img: 'images/gelidus.png', rol: 'Debuffer' },
  { nombre: 'Guan Yu', img: 'images/guanyu.png', rol: 'Debuffer' },
  { nombre: 'Hayeon', img: 'images/hayeon.png', rol: 'Healer' },
  { nombre: 'Heavenia', img: 'images/heavenia.png', rol: 'Attack' },
  { nombre: 'Joker', img: 'images/joker.png', rol: 'Mage' },
  { nombre: 'Karl Heron', img: 'images/karlheron.png', rol: 'Attack' },
  { nombre: 'Karon', img: 'images/karon.png', rol: 'Healer' },
  { nombre: 'Kyrielle', img: 'images/kyrielle.png', rol: 'Mage' },
  { nombre: 'Lania', img: 'images/lania.png', rol: 'Debuffer' },
  { nombre: 'Lina', img: 'images/lina.png', rol: 'Healer' },
  { nombre: 'Ling Ling', img: 'images/lingling.png', rol: 'Mage' },
  { nombre: 'Lu Bu', img: 'images/lubu.png', rol: 'Attack' },
  { nombre: 'Lucy', img: 'images/lucy.png', rol: 'Healer' },
  { nombre: 'Melia', img: 'images/melia.png', rol: 'Mage' },
  { nombre: 'Miho', img: 'images/miho.png', rol: 'Mage' },
  { nombre: 'Nezha', img: 'images/nezha.png', rol: 'Mage' },
  { nombre: 'Orly', img: 'images/orly.png', rol: 'Healer' },
  { nombre: 'Pascal', img: 'images/pascal.png', rol: 'Mage' },
  { nombre: 'Rachel', img: 'images/rachel.png', rol: 'Debuffer' },
  { nombre: 'Randgrid', img: 'images/randgrid.png', rol: 'Attack' },
  { nombre: 'Reginleif', img: 'images/reginleif.png', rol: 'Mage' },
  { nombre: 'Ruri', img: 'images/ruri.png', rol: 'Mage' },
  { nombre: 'Ryan', img: 'images/ryan.png', rol: 'Attack' },
  { nombre: 'Shane', img: 'images/shane.png', rol: 'Attack' },
  { nombre: 'Shinobu', img: 'images/shinobu.png', rol: 'Mage' },
  { nombre: 'Sieg', img: 'images/sieg.png', rol: 'Debuffer' },
  { nombre: 'Sun Wukong', img: 'images/sunwukong.png', rol: 'Debuffer' },
  { nombre: 'Sunran', img: 'images/sunran.png', rol: 'Attack' },
  { nombre: 'Taka', img: 'images/taka.png', rol: 'Attack' },
  { nombre: 'Tanjiro', img: 'images/tanjiro.png', rol: 'Attack' },
  { nombre: 'Vanessa', img: 'images/vanessa.png', rol: 'Mage' },
  { nombre: 'Xiao', img: 'images/xiao.png', rol: 'Attack' },
  { nombre: 'Xiao Qiao', img: 'images/xiaoqiao.png', rol: 'Mage' },
  { nombre: 'Yui', img: 'images/yui.png', rol: 'Healer' },
];

export const MASCOTAS: Personaje[] = [
  { nombre: 'Ventoso', img: 'images/ventoso.png', rol: null },
  { nombre: 'Jeo', img: 'images/Jeo.png', rol: null },
];

export const PJ: Record<string, Personaje> = Object.fromEntries(
  [...PERSONAJES, ...MASCOTAS].map((p) => [p.nombre, p]),
);

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
  Attack: '⚔️',
  Mage: 'images/baculo.svg',
  Mago: 'images/baculo.svg',
  Tank: '🛡️',
};
