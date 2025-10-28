import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

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
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const database = getDatabase(app);
