import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, User, MapPin, Search, Home, Pill, FlaskConical, Video } from 'lucide-react'
import { useCart } from '../../store/cartStore'
import { useWishlist, usePin } from '../../store/listStores'
import PinCheck from './PinCheck'

const links = [['/', 'Home'], ['/medicines', 'Medicines'], ['/lab-tests', 'Lab Tests'], ['/doctors', 'Consultations'], ['/healthcare', 'Healthcare']]
const tabs = [['/', Home, 'Home'], ['/medicines', Pill, 'Medicines'], ['/lab-tests', FlaskConical, 'Lab Tests'], ['/doctors', Video, 'Consult'], ['/account', User, 'Account']]

export const Logo = () => <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary"><span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-white"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M8 2h4v6h6v4h-6v6H8v-6H2V8h6z" fill="currentColor" /></svg></span>MedCare</Link>

export default function Header() {
  const wc = useWishlist(s => s.ids.length)
  const count = useCart(s => s.items.reduce((a, i) => a + i.qty, 0))
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const pin = usePin(s => s.pin)
  const go = e => { e.preventDefault(); nav(`/medicines?q=${encodeURIComponent(q)}`) }

  return <>
    <div className="flex items-center justify-between gap-3 bg-ink px-4 py-1.5 text-xs text-white/90">
      <span><span className="sm:hidden">Free delivery on orders above ₹500</span><span className="hidden sm:inline">Free delivery on orders above ₹500 · Home sample collection for lab tests</span></span>
      <button type="button" onClick={() => setOpen(true)} className="flex shrink-0 items-center gap-1 text-white/90 transition hover:text-white"><MapPin size={14} className="text-secondary" />{pin ? `Deliver to ${pin}` : 'Set location'}</button>
    </div>
    <header className="sticky top-0 z-40 bg-surface/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Logo />
        <form onSubmit={go} className="relative flex-1 md:ml-auto md:max-w-lg"><Search size={16} className="absolute left-3 top-3 text-muted" /><input value={q} onChange={e => setQ(e.target.value)} aria-label="Search" placeholder="Search medicines" className="w-full border-b border-slate-300 bg-transparent py-2.5 pl-9 pr-4 text-sm outline-none focus:border-primary" /></form>
        <nav className="ml-auto hidden items-center gap-5 text-sm font-medium xl:flex">{links.map(([to, l]) => <NavLink key={to} to={to} end className={({ isActive }) => isActive ? 'text-primary' : 'text-muted hover:text-ink'}>{l}</NavLink>)}</nav>
        <Link to="/account" className="btn-primary hidden sm:inline-flex"><User size={16} />Login</Link>
        <Link to="/wishlist" className="relative hidden p-2 text-muted hover:text-primary sm:block" aria-label="Wishlist"><Heart size={20} />{wc > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-xs font-bold text-white">{wc}</span>}</Link>
        <Link to="/cart" className="relative p-2 text-muted hover:text-primary" aria-label="Cart"><ShoppingCart size={20} />{count > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-accent text-xs font-bold">{count}</span>}</Link>
      </div>
    </header>
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-slate-200 bg-surface py-1.5 xl:hidden">{tabs.map(([to, I, l]) => <NavLink key={to} to={to} end className={({ isActive }) => `flex flex-col items-center gap-0.5 py-1 text-[11px] ${isActive ? 'font-semibold text-primary' : 'text-muted'}`}><I size={20} />{l}</NavLink>)}</nav>
    {open && <div role="dialog" aria-modal="true" aria-label="Select PIN code" onClick={() => setOpen(false)} className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"><div onClick={e => e.stopPropagation()} className="card w-full max-w-sm p-5"><div className="mb-3 flex items-center justify-between"><h2 className="font-semibold">Check delivery area</h2><button type="button" onClick={() => setOpen(false)} className="text-sm text-muted">Close</button></div><PinCheck /></div></div>}
  </>
}
