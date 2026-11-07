import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useAppts } from '../store/listStores'
import { doctors, slots } from '../data/care'

const days = Array.from({ length: 5 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i)
  return d
})

function Field({ label, value, onChange, error, ...props }) {
  return <label className="block text-sm"><span className="font-medium">{label}</span><input value={value} onChange={onChange} {...props} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-primary" />{error && <span className="text-xs text-red-500">{error}</span>}</label>
}

export default function Consultation() {
  const [sp] = useSearchParams()
  const addAppt = useAppts(s => s.addAppt)
  const [doc, setDoc] = useState(sp.get('doctor') || '')
  const [day, setDay] = useState(0)
  const [slot, setSlot] = useState(sp.get('slot') || '')
  const [f, setF] = useState({ name: '', age: '', phone: '', reason: '' })
  const [err, setErr] = useState({})
  const [done, setDone] = useState(false)
  const d = doctors.find(x => x.id === doc)
  const fmt = x => x.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
  const set = key => event => setF(prev => ({ ...prev, [key]: event.target.value }))

  const submit = event => {
    event.preventDefault()
    const nextErrors = {}
    if (!d) nextErrors.doc = 'Select a doctor'
    if (!slot) nextErrors.slot = 'Select a time'
    if (f.name.trim().length < 2) nextErrors.name = 'Enter patient name'
    if (!(+f.age > 0 && +f.age < 120)) nextErrors.age = 'Enter a valid age'
    if (!/^[6-9]\d{9}$/.test(f.phone)) nextErrors.phone = 'Enter a valid 10-digit mobile number'
    setErr(nextErrors)
    if (!Object.keys(nextErrors).length) {
      addAppt({ id: Date.now(), docId: d.id, doctor: d.name, specialty: d.specialty, when: `${fmt(days[day])} · ${slot}`, patient: f.name.trim() })
      setDone(true)
    }
  }

  if (done) return <div className="mx-auto max-w-md px-4 py-16 text-center"><CheckCircle2 size={56} className="mx-auto text-secondary" /><h1 className="mt-4 text-2xl font-bold">Appointment confirmed</h1><p className="mt-2 text-muted">{d.name} · {fmt(days[day])} · {slot}</p><div className="mt-6 flex justify-center gap-3"><Link to={`/video-call/${d.id}`} className="btn-primary">Join Video Call</Link><Link to="/orders" className="btn border border-slate-200">My Appointments</Link></div></div>

  return <form onSubmit={submit} className="mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-3"><div className="space-y-6 md:col-span-2"><h1 className="text-3xl font-bold">Book Consultation</h1><section><h2 className="mb-2 font-semibold">1. Doctor</h2><select value={doc} onChange={event => setDoc(event.target.value)} className="card w-full px-3 py-2 text-sm"><option value="">Select a doctor</option>{doctors.map(x => <option key={x.id} value={x.id}>{x.name} — {x.specialty}</option>)}</select>{err.doc && <span className="text-xs text-red-500">{err.doc}</span>}</section><section><h2 className="mb-2 font-semibold">2. Date &amp; time</h2><div className="flex flex-wrap gap-2">{days.map((x, i) => <button type="button" key={i} onClick={() => setDay(i)} className={`rounded-lg border px-3 py-2 text-sm ${day === i ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-surface'}`}>{fmt(x)}</button>)}</div><div className="mt-3 flex flex-wrap gap-2">{slots.map(s => <button type="button" key={s} onClick={() => setSlot(s)} className={`rounded-lg border px-3 py-2 text-sm ${slot === s ? 'border-secondary bg-secondary text-white' : 'border-slate-200 bg-surface'}`}>{s}</button>)}</div>{err.slot && <span className="text-xs text-red-500">{err.slot}</span>}</section><section className="space-y-3"><h2 className="font-semibold">3. Patient information</h2><Field label="Full name" value={f.name} onChange={set('name')} error={err.name} /><div className="grid grid-cols-2 gap-3"><Field label="Age" value={f.age} onChange={set('age')} error={err.age} type="number" /><Field label="Mobile" value={f.phone} onChange={set('phone')} error={err.phone} inputMode="numeric" /></div><Field label="Reason (optional)" value={f.reason} onChange={set('reason')} error={err.reason} /></section></div><aside className="card h-fit space-y-2 p-5 text-sm"><h2 className="font-semibold">Booking summary</h2><p>Doctor: <b>{d?.name || '—'}</b></p><p>Date: <b>{fmt(days[day])}</b></p><p>Time: <b>{slot || '—'}</b></p><p className="border-t pt-2 text-base font-bold">Fee ₹{d?.fee || 0}</p><button className="btn-primary w-full">Confirm Booking</button></aside></form>
}
