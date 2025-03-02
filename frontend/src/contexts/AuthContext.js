// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  });

  useEffect(() => {
    if (authTokens) {
      localStorage.setItem('authTokens', JSON.stringify(authTokens));
    } else {
      localStorage.removeItem('authTokens');
    }
  }, [authTokens]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      setAuthTokens(response.data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const register = async (username, email, password) => {
    try {
      await axios.post('http://localhost:5000/api/users/register', { username, email, password });
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const logout = () => {
    setAuthTokens(null);
  };

  return (
    <AuthContext.Provider value={{ authTokens, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
