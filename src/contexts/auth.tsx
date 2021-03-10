import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { toast } from 'react-toastify';
import { decode } from 'jsonwebtoken';

interface AuthContextData {
  signed: boolean;
  user: Record<string, unknown> | null;

  Login(data: ILoginData, funcParam?: any): Promise<void>;

  Logout(): void;
}

interface ILoginData {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('@App:user');
    const storedToken = localStorage.getItem('@App:token');

    if (storedUser && storedToken) {
      const currTime = new Date().getTime() / 1000;
      const token = storedToken.split(' ');
      const decoded: any = decode(token[0]);
      const expired = decoded && currTime > decoded.exp;

      if (expired) {
        setUserData(null);
        localStorage.removeItem('@App:user');
        localStorage.removeItem('App:token');
      } else {
        setUserData(JSON.parse(storedUser));
        api.defaults.headers.Authorization = `Bearer ${storedToken}`;
      }
    }
  }, []);

  async function Login(loginData: ILoginData, funcParam: any) {
    try {
      const response = await api.post('/auth', { ...loginData });
      funcParam && funcParam();
      toast.success('Seja Bem-Vindo');
      setUserData(response.data.account);
      api.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;

      localStorage.setItem('@App:user', JSON.stringify(response.data.account));
      localStorage.setItem('@App:token', response.data.accessToken);
    } catch (e) {
      toast.error(e.response.data.message[0]);
    }
  }

  function Logout() {
    setUserData(null);

    localStorage.removeItem('@App:user');
    localStorage.removeItem('@App:token');
  }

  return <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
