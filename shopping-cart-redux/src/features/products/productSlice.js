import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, title: 'Phone', price: 699 },
  { id: 2, title: 'Laptop', price: 1499 },
  { id: 3, title: 'Headphones', price: 199 }
];

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productSlice.reducer;
