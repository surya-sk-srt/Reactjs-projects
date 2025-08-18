import { useEffect, useState } from 'react'

export default function useLocalStorage(key, initial){
  const [value, setValue] = useState(() => {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : (typeof initial === 'function' ? initial() : initial)
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}