import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext.jsx'

export default function ProtectedRoute({ children }){
  const { user } = useAuth()
  const location = useLocation()
  if(!user) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}