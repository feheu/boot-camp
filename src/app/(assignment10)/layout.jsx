
"use client";

import { AuthProvider } from "../../../assignment/10/2602191024/AuthContext";
import "../../../assignment/10/2602191024/auth.css";

export default function Assignment10Layout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
