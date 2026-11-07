import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { useToast } from '../../store/toastStore'

const cols = { Services: [['/medicines', 'Medicines'], ['/lab-tests', 'Lab Tests'], ['/doctors', 'Doctor Consultation'], ['/healthcare', 'Healthcare']], Tools: [['/reminders', 'Medicine Reminders'], ['/bmi', 'BMI Calculator'], ['/upload-prescription', 'Upload Prescription'], ['/orders', 'My Orders'], ['/wishlist', 'Wishlist'], ['/records', 'Health Records']], Legal: [['/', 'About Us'], ['/', 'Contact Us'], ['/', 'Privacy Policy'], ['/', 'Terms and Conditions'], ['/', 'Refund & Cancellation']] }
const social = [['Facebook', 'f', 'https://facebook.com'], ['X', 'X', 'https://x.com'], ['Instagram', 'in', 'https://instagram.com'], ['LinkedIn', 'li', 'https://linkedin.com']]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [err, setErr] = useState('')
  const show = useToast(s => s.show)
  const sub = e => { e.preventDefault(); if (!/^\S+@\S+\.\S+$/.test(email)) return setErr('Enter a valid email'); setErr(''); setEmail(''); show('Subscription confirmed') }

  return <footer className="mt-20 bg-ink text-slate-300">
    <div className="mx-auto max-w-7xl px-4 pt-10"><div className="flex flex-col gap-4 border-b border-white/10 pb-8 text-white md:flex-row md:items-center md:justify-between"><div><h2 className="text-2xl font-bold">Stay on top of your health</h2><p className="text-sm text-white/70">Get health tips and updates in your inbox.</p></div><form onSubmit={sub} className="w-full md:max-w-sm"><div className="flex gap-2 border-b border-white/30 py-1.5"><input value={email} onChange={e => setEmail(e.target.value)} aria-label="Email" placeholder="you@example.com" className="min-w-0 flex-1 bg-transparent px-1 text-sm text-white outline-none placeholder:text-white/50" /><button className="text-sm font-semibold text-secondary hover:text-white">Subscribe</button></div>{err && <p role="alert" className="mt-1 text-xs">{err}</p>}</form></div></div>
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-5"><div className="md:col-span-2"><p className="text-2xl font-bold text-white">MedCare</p><p className="mt-2 max-w-xs text-sm">Your Health, Our Priority. Medicines, lab tests and doctor consultations in one place.</p><Link to="/blogs" className="mt-5 inline-flex items-center gap-2 border-b border-secondary pb-1 text-sm font-semibold text-white transition hover:text-secondary">Read our health blog <ArrowRight size={15} /></Link><ul className="mt-5 space-y-2 text-sm"><li className="flex items-center gap-2"><Phone size={15} className="text-secondary" />+91 00000 00000</li><li className="flex items-center gap-2"><Mail size={15} className="text-secondary" />support@medcare.example</li><li className="flex items-center gap-2"><MapPin size={15} className="text-secondary" />Uttar Pradesh, India</li></ul><div className="mt-4 flex gap-2">{social.map(([n, s, u]) => <a key={n} href={u} target="_blank" rel="noreferrer" aria-label={n} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xs font-bold text-white transition hover:bg-secondary">{s}</a>)}</div></div>{Object.entries(cols).map(([h, ls]) => <div key={h}><p className="mb-3 font-semibold text-white">{h}</p><ul className="space-y-2 text-sm">{ls.map(([to, l]) => <li key={l}><Link to={to} className="transition hover:text-white">{l}</Link></li>)}</ul></div>)}</div>
    <p className="border-t border-white/10 py-4 text-center text-xs">MedCare · Your trusted partner for everyday healthcare.</p>
  </footer>
}
