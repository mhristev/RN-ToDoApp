// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWmzdGnxay12EkQzdRkyfWbbCxFxmgEQM",
  authDomain: "kmp-todo-be97b.firebaseapp.com",
  projectId: "kmp-todo-be97b",
  storageBucket: "kmp-todo-be97b.appspot.com",
  messagingSenderId: "188490273709",
  appId: "1:188490273709:web:ff5db050292222b2150724",
  measurementId: "G-T06M2RBM5D"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const FIREBASE_DB = getFirestore(FIREBASE_APP);
