import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { FIREBASE_CONFIG } from '../config';

/** Única instancia de Firebase y de Firestore (versión lite: sin tiempo real, mucho más ligera). */
export const firebaseApp = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
export const db = getFirestore(firebaseApp);
