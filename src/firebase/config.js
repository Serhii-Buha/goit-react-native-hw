import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  signOut,
  getReactNativePersistence,
} from 'firebase/auth';
import { decode } from 'base-64';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

if (typeof atob === 'undefined') {
  global.atob = decode;
}

const firebaseConfig = {
  apiKey: 'AIzaSyC8BhRul0TT0xMVejnvr_f6CnVqHu-KlzY',
  authDomain: 'project-b9543.firebaseapp.com',
  projectId: 'project-b9543',
  storageBucket: 'project-b9543.appspot.com',
  messagingSenderId: '91503337978',
  appId: '1:91503337978:web:c0f7040adb7131314b0443',
  measurementId: 'G-31F35NPVLS',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const fireStore = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
