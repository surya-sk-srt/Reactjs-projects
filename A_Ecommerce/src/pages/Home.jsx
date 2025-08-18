import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <section className="hero container">
      <div>
        <h1>Shop smart with NeoShop</h1>
        <p>Modern, responsive e-commerce built with React, Redux, and Router. Browse featured products and add them to your cart or wishlist.</p>
        <div style={{display:'flex', gap:12}}>
          <Link className="btn" to="/products">Browse Products</Link>
          <Link className="btn secondary" to="/cart">View Cart</Link>
        </div>
      </div>
      <div className="card" style={{minHeight:220, display:'grid', placeItems:'center'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:48}}>🛍️</div>
          <div className="pill">React • Router • Redux</div>
        </div>
      </div>
    </section>
  )
}