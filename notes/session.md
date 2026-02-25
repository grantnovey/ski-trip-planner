# Session Storage for Prototype Data Persistence

## Recommendation

Use **sessionStorage** to persist data in the browser without a database. This approach is ideal for prototypes and maintains state for the current browsing session.

## Behavior

| Event | sessionStorage | localStorage | useState only |
|-------|----------------|--------------|---------------|
| Page refresh | ✅ Persists | ✅ Persists | ❌ Lost |
| Navigate within app | ✅ Persists | ✅ Persists | ✅ Persists |
| Close tab/window | ❌ Cleared | ✅ Persists | ❌ Lost |
| Close browser | ❌ Cleared | ✅ Persists | ❌ Lost |

**sessionStorage** is scoped to the tab — each tab has its own storage. Data does not persist after the tab is closed.

## Implementation

### usePersistedState Hook

A custom hook that syncs React state with sessionStorage:

```typescript
// src/hooks/usePersistedState.ts
"use client";

import { useState, useEffect } from "react";

export function usePersistedState<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
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
```

### Usage

Replace `useState` with `usePersistedState`:

```typescript
// Before
const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);

// After
const [trips, setTrips] = usePersistedState<Trip[]>("trips", MOCK_TRIPS);
```

The API is identical — the state is automatically saved to sessionStorage on every change and restored on mount.

## Direct sessionStorage API

For one-off reads or writes without a hook:

```javascript
// Save
sessionStorage.setItem("trips", JSON.stringify(trips));

// Load
const stored = sessionStorage.getItem("trips");
const trips = stored ? JSON.parse(stored) : [];

// Clear
sessionStorage.removeItem("trips");
```

## Considerations

- **SSR**: The hook guards against `window` being undefined (Next.js server render).
- **JSON serialization**: Only JSON-serializable values are supported (no functions, dates, etc.).
- **Storage limit**: sessionStorage is typically ~5–10MB per origin.
- **Same-origin**: Data is isolated by origin (protocol + domain + port).

## When to use localStorage instead

Use **localStorage** if you need data to persist across browser sessions (e.g., user preferences, "remember me" data). The API is the same — just swap `sessionStorage` for `localStorage` in the hook.
