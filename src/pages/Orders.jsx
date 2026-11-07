import { Link, useNavigate } from 'react-router-dom'
import { RotateCcw, Video } from 'lucide-react'
import { orders, orderSteps, products } from '../data/extra'
import { medicines } from '../data'
import { tests, doctors } from '../data/care'
import { useOrders, useAppts } from '../store/listStores'
import { useCart } from '../store/cartStore'
import { useToast } from '../store/toastStore'
export default function Orders() {
  const nav = useNavigate(), add = useCart(s => s.add), show = useToast(s => s.show), saved = useOrders(s => s.list), { list: appts, cancel } = useAppts()
  const find = id => [...medicines, ...tests, ...products].find(x => x.id === id)
  const all = [...saved, ...orders.map(o => ({ ...o, lines: o.ids.map(id => ({ ...find(id), qty: 1 })) }))]
  const reorder = o => { o.lines.forEach(l => add(l, l.qty)); show('Items added to cart'); nav('/cart') }
  return (<div className="mx-auto max-w-3xl px-4 py-8"><h1 className="text-3xl font-bold">My Orders</h1>
    <div className="mt-6 space-y-4">{all.map(o => <div key={o.id} className="card p-5"><div className="flex justify-between"><b>{o.id}</b><span className="text-sm text-muted">{o.date}</span></div>
      <p className="mt-1 text-sm text-muted">{o.items}</p><div className="mt-1 flex items-center justify-between"><p className="font-semibold">₹{o.total}</p><button onClick={() => reorder(o)} className="btn border border-slate-200 !py-1.5"><RotateCcw size={14} />Reorder</button></div>
      <ol className="mt-4 grid grid-cols-4 gap-1 text-center text-xs">{orderSteps.map((s, i) => <li key={s}><div className={`h-1.5 rounded ${i <= o.status ? 'bg-secondary' : 'bg-slate-200'}`} /><span className={`mt-1 block ${i <= o.status ? 'font-medium' : 'text-muted'}`}>{s}</span></li>)}</ol></div>)}</div>
    <h2 className="mt-10 text-2xl font-bold">My Appointments</h2>
    {appts.length ? <div className="mt-4 space-y-3">{appts.map(a => <div key={a.id} className="card flex flex-wrap items-center gap-3 p-4"><div className="flex-1"><b>{a.doctor}</b><p className="text-sm text-muted">{a.specialty} · {a.when}</p><p className="text-xs text-muted">Patient: {a.patient}</p></div>
      {doctors.find(d => d.id === a.docId)?.online && <Link to={`/video-call/${a.docId}`} className="btn-primary !py-1.5"><Video size={14} />Join</Link>}<button onClick={() => { cancel(a.id); show('Appointment cancelled') }} className="btn border border-red-200 text-red-600 !py-1.5">Cancel</button></div>)}</div>
      : <p className="mt-4 text-sm text-muted">No appointments yet. <Link to="/doctors" className="font-semibold text-primary">Find a doctor</Link></p>}
  </div>)
}
