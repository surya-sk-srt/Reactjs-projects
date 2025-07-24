import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../cart/cartSlice';

function ProductList() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p.id} className="card">
          <h3>{p.title}</h3>
          <p>₹{p.price}</p>
          <button onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
export default ProductList;
