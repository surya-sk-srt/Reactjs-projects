import { createSlice } from '@reduxjs/toolkit'
import products from '../productsData.js'

const initialState = {
  items: [],        // {id, title, price, image, qty}
  wishlist: [],     // [ids]
  products         // loaded from mock data (simulate API)
}

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const p = action.payload
      const existing = state.items.find(i => i.id === p.id)
      if(existing) existing.qty += 1
      else state.items.push({ id: p.id, title: p.title, price: p.price, image: p.image, qty: 1 })
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    incQty: (state, action) => {
      const it = state.items.find(i => i.id === action.payload)
      if(it) it.qty += 1
    },
    decQty: (state, action) => {
      const it = state.items.find(i => i.id === action.payload)
      if(it && it.qty > 1) it.qty -= 1
    },
    clearCart: (state) => { state.items = [] },
    toggleWishlist: (state, action) => {
      const id = action.payload
      if(state.wishlist.includes(id)) state.wishlist = state.wishlist.filter(x => x !== id)
      else state.wishlist.push(id)
    }
  }
})

export const { addToCart, removeFromCart, incQty, decQty, clearCart, toggleWishlist } = slice.actions
export default slice.reducer