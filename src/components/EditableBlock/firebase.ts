// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Конфіг твого Firebase-проєкту (скопійований із Firebase Console → Project Settings → Web App)
const firebaseConfig = {
  apiKey: "AIzaSyCryh0b5BK5Mr8uFeDQLsVDqGpzqZv1_iM",
  authDomain: "editable-block-demo.firebaseapp.com",
  projectId: "editable-block-demo",
  storageBucket: "editable-block-demo.firebasestorage.app",
  messagingSenderId: "132086968404",
  appId: "1:132086968404:web:547c147d20f891e4c43dc1",
  measurementId: "G-XZPW2KGD6C",
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

