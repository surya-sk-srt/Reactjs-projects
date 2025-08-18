import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../components/CartItem.jsx'
import { clearCart } from '../redux/cartSlice.js'
import '../styles/Cart.css'

export default function Cart(){
  const { items } = useSelector(s => s.cart)
  const dispatch = useDispatch()

  const { subtotal, totalQty } = useMemo(() => {
    const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0)
    const totalQty = items.reduce((acc, it) => acc + it.qty, 0)
    return { subtotal, totalQty }
  }, [items])

  return (
    <section className="container cart-grid">
      <div className="card cart-list">
        {items.length === 0 ? (
          <div style={{textAlign:'center', color:'var(--muted)'}}>Your cart is empty.</div>
        ) : (
          items.map(it => <CartItem key={it.id} item={it} />)
        )}
      </div>
      <aside className="card summary">
        <h3>Order Summary</h3>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <span>Items</span><span>{totalQty}</span>
        </div>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
        </div>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <span>Shipping</span><span>$0.00</span>
        </div>
        <hr style={{borderColor:'var(--border)'}} />
        <div style={{display:'flex', justifyContent:'space-between', fontWeight:800}}>
          <span>Total</span><span>${subtotal.toFixed(2)}</span>
        </div>
        <div style={{display:'flex', gap:12, marginTop:12}}>
          <button className="btn">Checkout</button>
          <button className="btn danger" onClick={() => dispatch(clearCart())}>Clear</button>
        </div>
      </aside>
    </section>
  )
}