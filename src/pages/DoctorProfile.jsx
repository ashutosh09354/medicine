import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Avatar from '../components/common/Avatar'
import { doctors, slots } from '../data/care'
export default function DoctorProfile() {
  const { id } = useParams(), nav = useNavigate(), [slot, setSlot] = useState(''), d = doctors.find(x => x.id === id)
  if (!d) return <div className="py-24 text-center"><p className="text-muted">Doctor not found.</p><Link to="/doctors" className="btn-primary mt-4">All Doctors</Link></div>
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="card flex flex-col gap-5 p-6 sm:flex-row"><Avatar name={d.name} size="h-24 w-24 text-2xl" />
        <div><h1 className="text-2xl font-bold">{d.name}</h1><p className="text-secondary">{d.specialty}</p>
          <p className="mt-1 text-sm text-muted">{d.degree} · {d.exp} years experience</p><p className="mt-2 text-sm">{d.about}</p><p className="mt-2 font-semibold">Fee ₹{d.fee}</p></div></div>
      <h2 className="mt-8 font-semibold">Available slots (today)</h2>
      <div className="mt-3 flex flex-wrap gap-2">{slots.map(s => <button key={s} onClick={() => setSlot(s)} className={`rounded-lg border px-4 py-2 text-sm ${slot === s ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-surface'}`}>{s}</button>)}</div>
      <button disabled={!slot} onClick={() => nav(`/consultation?doctor=${d.id}&slot=${encodeURIComponent(slot)}`)} className="btn-primary mt-5 disabled:opacity-40">Book Appointment</button>
    </div>
  )
}
