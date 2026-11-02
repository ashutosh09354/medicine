import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export const useCart = create(persist((set) => ({
  items: [],
  add: (p, qty = 1) => set(s => {
    const f = s.items.find(i => i.id === p.id)
    return { items: f ? s.items.map(i => i.id === p.id ? { ...i, qty: i.qty + qty } : i) : [...s.items, { ...p, qty }] }
  }),
  setQty: (id, qty) => set(s => ({ items: qty < 1 ? s.items.filter(i => i.id !== id) : s.items.map(i => i.id === id ? { ...i, qty } : i) })),
  remove: id => set(s => ({ items: s.items.filter(i => i.id !== id) })),
  clear: () => set({ items: [] }),
}), { name: 'medcare-cart' }))
