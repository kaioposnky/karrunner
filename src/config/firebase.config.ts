import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, inMemoryPersistence } from 'firebase/auth';
import { initializeAuth } from 'firebase/auth/web-extension';
import { getDatabase } from 'firebase/database';
import { Platform } from 'react-native';

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
  persistence: Platform.OS === 'web' ? inMemoryPersistence : getReactNativePersistence(AsyncStorage)
});
export const database = getDatabase(app);
