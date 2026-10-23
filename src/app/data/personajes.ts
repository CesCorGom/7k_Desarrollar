export type Rol = 'Healer' | 'Debuffer' | 'Attack' | 'Mage' | 'Mago' | 'Tank';

export interface Personaje {
  nombre: string;
  img: string | null;
  rol: Rol | null;
}

export const PERSONAJES: Personaje[] = [
  { nombre: 'Aris', img: 'images/aris.png', rol: 'Debuffer' },
  { nombre: 'Bai Jiao', img: 'images/baijiao.png', rol: 'Debuffer' },
  { nombre: 'Bai Long', img: 'images/bailong.png', rol: null },
  { nombre: 'Bi Dam', img: 'images/bidam.png', rol: 'Attack' },
  { nombre: 'Biscuit', img: 'images/biscuit.png', rol: null },
  { nombre: 'Chole', img: 'images/chole.png', rol: null },
  { nombre: 'Daisy', img: 'images/daisy.png', rol: null },
  { nombre: 'Dellons', img: 'images/Dellons.png', rol: null },
  { nombre: 'Deo', img: 'images/deo.png', rol: null },
  { nombre: 'Dongyoung', img: 'images/dongyoung.png', rol: null },
  { nombre: 'Eileene', img: 'images/eileene.png', rol: null },
  { nombre: 'Espada', img: 'images/espada.png', rol: null },
  { nombre: 'Evan', img: 'images/evan.png', rol: 'Tank' },
  { nombre: 'Fai', img: 'images/fai.png', rol: null },
  { nombre: 'Feng Yan', img: 'images/fengyan.png', rol: null },
  { nombre: 'Freyja', img: 'images/freyja.png', rol: null },
  { nombre: 'Gelidus', img: 'images/gelidus.png', rol: null },
  { nombre: 'Guan Yu', img: 'images/guanyu.png', rol: null },
  { nombre: 'Hayeon', img: 'images/hayeon.png', rol: null },
  { nombre: 'Heavenia', img: 'images/heavenia.png', rol: null },
  { nombre: 'Joker', img: 'images/joker.png', rol: null },
  { nombre: 'Karl Heron', img: 'images/karlheron.png', rol: null },
  { nombre: 'Karon', img: 'images/karon.png', rol: null },
  { nombre: 'Kyrielle', img: 'images/kyrielle.png', rol: null },
  { nombre: 'Lania', img: 'images/lania.png', rol: null },
  { nombre: 'Lina', img: 'images/lina.png', rol: 'Healer' },
  { nombre: 'Ling Ling', img: 'images/lingling.png', rol: 'Mage' },
  { nombre: 'Lu Bu', img: 'images/lubu.png', rol: 'Attack' },
  { nombre: 'Lucy', img: 'images/lucy.png', rol: null },
  { nombre: 'Melia', img: 'images/melia.png', rol: null },
  { nombre: 'Miho', img: 'images/miho.png', rol: null },
  { nombre: 'Nezha', img: 'images/nezha.png', rol: null },
  { nombre: 'Orly', img: 'images/orly.png', rol: null },
  { nombre: 'Pascal', img: 'images/pascal.png', rol: null },
  { nombre: 'Rachel', img: 'images/rachel.png', rol: null },
  { nombre: 'Randgrid', img: 'images/randgrid.png', rol: null },
  { nombre: 'Reginleif', img: 'images/reginleif.png', rol: null },
  { nombre: 'Ruri', img: 'images/ruri.png', rol: null },
  { nombre: 'Ryan', img: 'images/ryan.png', rol: null },
  { nombre: 'Shane', img: 'images/shane.png', rol: null },
  { nombre: 'Shinobu', img: 'images/shinobu.png', rol: null },
  { nombre: 'Sieg', img: 'images/sieg.png', rol: null },
  { nombre: 'Sun Wukong', img: 'images/sunwukong.png', rol: null },
  { nombre: 'Sunran', img: 'images/sunran.png', rol: null },
  { nombre: 'Taka', img: 'images/taka.png', rol: null },
  { nombre: 'Tanjiro', img: 'images/tanjiro.png', rol: null },
  { nombre: 'Vanessa', img: 'images/vanessa.png', rol: null },
  { nombre: 'Xiao', img: 'images/xiao.png', rol: null },
  { nombre: 'Xiao Qiao', img: 'images/xiaoqiao.png', rol: null },
  { nombre: 'Yui', img: 'images/yui.png', rol: null },
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
