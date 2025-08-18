import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard.jsx'

export default function Products(){
  const { products } = useSelector(s => s.cart)
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')
  const [sort, setSort] = useState('popular')

  const categories = useMemo(() => ['all', ...new Set(products.map(p => p.category))], [products])

  const filtered = useMemo(() => {
    let list = products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
    if(cat !== 'all') list = list.filter(p => p.category === cat)
    switch (sort){
      case 'price-asc': list = [...list].sort((a,b)=>a.price-b.price); break;
      case 'price-desc': list = [...list].sort((a,b)=>b.price-a.price); break;
      case 'rating': list = [...list].sort((a,b)=>b.rating-a.rating); break;
      default: break;
    }
    return list
  }, [products, query, cat, sort])

  useEffect(()=>{ window.scrollTo(0,0) }, [])

  return (
    <section className="container">
      <div className="card" style={{marginBottom:16}}>
        <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:12}}>
          <input className="input" placeholder="Search products..." value={query} onChange={e=>setQuery(e.target.value)} />
          <select className="input" value={cat} onChange={e=>setCat(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="input" value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="popular">Popular</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="grid four">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}