import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../AuthContext.jsx'

export default function Navbar(){
  const { user, logout } = useAuth()
  return (
    <header className="nav">
      <div className="nav__inner container">
        <Link to="/" className="brand">UserBoard</Link>
        <nav className="links">
          {!user && (<>
            <NavLink to="/login" className="navlink">Login</NavLink>
            <NavLink to="/register" className="navlink">Register</NavLink>
          </>)}
          {user && (<>
            <NavLink to="/profile" className="navlink">Profile</NavLink>
            {user.role === 'Admin' && (
              <NavLink to="/dashboard" className="navlink">Dashboard</NavLink>
            )}
            <button className="btn danger" onClick={logout}>Logout</button>
          </>)}
        </nav>
      </div>
    </header>
  )
}