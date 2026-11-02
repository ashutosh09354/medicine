import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { doctors, slots } from '../data/care'
const days = Array.from({ length: 5 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d })
export default function Consultation() {
  const [sp] = useSearchParams()
  const [doc, setDoc] = useState(sp.get('doctor') || ''), [day, setDay] = useState(0), [slot, setSlot] = useState(sp.get('slot') || '')
  const [f, setF] = useState({ name: '', age: '', phone: '', reason: '' }), [err, setErr] = useState({}), [done, setDone] = useState(false)
  const d = doctors.find(x => x.id === doc), set = k => e => setF({ ...f, [k]: e.target.value })
  const fmt = x => x.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
  const submit = e => {
    e.preventDefault()
    const er = {}
    if (!d) er.doc = 'Select a doctor'
    if (!slot) er.slot = 'Select a time'
    if (f.name.trim().length < 2) er.name = 'Enter patient name'
    if (!(+f.age > 0 && +f.age < 120)) er.age = 'Enter a valid age'
    if (!/^[6-9]\d{9}$/.test(f.phone)) er.phone = 'Enter a valid 10-digit mobile number'
    setErr(er); if (!Object.keys(er).length) setDone(true)
  }
  if (done) return (
    <div className="mx-auto max-w-md px-4 py-16 text-center"><CheckCircle2 size={56} className="mx-auto text-secondary" />
      <h1 className="mt-4 text-2xl font-bold">Appointment requested</h1>
      <p className="mt-2 text-muted">{d.name} · {fmt(days[day])} · {slot}</p><p className="mt-1 text-xs text-muted">Demo only: no real booking has been made.</p>
      <Link to="/" className="btn-primary mt-6">Back Home</Link></div>)
  const Field = ({ k, label, ...p }) => <label className="block text-sm"><span className="font-medium">{label}</span><input value={f[k]} onChange={set(k)} {...p} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-primary" />{err[k] && <span className="text-xs text-red-500">{err[k]}</span>}</label>
  return (
    <form onSubmit={submit} className="mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-3">
      <div className="space-y-6 md:col-span-2">
        <h1 className="text-3xl font-bold">Book Consultation</h1>
        <section><h2 className="mb-2 font-semibold">1. Doctor</h2>
          <select value={doc} onChange={e => setDoc(e.target.value)} className="card w-full px-3 py-2 text-sm"><option value="">Select a doctor</option>{doctors.map(x => <option key={x.id} value={x.id}>{x.name} — {x.specialty}</option>)}</select>
          {err.doc && <span className="text-xs text-red-500">{err.doc}</span>}</section>
        <section><h2 className="mb-2 font-semibold">2. Date & time</h2>
          <div className="flex flex-wrap gap-2">{days.map((x, i) => <button type="button" key={i} onClick={() => setDay(i)} className={`rounded-lg border px-3 py-2 text-sm ${day === i ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-surface'}`}>{fmt(x)}</button>)}</div>
          <div className="mt-3 flex flex-wrap gap-2">{slots.map(s => <button type="button" key={s} onClick={() => setSlot(s)} className={`rounded-lg border px-3 py-2 text-sm ${slot === s ? 'border-secondary bg-secondary text-white' : 'border-slate-200 bg-surface'}`}>{s}</button>)}</div>
          {err.slot && <span className="text-xs text-red-500">{err.slot}</span>}</section>
        <section className="space-y-3"><h2 className="font-semibold">3. Patient information</h2>
          <Field k="name" label="Full name" /><div className="grid grid-cols-2 gap-3"><Field k="age" label="Age" type="number" /><Field k="phone" label="Mobile" inputMode="numeric" /></div>
          <Field k="reason" label="Reason (optional)" /></section>
      </div>
      <aside className="card h-fit space-y-2 p-5 text-sm"><h2 className="font-semibold">Booking summary</h2>
        <p>Doctor: <b>{d?.name || '—'}</b></p><p>Date: <b>{fmt(days[day])}</b></p><p>Time: <b>{slot || '—'}</b></p>
        <p className="border-t pt-2 text-base font-bold">Fee ₹{d?.fee || 0}</p><button className="btn-primary w-full">Confirm Booking</button></aside>
    </form>
  )
}
