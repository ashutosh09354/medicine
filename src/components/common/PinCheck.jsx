import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { usePin } from '../../store/listStores'
import { checkPin } from '../../utils/pincode'
export default function PinCheck({ onDone }) {
  const { pin, setPin } = usePin(), [v, setV] = useState(pin), [res, setRes] = useState(pin ? checkPin(pin) : null), [err, setErr] = useState('')
  const go = e => { e.preventDefault(); if (!/^[1-9]\d{5}$/.test(v)) { setRes(null); return setErr('Enter a valid 6-digit PIN code') } setErr(''); setPin(v); const r = checkPin(v); setRes(r); onDone?.(r) }
  return <form onSubmit={go}>
    <div className="flex gap-2"><input value={v} onChange={e => setV(e.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" placeholder="Enter PIN code" aria-label="PIN code" className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm" /><button className="btn-primary !py-2">Check</button></div>
    {err && <p role="alert" className="mt-2 text-xs text-red-500">{err}</p>}
    {res && (res.ok ? <p className="mt-2 flex items-start gap-2 text-sm text-green-700"><CheckCircle2 size={16} className="mt-0.5 shrink-0" />Delivery in 1–2 days and home sample collection available in {res.city}.</p>
      : <p className="mt-2 flex items-start gap-2 text-sm text-amber-700"><XCircle size={16} className="mt-0.5 shrink-0" />We don't serve this PIN code yet.</p>)}
    </form>
}
