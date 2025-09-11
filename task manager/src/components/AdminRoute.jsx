import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext.jsx'

export default function AdminRoute({ children }){
  const { user } = useAuth()
  const location = useLocation()
  if(!user) return <Navigate to="/login" state={{ from: location }} replace />
  if(user.role !== 'Admin') return <Navigate to="/profile" replace />
  return children
}