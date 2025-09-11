import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const API = 'http://localhost:5000/users';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('insta_user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    localStorage.setItem('insta_user', JSON.stringify(user));
  }, [user]);

  async function login(email, password) {
    const res = await axios.get(API, { params: { email } });
    const found = res.data.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid credentials');
    setUser(found);
    return found;
  }

  function logout() {
    setUser(null);
  }

  async function register(payload) {
    const { data: existing } = await axios.get(API, { params: { email: payload.email } });
    if (existing.length) throw new Error('Email already registered');
    const { data: created } = await axios.post(API, payload);
    setUser(created);
    return created;
  }

  return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}