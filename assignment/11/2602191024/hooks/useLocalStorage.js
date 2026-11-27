
"use client";

import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  // Load saved preference when the component mounts
  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(key);

      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error("Failed to read localStorage:", error);
    }
  }, [key]);

  // Save preference whenever it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}
