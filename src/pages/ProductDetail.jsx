import { useState, useEffect } from 'react'
import PinCheck from '../components/common/PinCheck'
import RecentlyViewed from '../components/common/RecentlyViewed'
import { useRecents } from '../store/listStores'
import { useParams, Link } from 'react-router-dom'
import { ProductArt } from '../components/common/Art'
import { Minus, Plus } from 'lucide-react'
import { useCart } from '../store/cartStore'
import { medicines } from '../data'
import { products } from '../data/extra'
export default function ProductDetail({ kind }) {
  const { id } = useParams(), add = useCart(s => s.add), [qty, setQty] = useState(1), [ok, setOk] = useState(false)
  const p = (kind === 'medicine' ? medicines : products).find(x => x.id === id), push = useRecents(s => s.push)
  useEffect(() => { if (p) push(p.id) }, [id])
  if (!p) return <div className="py-24 text-center"><p className="text-muted">Product not found.</p><Link to="/" className="btn-primary mt-4">Home</Link></div>
  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-8 md:grid-cols-2">
      <div className="aspect-square overflow-hidden rounded-2xl ring-1 ring-slate-100"><ProductArt p={p} /></div>
      <div><p className="text-sm text-secondary">{p.category}</p><h1 className="mt-1 text-2xl font-bold">{p.name}</h1>
        {p.rx && <p className="mt-2 rounded-lg bg-amber-50 p-2 text-sm text-amber-700">Prescription required for this medicine.</p>}
        <p className="mt-3 text-2xl font-bold">₹{p.price} <s className="text-sm font-normal text-muted">₹{p.mrp}</s></p>
        <p className="mt-3 text-sm text-muted">Please read the label carefully and follow your doctor&apos;s advice.</p>
        <div className="mt-5 flex items-center gap-3"><button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease" className="card p-2"><Minus size={16} /></button><span className="w-6 text-center">{qty}</span><button onClick={() => setQty(qty + 1)} aria-label="Increase" className="card p-2"><Plus size={16} /></button></div>
        <button onClick={() => { add(p, qty); setOk(true) }} className="btn-primary mt-5 w-full sm:w-auto">Add to Cart</button>
        {ok && <p role="status" className="mt-3 text-sm text-secondary">Added to cart. <Link to="/cart" className="font-semibold underline">View cart</Link></p>}
        <div className="mt-6 rounded-xl bg-bg p-4"><p className="mb-2 text-sm font-medium">Check delivery</p><PinCheck /></div>
      </div><div className="md:col-span-2"><RecentlyViewed exclude={id} /></div></div>)
}
