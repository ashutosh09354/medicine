import { useParams, Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, Home, Clock } from 'lucide-react'
import { useCart } from '../store/cartStore'
import { tests } from '../data/care'
export default function LabTestDetail() {
  const { id } = useParams(), nav = useNavigate(), add = useCart(s => s.add), t = tests.find(x => x.id === id)
  if (!t) return <div className="py-24 text-center"><p className="text-muted">Test not found.</p><Link to="/lab-tests" className="btn-primary mt-4">All Tests</Link></div>
  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Link to="/lab-tests" className="text-sm text-primary">← Lab Tests</Link>
        <h1 className="mt-2 text-3xl font-bold">{t.name}</h1>
        <p className="mt-2 text-muted">{t.params} parameters covered in this package.</p>
        <h2 className="mt-6 font-semibold">Parameters included</h2>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">{t.includes.map(i => <li key={i} className="card flex items-center gap-2 p-3 text-sm"><CheckCircle2 size={16} className="text-secondary" />{i}</li>)}</ul>
        <h2 className="mt-6 font-semibold">Preparation</h2>
        <p className="mt-1 text-sm text-muted">{t.fasting}. Drink water as usual and follow any instructions from your doctor.</p>
      </div>
      <aside className="card h-fit space-y-3 p-5">
        <p className="text-2xl font-bold">₹{t.price} <s className="text-sm font-normal text-muted">₹{t.mrp}</s></p>
        <p className="flex items-center gap-2 text-sm"><Home size={16} className="text-secondary" />Home sample collection</p>
        <p className="flex items-center gap-2 text-sm"><Clock size={16} className="text-secondary" />Report in {t.report}</p>
        <button onClick={() => { add(t); nav('/cart') }} className="btn-primary w-full">Book Now</button>
      </aside>
    </div>
  )
}
