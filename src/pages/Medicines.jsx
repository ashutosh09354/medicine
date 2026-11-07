import PageHeader from '../components/common/PageHeader'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/common/ProductCard'
import { medicines } from '../data'
export default function Medicines() {
  const [params] = useSearchParams(), [q, setQ] = useState(params.get('q') || ''), [cat, setCat] = useState(params.get('cat') || 'All'), [sort, setSort] = useState('')
  const cats = ['All', ...new Set(medicines.map(m => m.category))]
  const list = useMemo(() => {
    let r = medicines.filter(m => (cat === 'All' || m.category === cat) && m.name.toLowerCase().includes(q.toLowerCase()))
    if (sort) r = [...r].sort((a, b) => sort === 'asc' ? a.price - b.price : b.price - a.price)
    return r
  }, [q, cat, sort])
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <PageHeader title="Medicines" sub="Genuine medicines, delivered to your door" />
      <div className="mt-4 flex flex-wrap gap-3">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search medicines" className="card px-4 py-2 text-sm outline-none" />
        <select value={sort} onChange={e => setSort(e.target.value)} className="card px-3 py-2 text-sm"><option value="">Sort by price</option><option value="asc">Low to high</option><option value="desc">High to low</option></select>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-b border-slate-200">{cats.map(c => <button type="button" key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`border-b-2 px-1 py-2 text-sm font-medium ${cat === c ? 'border-primary text-primary' : 'border-transparent text-muted hover:border-slate-300 hover:text-ink'}`}>{c}</button>)}</div>
      {list.length ? <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">{list.map(p => <ProductCard key={p.id} p={p} />)}</div> : <p className="mt-10 text-center text-muted">No medicines found.</p>}
    </div>
  )
}
