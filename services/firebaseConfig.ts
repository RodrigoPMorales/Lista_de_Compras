import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const{getReactNativePersistence} = require("firebase/auth") as any

const firebaseConfig = { 
  apiKey: "AIzaSyASDmOTmQeB8doy6uqCvGaG3jhqtgwA35Q",
  authDomain: "lista-compras-checkpoint.firebaseapp.com",
  projectId: "lista-compras-checkpoint",
  storageBucket: "lista-compras-checkpoint.firebasestorage.app",
  messagingSenderId: "213190547693",
  appId: "1:213190547693:web:e1e42b2e9ddd9cc78914e4",
};

// inicializa o app
const app = initializeApp(firebaseConfig);

// inicializa o Auth com AsyncStorage
export const auth = initializeAuth(app,{
  persistence:getReactNativePersistence(AsyncStorage)
});

// Firestore
export const db = getFirestore(app);