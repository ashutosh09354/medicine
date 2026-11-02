import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useCart } from '../store/cartStore'
export default function Checkout() {
  const { items, clear } = useCart(), [f, setF] = useState({ name: '', phone: '', address: '', pin: '' }), [pay, setPay] = useState('cod'), [err, setErr] = useState({}), [oid, setOid] = useState('')
  const sub = items.reduce((a, i) => a + i.price * i.qty, 0), ship = sub && sub < 500 ? 40 : 0
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = e => { e.preventDefault(); const er = {}
    if (f.name.trim().length < 2) er.name = 'Enter your name'
    if (!/^[6-9]\d{9}$/.test(f.phone)) er.phone = 'Enter a valid 10-digit mobile number'
    if (f.address.trim().length < 8) er.address = 'Enter your full address'
    if (!/^\d{6}$/.test(f.pin)) er.pin = 'Enter a 6-digit PIN code'
    setErr(er); if (!Object.keys(er).length) { setOid('MC' + Math.floor(10000 + Math.random() * 90000)); clear() } }
  if (oid) return <div className="mx-auto max-w-md px-4 py-16 text-center"><CheckCircle2 size={56} className="mx-auto text-secondary" /><h1 className="mt-4 text-2xl font-bold">Order placed</h1><p className="mt-2 text-muted">Order {oid}</p><p className="text-xs text-muted">Demo only: no payment was taken.</p><Link to="/orders" className="btn-primary mt-6">View Orders</Link></div>
  if (!items.length) return <div className="py-24 text-center"><p className="text-muted">Your cart is empty.</p><Link to="/medicines" className="btn-primary mt-4">Shop</Link></div>
  const F = ({ k, label, ...p }) => <label className="block text-sm"><span className="font-medium">{label}</span><input value={f[k]} onChange={set(k)} {...p} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-primary" />{err[k] && <span className="text-xs text-red-500">{err[k]}</span>}</label>
  return (
    <form onSubmit={submit} className="mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-3">
      <div className="space-y-4 md:col-span-2"><h1 className="text-2xl font-bold">Checkout</h1>
        <F k="name" label="Full name" /><F k="phone" label="Mobile" inputMode="numeric" /><F k="address" label="Delivery address" /><F k="pin" label="PIN code" inputMode="numeric" />
        <fieldset><legend className="font-semibold">Payment method</legend>
          {[['cod', 'Cash on delivery'], ['upi', 'UPI (demo)'], ['card', 'Card (demo)']].map(([v, l]) => <label key={v} className="mt-2 flex items-center gap-2 text-sm"><input type="radio" checked={pay === v} onChange={() => setPay(v)} />{l}</label>)}</fieldset></div>
      <aside className="card h-fit space-y-2 p-5 text-sm"><h2 className="font-semibold">Order summary</h2>
        {items.map(i => <div key={i.id} className="flex justify-between"><span>{i.name} × {i.qty}</span><span>₹{i.price * i.qty}</span></div>)}
        <div className="flex justify-between border-t pt-2"><span>Delivery</span><span>₹{ship}</span></div>
        <div className="flex justify-between text-base font-bold"><span>Total</span><span>₹{sub + ship}</span></div><button className="btn-primary w-full">Place Order</button></aside>
    </form>)
}
