import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { toast } from 'react-toastify';
import { decode } from 'jsonwebtoken';

interface AuthContextData {
  signed: boolean;
  user: Record<string, unknown> | null;

  Login(data: ILoginData): Promise<void>;
}

interface ILoginData {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('@App:user');
    const storedToken = localStorage.getItem('@App:token');

    if (storedUser && storedToken) {
      const currTime = new Date().getTime() / 1000;
      const token = storedToken.split(' ');
      const decoded: any = decode(token[0]);
      const expired = decoded && currTime > decoded.exp;

      if (expired) {
        setUser(null);
        sessionStorage.removeItem('@App:user');
        sessionStorage.removeItem('App:token');
      } else {
        setUser(JSON.parse(storedUser));
        api.defaults.headers.Authorization = `Bearer ${storedToken}`;
      }
    }
  }, []);

  async function Login(loginData: ILoginData) {
    try {
      const response = await api.post('/auth', { ...loginData });
      toast.success('Seja Bem-Vindo');
      setUser(response.data.account);
      api.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;

      localStorage.setItem('@App:user', JSON.stringify(response.data.account));
      localStorage.setItem('@App:token', response.data.accessToken);
    } catch (e) {
      toast.error(e.response.data.message[0]);
    }
  }

  return <AuthContext.Provider value={{ signed: Boolean(user), user, Login }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
