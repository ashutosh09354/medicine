import { useParams, Link } from 'react-router-dom'
import { BlogCover } from '../components/common/Art'
import { blogs } from '../data/extra'
export default function BlogDetail() {
  const b = blogs.find(x => x.slug === useParams().slug)
  if (!b) return <div className="py-24 text-center"><p className="text-muted">Article not found.</p><Link to="/blogs" className="btn-primary mt-4">All Articles</Link></div>
  return (<article className="mx-auto max-w-2xl px-4 py-8"><Link to="/blogs" className="text-sm text-primary">← Blogs</Link><BlogCover cat={b.category} className="mt-3 h-52 rounded-2xl" /><p className="mt-4 text-xs font-semibold text-secondary">{b.category} · {b.date}</p><h1 className="mt-1 text-3xl font-bold">{b.title}</h1>
    {b.body.map((t, i) => <p key={i} className="mt-4 leading-relaxed text-ink/90">{t}</p>)}<p className="mt-8 text-xs text-muted">General information only, not medical advice.</p></article>)
}
