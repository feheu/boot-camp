import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTUFB2ROoMjSnk0dfU-MfVHl_GO84hzqc",
  authDomain: "bootcamp-be42c.firebaseapp.com",
  projectId: "bootcamp-be42c",
  storageBucket: "bootcamp-be42c.firebasestorage.app",
  messagingSenderId: "736654783240",
  appId: "1:736654783240:web:f4df1a44b5300c365032bd",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
