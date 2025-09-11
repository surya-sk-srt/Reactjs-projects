import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)
const API = 'http://localhost:5000/users'

export function AuthProvider({ children }){
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('auth_user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    localStorage.setItem('auth_user', JSON.stringify(user))
  }, [user])

  async function login(email, password){
    const { data } = await axios.get(API, { params: { email } })
    const match = data.find(u => u.email === email && u.password === password)
    if(!match) throw new Error('Invalid email or password')
    setUser(match)
    return match
  }

  function logout(){
    setUser(null)
  }

  async function register(payload){
    const { data: existing } = await axios.get(API, { params: { email: payload.email } })
    if(existing.length) throw new Error('Email already registered')
    const { data: created } = await axios.post(API, payload)
    return created
  }

  async function updateMe(updates){
    if(!user) throw new Error('Not authenticated')
    const { data } = await axios.put(`${API}/${user.id}`, { ...user, ...updates })
    setUser(data)
    return data
  }

  const value = useMemo(() => ({ user, login, logout, register, updateMe }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
  const ctx = useContext(AuthContext)
  if(!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}