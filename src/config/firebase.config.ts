import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: 'SECRET',
  authDomain: 'SECRET',
  databaseURL: 'SECRET',
  projectId: 'SECRET',
  storageBucket: 'SECRET',
  messagingSenderId: 'SECRET',
  appId: 'SECRET',
  measurementId: 'SECRET',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

