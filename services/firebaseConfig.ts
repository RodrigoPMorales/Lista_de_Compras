// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASDmOTmQeB8doy6uqCvGaG3jhqtgwA35Q",
  authDomain: "lista-compras-checkpoint.firebaseapp.com",
  projectId: "lista-compras-checkpoint",
  storageBucket: "lista-compras-checkpoint.firebasestorage.app",
  messagingSenderId: "213190547693",
  appId: "1:213190547693:web:e1e42b2e9ddd9cc78914e4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);