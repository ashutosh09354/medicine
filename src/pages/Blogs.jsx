import { useMemo, useState } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BlogCover } from '../components/common/Art'
import { blogs, blogCats } from '../data/extra'

export default function Blogs() {
  const [q, setQ] = useState(''), [cat, setCat] = useState('All')
  const list = useMemo(() => blogs.filter(b => (cat === 'All' || b.category === cat) && b.title.toLowerCase().includes(q.toLowerCase())), [q, cat])
  const [feat, ...rest] = list

  return <main className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
    <header className="grid gap-8 border-b border-slate-200 pb-10 lg:grid-cols-[1fr_320px] lg:items-end">
      <div><p className="text-xs font-bold tracking-[0.22em] text-primary">THE MEDCARE JOURNAL</p><h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">Better information for everyday health.</h1><p className="mt-5 max-w-2xl text-base leading-7 text-muted">Clear, practical guidance to help you make more informed decisions about your wellbeing.</p></div>
      <label className="relative block" aria-label="Search health articles"><span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Search the journal</span><Search size={17} className="pointer-events-none absolute left-0 top-10 text-muted" /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search articles" className="w-full border-0 border-b border-slate-300 bg-transparent py-3 pl-7 pr-2 text-base outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-0" /></label>
    </header>

    <nav className="flex gap-6 overflow-x-auto border-b border-slate-200" aria-label="Article categories">{blogCats.map(c => <button type="button" key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`whitespace-nowrap border-b-2 py-4 text-sm font-semibold transition ${cat === c ? 'border-primary text-primary' : 'border-transparent text-muted hover:border-slate-300 hover:text-ink'}`}>{c}</button>)}</nav>

    {!feat ? <div className="py-24 text-center"><h2 className="font-display text-2xl font-bold">No articles found</h2><p className="mt-2 text-sm text-muted">Try another search term or category.</p></div> : <>
      <section className="grid border-b border-slate-200 py-10 md:grid-cols-[1.15fr_.85fr] md:gap-10 md:py-14"><Link to={`/blogs/${feat.slug}`} className="group block overflow-hidden"><BlogCover cat={feat.category} className="h-64 rounded-none transition duration-500 group-hover:scale-[1.015] sm:h-80 md:h-full md:min-h-[360px]" /></Link><div className="flex flex-col justify-center py-7 md:py-0"><p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Featured article</p><h2 className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">{feat.title}</h2><p className="mt-5 max-w-xl text-base leading-7 text-muted">{feat.excerpt}</p><div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-4 text-sm"><span className="text-muted">{feat.category} <span className="px-1 text-slate-300">/</span> {feat.date}</span><Link to={`/blogs/${feat.slug}`} className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-dark">Read article <ArrowUpRight size={16} /></Link></div></div></section>
      <section className="pt-10 md:pt-14"><div className="flex items-end justify-between"><div><p className="text-xs font-bold tracking-[0.18em] text-secondary">FROM THE JOURNAL</p><h2 className="mt-2 font-display text-3xl font-bold text-ink">More to explore</h2></div><span className="hidden text-sm text-muted sm:block">{list.length} {list.length === 1 ? 'story' : 'stories'}</span></div><div className="mt-7 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{rest.map(b => <Link key={b.slug} to={`/blogs/${b.slug}`} className="group block"><BlogCover cat={b.category} className="h-48 rounded-none transition duration-500 group-hover:scale-[1.015]" /><div className="border-b border-slate-200 pb-5 pt-4"><div className="flex items-center justify-between gap-3 text-xs font-semibold"><span className="text-secondary">{b.category}</span><span className="text-muted">{b.date}</span></div><h3 className="mt-3 font-display text-xl font-bold leading-snug text-ink transition group-hover:text-primary">{b.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{b.excerpt}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read article <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span></div></Link>)}</div></section>
    </>}
  </main>
}
