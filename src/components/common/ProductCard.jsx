import { Link } from 'react-router-dom'
import { Pill } from 'lucide-react'
import { useCart } from '../../store/cartStore'
export default function ProductCard({ p, to }) {
  const add = useCart(s => s.add), off = Math.round((1 - p.price / p.mrp) * 100)
  return (
    <div className="card flex flex-col p-4 transition hover:-translate-y-1 hover:shadow-md">
      <Link to={to || `/medicines/${p.id}`}><div className="grid aspect-square place-items-center rounded-xl bg-bg text-secondary"><Pill size={48} /></div>
        <p className="mt-3 line-clamp-2 min-h-10 text-sm font-medium">{p.name}</p></Link>
      {p.rx && <span className="mt-1 text-xs font-medium text-amber-600">Prescription required</span>}
      <div className="mt-2 flex items-center gap-2"><b>₹{p.price}</b><s className="text-xs text-muted">₹{p.mrp}</s><span className="text-xs font-semibold text-secondary">{off}% off</span></div>
      <button onClick={() => add(p)} className="btn-primary mt-3 w-full">Add to Cart</button>
    </div>)
}
