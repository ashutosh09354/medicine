import { Link } from 'react-router-dom'
import { Trash2, Minus, Plus } from 'lucide-react'
import { useCart } from '../store/cartStore'
import { totals } from '../utils/pricing'
import CouponBox from '../components/cart/CouponBox'
export default function Cart() {
  const { items, coupon, setQty, remove } = useCart(), t = totals(items, coupon)
  if (!items.length) return <div className="py-24 text-center"><p className="text-muted">Your cart is empty.</p><Link to="/medicines" className="btn-primary mt-4">Continue Shopping</Link></div>
  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-3">
      <div className="space-y-3 md:col-span-2"><h1 className="text-2xl font-bold">Cart</h1>
        {items.map(i => <div key={i.id} className="card flex items-center gap-3 p-4"><p className="flex-1 text-sm font-medium">{i.name}</p>
          <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease"><Minus size={16} /></button><span>{i.qty}</span><button onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase"><Plus size={16} /></button>
          <b className="w-16 text-right">₹{i.price * i.qty}</b><button onClick={() => remove(i.id)} aria-label="Remove" className="text-red-500"><Trash2 size={16} /></button></div>)}</div>
      <div className="card h-fit space-y-3 p-5 text-sm"><CouponBox />
        <div className="flex justify-between"><span>Subtotal</span><span>₹{t.sub}</span></div>
        {t.disc > 0 && <div className="flex justify-between text-secondary"><span>Discount</span><span>−₹{t.disc}</span></div>}
        <div className="flex justify-between"><span>Delivery</span><span>{t.ship ? `₹${t.ship}` : 'Free'}</span></div>
        <div className="flex justify-between border-t pt-2 text-base font-bold"><span>Total</span><span>₹{t.total}</span></div>
        <Link to="/medicines" className="btn w-full border border-slate-200">Continue Shopping</Link><Link to="/checkout" className="btn-primary w-full">Proceed to Checkout</Link></div>
    </div>)
}
