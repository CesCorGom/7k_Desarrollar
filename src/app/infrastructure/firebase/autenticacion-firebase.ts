import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  browserLocalPersistence,
  browserPopupRedirectResolver,
  getAuth,
  getRedirectResult,
  indexedDBLocalPersistence,
  initializeAuth,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { Usuario } from '../../domain/models/usuario';
import { Autenticacion } from '../../domain/ports/autenticacion';
import { ADMIN_UIDS } from '../config';
import { firebaseApp } from './firebase';

/**
 * Sesión persistente: se guarda en IndexedDB (o localStorage si no hay) y Firebase renueva el
 * token solo, así que la sesión no caduca hasta pulsar «Salir».
 */
function crearAuth(): Auth {
  try {
    return initializeAuth(firebaseApp, {
      persistence: [indexedDBLocalPersistence, browserLocalPersistence],
      popupRedirectResolver: browserPopupRedirectResolver,
    });
  } catch {
    return getAuth(firebaseApp); // Ya inicializado (p. ej. recarga en caliente).
  }
}

const auth = crearAuth();
// Completa el login si se hizo por redirección (móviles que bloquean la ventana emergente).
getRedirectResult(auth).catch((e) => console.warn('Login por redirección fallido', e));

/** Inicio de sesión con Google mediante Firebase Auth. */
@Injectable()
export class AutenticacionFirebase extends Autenticacion {
  observar(cambio: (usuario: Usuario | null) => void): () => void {
    return onAuthStateChanged(auth, (u) =>
      cambio(u ? { uid: u.uid, nombre: u.displayName, email: u.email, foto: u.photoURL, admin: ADMIN_UIDS.includes(u.uid) } : null),
    );
  }

  async entrar(): Promise<void> {
    const proveedor = new GoogleAuthProvider();
    proveedor.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, proveedor);
    } catch (e) {
      const codigo = (e as { code?: string })?.code ?? '';
      if (codigo.includes('popup-blocked') || codigo.includes('operation-not-supported')) {
        await signInWithRedirect(auth, proveedor);
        return;
      }
      throw e;
    }
  }

  async salir(): Promise<void> {
    await signOut(auth);
  }
}
