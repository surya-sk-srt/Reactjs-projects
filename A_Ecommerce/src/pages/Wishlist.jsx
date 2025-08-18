import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard.jsx'

export default function Wishlist(){
  const { wishlist, products } = useSelector(s => s.cart)
  const items = products.filter(p => wishlist.includes(p.id))

  return (
    <section className="container">
      <h2>My Wishlist</h2>
      {items.length === 0 ? (
        <div className="card" style={{color:'var(--muted)'}}>No items in wishlist.</div>
      ) : (
        <div className="grid four">
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  )
}