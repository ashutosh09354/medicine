import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export const useWishlist = create(persist(set => ({ ids: [], toggle: id => set(s => ({ ids: s.ids.includes(id) ? s.ids.filter(x => x !== id) : [...s.ids, id] })) }), { name: 'medcare-wishlist' }))
export const useOrders = create(persist(set => ({ list: [], addOrder: o => set(s => ({ list: [o, ...s.list] })) }), { name: 'medcare-orders' }))
export const useAppts = create(persist(set => ({ list: [], addAppt: a => set(s => ({ list: [a, ...s.list] })), cancel: id => set(s => ({ list: s.list.filter(a => a.id !== id) })) }), { name: 'medcare-appts' }))
export const usePin = create(persist(set => ({ pin: '', setPin: pin => set({ pin }) }), { name: 'medcare-pin' }))
export const useRecents = create(persist(set => ({ ids: [], push: id => set(s => ({ ids: [id, ...s.ids.filter(x => x !== id)].slice(0, 8) })) }), { name: 'medcare-recent' }))
export const useRecords = create(persist(set => ({ list: [], add: r => set(s => ({ list: [{ id: Date.now(), ...r }, ...s.list] })), remove: id => set(s => ({ list: s.list.filter(r => r.id !== id) })) }), { name: 'medcare-records' }))
