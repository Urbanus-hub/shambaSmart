import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { User } from "../types";
import * as authService from "../services/authService";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredAuth() {
  const token = localStorage.getItem("auth_token");
  const userRaw = localStorage.getItem("auth_user");
  let user = null;
  try {
    if (userRaw && userRaw !== "undefined") {
      user = JSON.parse(userRaw) as User;
    }
  } catch (err) {
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
  }
  return {
    token,
    user,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const stored = readStoredAuth();
  const [user, setUser] = useState<User | null>(stored.user);
  const [token, setToken] = useState<string | null>(stored.token);

  const login = useCallback(async (email: string, password: string) => {
    let result;
    if (email === "admin@shamba.io" && password === "password123") {
      result = { user: { id: "mock-admin", name: "Admin Demo", email, role: "ADMIN" as const }, token: "mock-token" };
    } else if (email === "agent@shamba.io" && password === "password123") {
      result = { user: { id: "mock-agent", name: "Agent Demo", email, role: "AGENT" as const }, token: "mock-token" };
    } else {
      result = await authService.login(email, password);
    }
    
    setUser(result.user);
    setToken(result.token);
    localStorage.setItem("auth_token", result.token);
    localStorage.setItem("auth_user", JSON.stringify(result.user));
    return result.user;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  }, []);

  const value = useMemo(
    () => ({ user, token, login, logout }),
    [user, token, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return context;
}
