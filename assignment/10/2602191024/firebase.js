import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTUFB2ROoMjSnk0dfU-MfVHl_GO84hzqc",
  authDomain: "bootcamp-be42c.firebaseapp.com",
  projectId: "bootcamp-be42c",
  storageBucket: "bootcamp-be42c.firebasestorage.app",
  messagingSenderId: "736654783240",
  appId: "1:736654783240:web:f4df1a44b5300c365032bd",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);