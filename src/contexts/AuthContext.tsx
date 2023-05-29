import { FC, useState, createContext, ReactNode } from 'react';
import { IAuthContext, ITokenExpiration } from '../interfaces/generic';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  handleIsAuthenticated: () => {},
  tokenExpiration: null,
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);

  const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setTokenExpiration(null);
      return;
    }

    const { exp } = jwtDecode<ITokenExpiration>(token);
    const expiration = (exp ?? 0) * 1000;

    if (expiration > Date.now()) {
      setIsAuthenticated(true);
      setTokenExpiration(expiration);
    } else {
      localStorage.removeItem('token'), localStorage.removeItem('userId');
      setIsAuthenticated(false);
      setTokenExpiration(null);
    }
  };

  const handleIsAuthenticated = (newVal: boolean) => {
    setIsAuthenticated(newVal);
    checkTokenExpiration();
  };

  const contextValue = {
    isAuthenticated,
    handleIsAuthenticated,
    tokenExpiration,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
