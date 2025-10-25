"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_STORAGE_KEY = "ems-auth-token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedToken = window.localStorage.getItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(Boolean(storedToken));
    setIsLoading(false);
  }, []);

  const login = (token = crypto.randomUUID()) => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ isAuthenticated, isLoading, login, logout }),
    [isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
