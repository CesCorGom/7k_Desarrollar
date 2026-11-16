/**
 * Configuración de servicios externos.
 * La de Firebase no es secreta: va en el código de la web; la seguridad la ponen las reglas de Firestore.
 */
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAhyc4DcKC6h9rRS0Bfkzwy4vGAQQgLeS8',
  authDomain: 'rol-7k.firebaseapp.com',
  projectId: 'rol-7k',
  storageBucket: 'rol-7k.firebasestorage.app',
  messagingSenderId: '627079267656',
  appId: '1:627079267656:web:2e126ed43416e5e8ce9f7d',
};

export const CLOUDINARY = {
  cloudName: 'yzr1ic5r',
  uploadPreset: 'personajes',
};

/** Colecciones de Firestore. */
export const COLECCION = {
  personajes: 'personajes',
  categorias: 'categorias',
  equipos: 'equipos',
  formaciones: 'formaciones',
} as const;

/** UIDs con permiso de edición. Deben coincidir con los de `firestore.rules`. */
export const ADMIN_UIDS: readonly string[] = ['NQzuTsUzs4fYw1D7gTHfItPvxVf1'];
