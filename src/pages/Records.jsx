import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Trash2, Paperclip } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import { useRecords } from '../store/listStores'
import { useToast } from '../store/toastStore'
const types = ['Lab Report', 'Prescription', 'Doctor Notes', 'Other']
const today = new Date().toISOString().slice(0, 10)
export default function Records() {
  const { list, add, remove } = useRecords(), show = useToast(s => s.show)
  const [f, setF] = useState({ title: '', type: types[0], date: today, notes: '', file: '' }), [err, setErr] = useState({}), [q, setQ] = useState(''), [t, setT] = useState('All')
  const shown = useMemo(() => list.filter(r => (t === 'All' || r.type === t) && (r.title + r.notes).toLowerCase().includes(q.toLowerCase())), [list, q, t])
  const submit = e => { e.preventDefault(); const er = {}
    if (f.title.trim().length < 2) er.title = 'Enter a title'
    if (!f.date || f.date > today) er.date = 'Date cannot be in the future'
    setErr(er); if (Object.keys(er).length) return
    add({ ...f, title: f.title.trim(), notes: f.notes.trim() }); setF({ ...f, title: '', notes: '', file: '' }); show('Record saved') }
  const inp = 'mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm'
  return (<div className="mx-auto max-w-5xl px-4 py-8"><PageHeader title="Health Records" sub="Keep your reports and prescriptions together. Saved on this device only." />
    <div className="mt-6 grid gap-6 md:grid-cols-5">
      <form onSubmit={submit} className="card h-fit space-y-3 p-5 md:col-span-2"><h2 className="font-semibold">Add a record</h2>
        <label className="block text-sm font-medium">Title<input value={f.title} onChange={e => setF({ ...f, title: e.target.value })} className={inp} />{err.title && <span className="text-xs text-red-500">{err.title}</span>}</label>
        <div className="grid grid-cols-2 gap-3"><label className="block text-sm font-medium">Type<select value={f.type} onChange={e => setF({ ...f, type: e.target.value })} className={inp}>{types.map(x => <option key={x}>{x}</option>)}</select></label>
          <label className="block text-sm font-medium">Date<input type="date" max={today} value={f.date} onChange={e => setF({ ...f, date: e.target.value })} className={inp} />{err.date && <span className="text-xs text-red-500">{err.date}</span>}</label></div>
        <label className="block text-sm font-medium">Notes (optional)<textarea rows={3} value={f.notes} onChange={e => setF({ ...f, notes: e.target.value })} className={inp} /></label>
        <label className="block text-sm font-medium">File (optional)<input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={e => setF({ ...f, file: e.target.files[0]?.name || '' })} className="mt-1 block w-full text-xs" /></label>
        <p className="text-[11px] text-muted">Only the file name is kept. The file itself is not stored or uploaded.</p><button className="btn-primary w-full">Save Record</button></form>
      <div className="md:col-span-3"><div className="flex flex-wrap gap-2"><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search records" aria-label="Search records" className="card min-w-0 flex-1 px-4 py-2 text-sm outline-none" /></div>
        <div className="mt-3 flex flex-wrap gap-2">{['All', ...types].map(x => <button key={x} onClick={() => setT(x)} className={`rounded-full px-4 py-1.5 text-sm ${t === x ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-surface text-muted ring-1 ring-slate-200 hover:ring-primary/40'}`}>{x}</button>)}</div>
        {shown.length ? <ul className="mt-4 space-y-3">{shown.map(r => <li key={r.id} className="card flex gap-3 p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary/10 text-secondary"><FileText size={20} /></span>
          <div className="min-w-0 flex-1"><p className="font-semibold">{r.title}</p><p className="text-xs text-muted">{r.type} · {new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            {r.notes && <p className="mt-1 text-sm text-muted">{r.notes}</p>}{r.file && <p className="mt-1 flex items-center gap-1 text-xs text-primary"><Paperclip size={12} />{r.file}</p>}</div>
          <button onClick={() => { remove(r.id); show('Record deleted') }} aria-label="Delete record" className="self-start text-red-500"><Trash2 size={16} /></button></li>)}</ul>
          : <div className="py-14 text-center"><p className="text-muted">{list.length ? 'No records match.' : 'No records yet. Add your first one.'}</p><Link to="/lab-tests" className="btn-primary mt-4">Book a Lab Test</Link></div>}</div>
    </div></div>)
}
