import { useState } from 'react'
export default function BMI() {
  const [h, setH] = useState(''), [w, setW] = useState(''), [r, setR] = useState(null), [err, setErr] = useState('')
  const calc = e => { e.preventDefault(); if (!(+h >= 100 && +h <= 250 && +w >= 20 && +w <= 300)) { setR(null); return setErr('Enter height 100–250 cm and weight 20–300 kg.') } setErr(''); setR(+(w / (h / 100) ** 2).toFixed(1)) }
  const cat = r < 18.5 ? 'Below the typical range' : r < 25 ? 'Within the typical range' : r < 30 ? 'Above the typical range' : 'Well above the typical range'
  return (<div className="mx-auto max-w-md px-4 py-8"><h1 className="text-3xl font-bold">BMI Calculator</h1>
    <form onSubmit={calc} className="card mt-5 space-y-3 p-5"><input type="number" value={h} onChange={e => setH(e.target.value)} placeholder="Height (cm)" aria-label="Height in cm" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
      <input type="number" value={w} onChange={e => setW(e.target.value)} placeholder="Weight (kg)" aria-label="Weight in kg" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
      {err && <p role="alert" className="text-xs text-red-500">{err}</p>}<button className="btn-primary w-full">Calculate</button></form>
    {r && <div className="card mt-4 p-5 text-center"><p className="text-4xl font-bold text-primary">{r}</p><p className="mt-1 text-muted">{cat}</p><p className="mt-3 text-xs text-muted">BMI is a general screening figure and not a diagnosis. Speak to a doctor for advice.</p></div>}
  </div>)
}
