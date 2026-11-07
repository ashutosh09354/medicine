import PageHeader from '../components/common/PageHeader'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../components/common/Avatar'
import { doctors, specialties } from '../data/care'
export default function Doctors() {
  const [q, setQ] = useState(''), [sp, setSp] = useState('All'), [exp, setExp] = useState(0)
  const list = useMemo(() => doctors.filter(d => (sp === 'All' || d.specialty === sp) && d.exp >= exp && (d.name + d.specialty).toLowerCase().includes(q.toLowerCase())), [q, sp, exp])
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <PageHeader title="Find a Doctor" sub="Search by specialty and book a slot or video call" />
      <div className="mt-4 flex flex-wrap gap-3">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search doctors" className="card px-4 py-2 text-sm outline-none" />
        <select value={exp} onChange={e => setExp(+e.target.value)} className="card px-3 py-2 text-sm"><option value={0}>Any experience</option><option value={5}>5+ years</option><option value={10}>10+ years</option><option value={15}>15+ years</option></select>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-b border-slate-200">{specialties.map(s => <button type="button" key={s} onClick={() => setSp(s)} aria-pressed={sp === s} className={`border-b-2 px-1 py-2 text-sm font-medium ${sp === s ? 'border-primary text-primary' : 'border-transparent text-muted hover:border-slate-300 hover:text-ink'}`}>{s}</button>)}</div>
      {list.length ? <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map(d => (
        <div key={d.id} className="card p-5 transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex gap-4"><Avatar name={d.name} size="h-20 w-20" />
            <div><p className="font-semibold">{d.name}</p><p className="text-sm text-secondary">{d.specialty}</p><p className="text-sm text-muted">{d.exp} years experience</p>
              <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs ${d.online ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-muted'}`}>{d.online ? 'Available today' : 'Next available tomorrow'}</span></div></div>
          <p className="mt-3 text-sm">Consultation fee <b>₹{d.fee}</b></p>
          <div className="mt-3 flex gap-2"><Link to={`/doctors/${d.id}`} className="btn flex-1 border border-slate-200">View Profile</Link>
            <Link to={`/consultation?doctor=${d.id}`} className="btn-primary flex-1">Book</Link>
            {d.online && <Link to={`/video-call/${d.id}`} className="btn bg-secondary text-white">Video</Link>}</div>
        </div>))}</div> : <p className="mt-10 text-center text-muted">No doctors found.</p>}
    </div>
  )
}
