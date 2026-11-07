import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, Firestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let dbInstance: Firestore;
try {
  if (firebaseConfig.firestoreDatabaseId) {
    dbInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  } else {
    dbInstance = getFirestore(app);
  }
} catch (err) {
  console.warn('Named Firestore instance init fallback:', err);
  dbInstance = getFirestore(app);
}

export const db = dbInstance;
export const auth = getAuth(app);

// Test Firestore connection on app startup
export async function testFirestoreConnection() {
  try {
    if (db) {
      await getDocFromServer(doc(db, 'test', 'connection'));
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('offline')) {
      console.warn('Firestore offline or connecting...');
    }
  }
}

testFirestoreConnection();
