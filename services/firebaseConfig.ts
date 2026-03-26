import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const{getReactNativePersistence} = require("firebase/auth") as any

const firebaseConfig = { 
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// inicializa o app
const app = initializeApp(firebaseConfig);

// inicializa o Auth com AsyncStorage
export const auth = initializeAuth(app,{
  persistence:getReactNativePersistence(AsyncStorage)
});

// Firestore
export const db = getFirestore(app);