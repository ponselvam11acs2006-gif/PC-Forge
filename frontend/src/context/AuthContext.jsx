import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, registerApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('pcforge_user');
      return savedUser && savedUser !== 'undefined' ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.warn("Failed to parse user from localStorage", e);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      const savedToken = localStorage.getItem('pcforge_token');
      return savedToken && savedToken !== 'undefined' ? savedToken : null;
    } catch (e) {
      return null;
    }
  });

  const isAuthenticated = !!token && !!user;

  const login = async (emailOrUsername, password) => {
    const data = await loginApi({ username: emailOrUsername, email: emailOrUsername, password });
    if (data && data.token) {
      const loggedInUser = {
        id: data.userId || data.id || 1,
        username: data.username || emailOrUsername.split('@')[0],
        email: data.email || emailOrUsername,
        role: data.role || 'CUSTOMER'
      };
      setToken(data.token);
      setUser(loggedInUser);
      localStorage.setItem('pcforge_token', data.token);
      localStorage.setItem('pcforge_user', JSON.stringify(loggedInUser));
      return loggedInUser;
    } else {
      throw new Error(data?.message || 'Invalid email or password.');
    }
  };

  const register = async (userData) => {
    const data = await registerApi(userData);
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('pcforge_token');
    localStorage.removeItem('pcforge_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      login: async () => {},
      register: async () => {},
      logout: () => {}
    };
  }
  return context;
};
