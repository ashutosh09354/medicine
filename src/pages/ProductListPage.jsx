import { useMemo, useState } from 'react'
import ProductCard from '../components/common/ProductCard'
import { products, productCats } from '../data/extra'
export default function Healthcare() {
  const [q, setQ] = useState(''), [cat, setCat] = useState('All'), [sort, setSort] = useState('')
  const list = useMemo(() => { let r = products.filter(p => (cat === 'All' || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase())); if (sort) r = [...r].sort((a, b) => sort === 'asc' ? a.price - b.price : b.price - a.price); return r }, [q, cat, sort])
  return (
    <div className="mx-auto max-w-7xl px-4 py-8"><h1 className="text-3xl font-bold">Healthcare Products</h1>
      <div className="mt-4 flex flex-wrap gap-3"><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products" className="card px-4 py-2 text-sm outline-none" />
        <select value={sort} onChange={e => setSort(e.target.value)} className="card px-3 py-2 text-sm"><option value="">Sort by price</option><option value="asc">Low to high</option><option value="desc">High to low</option></select></div>
      <div className="mt-4 flex flex-wrap gap-2">{productCats.map(c => <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-1.5 text-sm ${cat === c ? 'bg-primary text-white' : 'bg-surface text-muted'}`}>{c}</button>)}</div>
      {list.length ? <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">{list.map(p => <ProductCard key={p.id} p={p} to={`/healthcare/${p.id}`} />)}</div> : <p className="mt-10 text-center text-muted">No products found.</p>}
    </div>)
}
