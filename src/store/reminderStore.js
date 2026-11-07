import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export const useReminders = create(persist(set => ({
  list: [],
  add: r => set(s => ({ list: [...s.list, { id: Date.now(), done: false, ...r }] })),
  toggle: id => set(s => ({ list: s.list.map(r => r.id === id ? { ...r, done: !r.done } : r) })),
  remove: id => set(s => ({ list: s.list.filter(r => r.id !== id) })),
}), { name: 'medcare-reminders' }))
