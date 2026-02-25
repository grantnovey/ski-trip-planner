"use client";

import { useState, useEffect } from "react";

/**
 * Persists state to sessionStorage. Data survives page refreshes
 * but is cleared when the browser tab/window is closed.
 */
export function usePersistedState<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const stored = sessionStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Ignore quota/parse errors
    }
  }, [key, state]);

  return [state, setState];
}
