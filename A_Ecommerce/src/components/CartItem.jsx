import '../styles/Cart.css'
import { useDispatch } from 'react-redux'
import { incQty, decQty, removeFromCart } from '../redux/cartSlice.js'

export default function CartItem({ item }){
  const dispatch = useDispatch()
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      <div>
        <div style={{fontWeight:700}}>{item.title}</div>
        <div style={{color:'var(--muted)'}}>${item.price.toFixed(2)}</div>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <div className="qty">
          <button className="btn" onClick={() => dispatch(decQty(item.id))}>-</button>
          <span>{item.qty}</span>
          <button className="btn" onClick={() => dispatch(incQty(item.id))}>+</button>
        </div>
        <button className="btn danger" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
      </div>
    </div>
  )
}