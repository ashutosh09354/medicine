import PageHeader from '../components/common/PageHeader'
import { useMemo, useState } from 'react'
import ProductCard from '../components/common/ProductCard'
import { products, productCats } from '../data/extra'
export default function Healthcare() {
  const [q, setQ] = useState(''), [cat, setCat] = useState('All'), [sort, setSort] = useState('')
  const list = useMemo(() => { let r = products.filter(p => (cat === 'All' || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase())); if (sort) r = [...r].sort((a, b) => sort === 'asc' ? a.price - b.price : b.price - a.price); return r }, [q, cat, sort])
  return (
    <div className="mx-auto max-w-7xl px-4 py-8"><PageHeader title="Healthcare Products" sub="Wellness essentials, devices and personal care" />
      <div className="mt-4 flex flex-wrap gap-3"><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products" className="card px-4 py-2 text-sm outline-none" />
        <select value={sort} onChange={e => setSort(e.target.value)} className="card px-3 py-2 text-sm"><option value="">Sort by price</option><option value="asc">Low to high</option><option value="desc">High to low</option></select></div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-b border-slate-200">{productCats.map(c => <button type="button" key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`border-b-2 px-1 py-2 text-sm font-medium ${cat === c ? 'border-primary text-primary' : 'border-transparent text-muted hover:border-slate-300 hover:text-ink'}`}>{c}</button>)}</div>
      {list.length ? <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">{list.map(p => <ProductCard key={p.id} p={p} to={`/healthcare/${p.id}`} />)}</div> : <p className="mt-10 text-center text-muted">No products found.</p>}
    </div>)
}
