import { useMemo, useState } from 'react'
import ProductCard from '../components/common/ProductCard'
import { medicines } from '../data'
export default function Medicines() {
  const [q, setQ] = useState(''), [cat, setCat] = useState('All'), [sort, setSort] = useState('')
  const cats = ['All', ...new Set(medicines.map(m => m.category))]
  const list = useMemo(() => {
    let r = medicines.filter(m => (cat === 'All' || m.category === cat) && m.name.toLowerCase().includes(q.toLowerCase()))
    if (sort) r = [...r].sort((a, b) => sort === 'asc' ? a.price - b.price : b.price - a.price)
    return r
  }, [q, cat, sort])
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">Medicines</h1>
      <div className="mt-4 flex flex-wrap gap-3">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search medicines" className="card px-4 py-2 text-sm outline-none" />
        <select value={sort} onChange={e => setSort(e.target.value)} className="card px-3 py-2 text-sm"><option value="">Sort by price</option><option value="asc">Low to high</option><option value="desc">High to low</option></select>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{cats.map(c => <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-1.5 text-sm ${cat === c ? 'bg-primary text-white' : 'bg-surface text-muted'}`}>{c}</button>)}</div>
      {list.length ? <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">{list.map(p => <ProductCard key={p.id} p={p} />)}</div> : <p className="mt-10 text-center text-muted">No medicines found.</p>}
    </div>
  )
}
