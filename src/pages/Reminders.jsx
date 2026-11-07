import { useState } from 'react'
import { Trash2, Bell } from 'lucide-react'
import { useReminders } from '../store/reminderStore'
import { useToast } from '../store/toastStore'
export default function Reminders() {
  const { list, add, toggle, remove } = useReminders(), show = useToast(s => s.show), [f, setF] = useState({ name: '', time: '08:00', freq: 'Daily' }), [err, setErr] = useState('')
  const submit = e => { e.preventDefault(); if (f.name.trim().length < 2) return setErr('Enter a medicine name'); setErr(''); add({ ...f, name: f.name.trim() }); setF({ ...f, name: '' }); show('Reminder added') }
  return (<div className="mx-auto max-w-2xl px-4 py-8"><h1 className="flex items-center gap-2 text-3xl font-bold"><Bell className="text-secondary" />Medicine Reminders</h1>
    <p className="mt-1 text-sm text-muted">Set reminders to help you stay consistent with your treatment.</p>
    <form onSubmit={submit} className="card mt-5 grid gap-3 p-4 sm:grid-cols-4"><input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="Medicine name" aria-label="Medicine name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2" />
      <input type="time" value={f.time} onChange={e => setF({ ...f, time: e.target.value })} aria-label="Time" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
      <select value={f.freq} onChange={e => setF({ ...f, freq: e.target.value })} aria-label="Frequency" className="rounded-lg border border-slate-200 px-3 py-2 text-sm"><option>Daily</option><option>Twice daily</option><option>Weekly</option></select>
      <button className="btn-primary sm:col-span-4">Add Reminder</button>{err && <span role="alert" className="text-xs text-red-500 sm:col-span-4">{err}</span>}</form>
    {list.length ? <ul className="mt-5 space-y-2">{list.map(r => <li key={r.id} className="card flex items-center gap-3 p-3"><input type="checkbox" checked={r.done} onChange={() => toggle(r.id)} aria-label="Taken" />
      <div className={`flex-1 ${r.done ? 'text-muted line-through' : ''}`}><p className="font-medium">{r.name}</p><p className="text-xs text-muted">{r.time} · {r.freq}</p></div><button onClick={() => remove(r.id)} aria-label="Delete" className="text-red-500"><Trash2 size={16} /></button></li>)}</ul> : <p className="mt-10 text-center text-muted">No reminders yet.</p>}
  </div>)
}
