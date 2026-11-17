import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart', initialState: { items: [] },
  reducers: {
    addToCart(state, { payload }) { const item = state.items.find(p => p.id === payload.id); if (item) item.quantity += 1; else state.items.push({ ...payload, quantity: 1 }); },
    removeFromCart(state, { payload }) { state.items = state.items.filter(p => p.id !== payload); },
    increaseQuantity(state, { payload }) { const item = state.items.find(p => p.id === payload); if (item) item.quantity += 1; },
    decreaseQuantity(state, { payload }) { const item = state.items.find(p => p.id === payload); if (item && item.quantity > 1) item.quantity -= 1; },
    updateQuantity(state, { payload: { id, quantity } }) { const item = state.items.find(p => p.id === id); if (item && quantity > 0) item.quantity = quantity; }
  }
});
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, updateQuantity } = cartSlice.actions;
export const selectCartItems = state => state.cart.items;
export const selectTotalQuantity = state => state.cart.items.reduce((n, p) => n + p.quantity, 0);
export const selectCartTotal = state => state.cart.items.reduce((n, p) => n + p.price * p.quantity, 0);
export default cartSlice.reducer;
