import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../styles/Navbar.css'

export default function Navbar(){
  const cartCount = useSelector(s => s.cart.items.reduce((acc, it) => acc + it.qty, 0))
  const wishCount = useSelector(s => s.cart.wishlist.length)

  return (
    <header className="nav">
      <div className="nav__inner container">
        <Link to="/" className="brand">NeoShop</Link>
        <nav className="links">
          <NavLink to="/" className={({isActive}) => 'navlink ' + (isActive ? 'active' : '')}>Home</NavLink>
          <NavLink to="/products" className={({isActive}) => 'navlink ' + (isActive ? 'active' : '')}>Products</NavLink>
          <NavLink to="/wishlist" className={({isActive}) => 'navlink ' + (isActive ? 'active' : '')}>
            Wishlist <span className="cart-badge">{wishCount}</span>
          </NavLink>
          <NavLink to="/cart" className={({isActive}) => 'navlink ' + (isActive ? 'active' : '')}>
            Cart <span className="cart-badge">{cartCount}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}