
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "./firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setAuthError(null);

      if (!firebaseUser) {
        setUser(null);
        setRole(null);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);

      try {
        const userDoc = await getDoc(
          doc(db, "users", firebaseUser.uid)
        );

        console.log("Firebase UID:", firebaseUser.uid);
        console.log("Firestore document exists:", userDoc.exists());

        if (userDoc.exists()) {
          console.log("Firestore user data:", userDoc.data());
          setRole(userDoc.data().role);
        } else {
          setRole(null);
          setAuthError("User document not found in Firestore.");
        }
      } catch (error) {
        console.error("Firestore role fetch failed:", error);
        setRole(null);
        setAuthError(error.message);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
