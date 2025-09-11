import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FiSearch, FiHome, FiPlusSquare, FiCompass, FiUser } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function doLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="ig-nav">
      <div className="nav-inner container">
        <div className="left">
          <Link to="/feed" className="brand">Instagram</Link>
        </div>

        <div className="center">
          <div className="search">
            <FiSearch />
            <input placeholder="Search" />
          </div>
        </div>

        <div className="right">
          <Link to="/feed" className="icon"><FiHome /></Link>
          <Link to="/feed" className="icon"><FiPlusSquare /></Link>
          <Link to="/feed" className="icon"><FiCompass /></Link>

          {user ? (
            <>
              <Link to={`/profile/${user.id}`} className="icon"><FiUser /></Link>
              <button className="btn" onClick={doLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}