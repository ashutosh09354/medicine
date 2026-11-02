import { orders, orderSteps } from '../data/extra'
export default function Orders() {
  return (<div className="mx-auto max-w-3xl px-4 py-8"><h1 className="text-3xl font-bold">My Orders</h1>
    <div className="mt-6 space-y-4">{orders.map(o => <div key={o.id} className="card p-5"><div className="flex justify-between"><b>{o.id}</b><span className="text-sm text-muted">{o.date}</span></div>
      <p className="mt-1 text-sm text-muted">{o.items}</p><p className="mt-1 font-semibold">₹{o.total}</p>
      <ol className="mt-4 grid grid-cols-4 gap-1 text-center text-xs">{orderSteps.map((s, i) => <li key={s}><div className={`h-1.5 rounded ${i <= o.status ? 'bg-secondary' : 'bg-slate-200'}`} /><span className={`mt-1 block ${i <= o.status ? 'font-medium' : 'text-muted'}`}>{s}</span></li>)}</ol></div>)}</div></div>)
}
