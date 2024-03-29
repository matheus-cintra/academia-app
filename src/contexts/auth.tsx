import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { toast } from 'react-toastify';
import { decode } from 'jsonwebtoken';

interface AuthContextData {
  signed: boolean;
  isWaiting: boolean;
  isUpdated: boolean;
  user: Record<string, unknown> | null;

  Login(data: ILoginData, funcParam?: any): Promise<void>;

  Logout(): void;

  ReRender(): void;
}

interface ILoginData {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUserData] = useState(null);
  // const [loginError, setLoginError] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);

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
        api.defaults.headers['account-id'] = JSON.parse(storedUser)._id;
      }
    }

    setIsWaiting(false);
  }, []);

  async function Login(loginData: ILoginData, funcParam: any) {
    try {
      const response = await api.post('/auth', { ...loginData });
      api.defaults.headers.Authorization = `Bearer ${response.data['access-token']}`;
      api.defaults.headers['account-id'] = response.data.account._id;

      const resSettings = await api.get(`/settings/${response.data.account._id}`);
      funcParam && funcParam();
      toast.success('Seja Bem-Vindo');
      setUserData(response.data.account);

      localStorage.setItem('@App:user', JSON.stringify(response.data.account));
      localStorage.setItem('@App:token', response.data['access-token']);
      localStorage.setItem('@App:settings', JSON.stringify(resSettings.data));
      setIsWaiting(false);
    } catch (e) {
      setIsWaiting(false);
      funcParam(false);
      toast.error(e.response.data.message[0]);
      // setLoginError(true);
    }
  }

  function Logout() {
    setUserData(null);

    localStorage.removeItem('@App:user');
    localStorage.removeItem('@App:token');
    localStorage.removeItem('@App:settings');
  }

  function ReRender() {
    return setIsUpdated(!isUpdated);
  }

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), isWaiting, user, Login, Logout, ReRender, isUpdated }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
