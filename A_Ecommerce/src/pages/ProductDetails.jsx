import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, toggleWishlist } from '../redux/cartSlice.js'

export default function ProductDetails(){
  const { id } = useParams()
  const dispatch = useDispatch()
  const { products, wishlist } = useSelector(s => s.cart)
  const product = products.find(p => String(p.id) === String(id))

  if(!product) return <div className="container card">Product not found.</div>

  const inWishlist = wishlist.includes(product.id)

  return (
    <section className="container grid two">
      <div className="card">
        <img src={product.image} alt={product.title} style={{width:'100%', borderRadius:12}} />
      </div>
      <div className="card" style={{display:'flex', flexDirection:'column', gap:12}}>
        <h2 style={{margin:0}}>{product.title}</h2>
        <div style={{color:'var(--muted)'}}>Category: {product.category} • ★ {product.rating}</div>
        <div className="price" style={{fontSize:24}}>${product.price.toFixed(2)}</div>
        <p style={{color:'var(--muted)'}}>{product.description}</p>
        <div style={{display:'flex', gap:12}}>
          <button className="btn" onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          <button className="btn secondary" onClick={() => dispatch(toggleWishlist(product.id))}>
            {inWishlist ? '♥ Wishlisted' : '♡ Wishlist'}
          </button>
          <Link className="btn" to="/products">Back</Link>
        </div>
      </div>
    </section>
  )
}