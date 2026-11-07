import PageHeader from '../components/common/PageHeader'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FlaskConical } from 'lucide-react'
import { useCart } from '../store/cartStore'
import { tests, testCategories } from '../data/care'

const labImages = {
  t1: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=85',
  t2: 'https://www.hoxworth.org/content/hoxworth/lab-services/components/_jcr_content/main/image.img.jpeg/1552328856518/bloodvials.jpeg',
  t3: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=85',
  t4: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/lab-3498584_960_720-one_one.jpg?VersionId=.Dl3AL._x_9entIQxwL2JnTMpORWPIwE',
  t5: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85',
  t6: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85',
}

export default function LabTests() {
  const [q, setQ] = useState(''), [cat, setCat] = useState('All'), [max, setMax] = useState(0), add = useCart(s => s.add), [added, setAdded] = useState(''), [failedImages, setFailedImages] = useState({})
  const list = useMemo(() => tests.filter(t => (cat === 'All' || t.category === cat) && t.name.toLowerCase().includes(q.toLowerCase()) && (!max || t.price <= max)), [q, cat, max])
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <PageHeader title="Lab Tests" sub="Packages with convenient home sample collection" />
      <div className="mt-4 flex flex-wrap gap-3">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search tests" className="card px-4 py-2 text-sm outline-none" />
        <select value={max} onChange={e => setMax(+e.target.value)} className="card px-3 py-2 text-sm"><option value={0}>Any price</option><option value={500}>Under ₹500</option><option value={1000}>Under ₹1,000</option><option value={2000}>Under ₹2,000</option></select>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-b border-slate-200">{testCategories.map(c => <button type="button" key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`border-b-2 px-1 py-2 text-sm font-medium ${cat === c ? 'border-primary text-primary' : 'border-transparent text-muted hover:border-slate-300 hover:text-ink'}`}>{c}</button>)}</div>
      {added && <p role="status" className="mt-4 rounded-lg bg-secondary/10 p-3 text-sm text-secondary">{added} added to cart. <Link to="/cart" className="font-semibold underline">View cart</Link></p>}
      {list.length ? <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map(t => (
        <div key={t.id} className="card p-5 transition hover:-translate-y-1 hover:shadow-md">
          <div className="-mx-5 -mt-5 mb-4 h-36 overflow-hidden bg-slate-100">
            {labImages[t.id] && !failedImages[t.id] ? <img src={labImages[t.id]} alt={`${t.name} laboratory testing`} loading="lazy" onError={() => setFailedImages(prev => ({ ...prev, [t.id]: true }))} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-secondary"><FlaskConical size={34} /></div>}
          </div><p className="text-xs font-semibold uppercase text-secondary">{t.category}</p>
          <Link to={`/lab-tests/${t.id}`} className="mt-1 block text-lg font-semibold hover:text-primary">{t.name}</Link>
          <p className="mt-1 text-sm text-muted">{t.params} parameters · Home sample collection · Reports in {t.report}</p>
          <p className="mt-3 font-bold">₹{t.price} <s className="text-xs font-normal text-muted">₹{t.mrp}</s></p>
          <div className="mt-3 flex gap-2"><Link to={`/lab-tests/${t.id}`} className="btn flex-1 border border-slate-200">Details</Link>
            <button onClick={() => { add(t); setAdded(t.name) }} className="btn-primary flex-1">Book Now</button></div>
        </div>))}</div> : <p className="mt-10 text-center text-muted">No tests match your filters.</p>}
    </div>
  )
}
