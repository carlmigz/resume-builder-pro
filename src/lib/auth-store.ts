import { useEffect, useState } from "react";

export type User = {
  name: string;
  email: string;
  title?: string;
  avatar?: string;
};

const KEY = "resumely.user";
const listeners = new Set<() => void>();

function read(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function write(user: User | null) {
  if (typeof window === "undefined") return;
  if (user) window.localStorage.setItem(KEY, JSON.stringify(user));
  else window.localStorage.removeItem(KEY);
  listeners.forEach((l) => l());
}

export const auth = {
  get: read,
  signIn: (user: User) => write(user),
  signOut: () => write(null),
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => read());
  useEffect(() => {
    const l = () => setUser(read());
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return user;
}
