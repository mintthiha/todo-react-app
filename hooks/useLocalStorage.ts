import { useState, useEffect } from "react";

// Uses localStorage key with a value (Can be a string, object, etc.)
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    // Avoids Server Side Rendering to access this
    if (typeof window === "undefined") return initialValue;
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error reading from the local storage:", error);
      return initialValue;
    }
  });

  // Saves key value pair whenever the key or the value changes.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to the local Storage:", error);
    }
  }, [key, value]);

  //Return Tuple
  return [value, setValue] as const;
}