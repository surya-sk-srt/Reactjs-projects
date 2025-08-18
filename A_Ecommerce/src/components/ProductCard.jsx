import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, toggleWishlist } from '../redux/cartSlice.js'
import '../styles/ProductCard.css'

export default function ProductCard({ product }){
  const dispatch = useDispatch()
  const inWishlist = useSelector(s => s.cart.wishlist.includes(product.id))

  return (
    <div className="product-card card">
      <img src={product.image} alt={product.title} />
      <div className="product-body">
        <div className="product-title">{product.title}</div>
        <div className="rating">★ {product.rating} • {product.category}</div>
        <div className="price">${product.price.toFixed(2)}</div>
        <div className="product-actions">
          <button className="btn" onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          <button className="btn secondary" onClick={() => dispatch(toggleWishlist(product.id))}>
            {inWishlist ? '♥ Wishlisted' : '♡ Wishlist'}
          </button>
          <Link className="btn" to={`/products/${product.id}`}>Details</Link>
        </div>
      </div>
    </div>
  )
}