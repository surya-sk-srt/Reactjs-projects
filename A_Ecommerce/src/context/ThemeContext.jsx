import { createContext, useContext, useState, useMemo } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }){
  const [theme, setTheme] = useState('dark')
  const value = useMemo(() => ({ theme, setTheme }), [theme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(){
  const ctx = useContext(ThemeContext)
  if(!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}