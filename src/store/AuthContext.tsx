import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "auth";

type AuthUser = {
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { email?: string };
    if (typeof parsed.email !== "string" || !parsed.email.trim()) return null;
    return { email: parsed.email.trim() };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());

  const login = useCallback((email: string) => {
    const nextUser = { email: email.trim() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [user, login, logout],
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
