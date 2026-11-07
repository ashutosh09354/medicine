import { create } from 'zustand'
export const useToast = create(set => ({
  toasts: [],
  show: (msg, type = 'ok') => { const id = Date.now() + Math.random(); set(s => ({ toasts: [...s.toasts, { id, msg, type }] })); setTimeout(() => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })), 2800) },
}))
