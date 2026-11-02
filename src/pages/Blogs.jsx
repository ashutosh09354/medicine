import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogs, blogCats } from '../data/extra'
export default function Blogs() {
  const [q, setQ] = useState(''), [cat, setCat] = useState('All')
  const list = useMemo(() => blogs.filter(b => (cat === 'All' || b.category === cat) && b.title.toLowerCase().includes(q.toLowerCase())), [q, cat])
  const [feat, ...rest] = list
  return (<div className="mx-auto max-w-6xl px-4 py-8"><h1 className="text-3xl font-bold">Health Blogs</h1>
    <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search articles" className="card mt-4 px-4 py-2 text-sm outline-none" />
    <div className="mt-4 flex flex-wrap gap-2">{blogCats.map(c => <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-1.5 text-sm ${cat === c ? 'bg-primary text-white' : 'bg-surface text-muted'}`}>{c}</button>)}</div>
    {!feat ? <p className="mt-10 text-center text-muted">No articles found.</p> : <>
      <Link to={`/blogs/${feat.slug}`} className="mt-6 block rounded-2xl bg-gradient-to-br from-primary to-secondary p-8 text-white"><p className="text-xs uppercase opacity-80">Featured · {feat.category}</p><h2 className="mt-2 text-2xl font-bold">{feat.title}</h2><p className="mt-2 max-w-xl opacity-90">{feat.excerpt}</p><span className="mt-4 inline-block font-semibold">Read More →</span></Link>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{rest.map(b => <Link key={b.slug} to={`/blogs/${b.slug}`} className="card p-5 transition hover:-translate-y-1 hover:shadow-md"><p className="text-xs font-semibold text-secondary">{b.category} · {b.date}</p><h3 className="mt-1 font-semibold">{b.title}</h3><p className="mt-1 text-sm text-muted">{b.excerpt}</p><span className="mt-3 inline-block text-sm font-semibold text-primary">Read More</span></Link>)}</div></>}
  </div>)
}
