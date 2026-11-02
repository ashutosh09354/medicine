import { useState } from 'react'
import { Link } from 'react-router-dom'
const tabs = ['Profile', 'Addresses', 'Settings']
export default function Account() {
  const [t, setT] = useState('Profile'), [p, setP] = useState({ name: 'Demo User', email: 'demo@example.com', phone: '9876543210' }), [saved, setSaved] = useState(false), [n, setN] = useState(true)
  return (<div className="mx-auto max-w-3xl px-4 py-8"><h1 className="text-3xl font-bold">My Account</h1>
    <div className="mt-4 flex gap-2">{tabs.map(x => <button key={x} onClick={() => setT(x)} className={`rounded-full px-4 py-1.5 text-sm ${t === x ? 'bg-primary text-white' : 'bg-surface text-muted'}`}>{x}</button>)}<Link to="/orders" className="ml-auto self-center text-sm font-semibold text-primary">Order history</Link></div>
    <div className="card mt-4 p-5">
      {t === 'Profile' && <form onSubmit={e => { e.preventDefault(); setSaved(true) }} className="space-y-3">{Object.keys(p).map(k => <label key={k} className="block text-sm capitalize"><span className="font-medium">{k}</span><input value={p[k]} onChange={e => { setP({ ...p, [k]: e.target.value }); setSaved(false) }} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" /></label>)}<button className="btn-primary">Save</button>{saved && <span role="status" className="ml-3 text-sm text-secondary">Saved</span>}</form>}
      {t === 'Addresses' && <div className="space-y-3 text-sm"><div className="rounded-lg border p-3"><b>Home</b><p className="text-muted">12, Sample Street, Greater Noida, Uttar Pradesh 201306</p></div><div className="rounded-lg border p-3"><b>Work</b><p className="text-muted">45, Business Park, Noida, Uttar Pradesh 201301</p></div></div>}
      {t === 'Settings' && <label className="flex items-center justify-between text-sm"><span>Order and appointment notifications</span><input type="checkbox" checked={n} onChange={() => setN(!n)} /></label>}
    </div></div>)
}
