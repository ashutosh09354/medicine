import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../store/cartStore'
import { tests, testCategories } from '../data/care'
export default function LabTests() {
  const [q, setQ] = useState(''), [cat, setCat] = useState('All'), [max, setMax] = useState(0), add = useCart(s => s.add), [added, setAdded] = useState('')
  const list = useMemo(() => tests.filter(t => (cat === 'All' || t.category === cat) && t.name.toLowerCase().includes(q.toLowerCase()) && (!max || t.price <= max)), [q, cat, max])
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">Lab Tests</h1>
      <div className="mt-4 flex flex-wrap gap-3">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search tests" className="card px-4 py-2 text-sm outline-none" />
        <select value={max} onChange={e => setMax(+e.target.value)} className="card px-3 py-2 text-sm"><option value={0}>Any price</option><option value={500}>Under ₹500</option><option value={1000}>Under ₹1,000</option><option value={2000}>Under ₹2,000</option></select>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{testCategories.map(c => <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-1.5 text-sm ${cat === c ? 'bg-primary text-white' : 'bg-surface text-muted'}`}>{c}</button>)}</div>
      {added && <p role="status" className="mt-4 rounded-lg bg-secondary/10 p-3 text-sm text-secondary">{added} added to cart. <Link to="/cart" className="font-semibold underline">View cart</Link></p>}
      {list.length ? <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map(t => (
        <div key={t.id} className="card p-5 transition hover:-translate-y-1 hover:shadow-md">
          <p className="text-xs font-semibold uppercase text-secondary">{t.category}</p>
          <Link to={`/lab-tests/${t.id}`} className="mt-1 block text-lg font-semibold hover:text-primary">{t.name}</Link>
          <p className="mt-1 text-sm text-muted">{t.params} parameters · Home sample collection · Reports in {t.report}</p>
          <p className="mt-3 font-bold">₹{t.price} <s className="text-xs font-normal text-muted">₹{t.mrp}</s></p>
          <div className="mt-3 flex gap-2"><Link to={`/lab-tests/${t.id}`} className="btn flex-1 border border-slate-200">Details</Link>
            <button onClick={() => { add(t); setAdded(t.name) }} className="btn-primary flex-1">Book Now</button></div>
        </div>))}</div> : <p className="mt-10 text-center text-muted">No tests match your filters.</p>}
    </div>
  )
}
