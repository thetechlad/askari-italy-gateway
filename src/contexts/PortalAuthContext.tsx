import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getPortalToken, setPortalToken, clearPortalToken, portalLogin } from "@/lib/portal";

interface PortalAuthContextValue {
  isAuthenticated: boolean;
  isChecking: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  loginWithToken: (jwt: string) => void;
  logout: () => void;
}

const PortalAuthContext = createContext<PortalAuthContextValue | undefined>(undefined);

export function PortalAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setIsAuthenticated(!!getPortalToken());
    setIsChecking(false);
  }, []);

  const login = async (identifier: string, password: string) => {
    await portalLogin(identifier, password);
    setIsAuthenticated(true);
  };

  /** Used by the verified-lead flow: the backend already issued a JWT on successful code verification, no password involved. */
  const loginWithToken = (jwt: string) => {
    setPortalToken(jwt);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearPortalToken();
    setIsAuthenticated(false);
  };

  return (
    <PortalAuthContext.Provider value={{ isAuthenticated, isChecking, login, loginWithToken, logout }}>
      {children}
    </PortalAuthContext.Provider>
  );
}

export function usePortalAuth() {
  const ctx = useContext(PortalAuthContext);
  if (!ctx) throw new Error("usePortalAuth must be used within PortalAuthProvider");
  return ctx;
}
