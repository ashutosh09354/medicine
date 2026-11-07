import { useState } from 'react'
import { Bell, Check, FileText, LockKeyhole, LogOut, Mail, MapPin, Phone, ShoppingBag, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

const tabs = [['Profile', UserRound], ['Addresses', MapPin], ['Settings', Bell]]
const emptyProfile = { name: '', email: '', phone: '' }

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('medcare-user') || 'null')
  } catch {
    return null
  }
}

export default function Account() {
  const [user, setUser] = useState(getStoredUser)
  const [login, setLogin] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [t, setT] = useState('Profile')
  const [p, setP] = useState(() => getStoredUser()?.profile || emptyProfile)
  const [saved, setSaved] = useState(false)
  const [n, setN] = useState(true)

  const signIn = event => {
    event.preventDefault()
    const email = login.email.trim().toLowerCase()
    if (!/^\S+@\S+\.\S+$/.test(email)) return setLoginError('Enter a valid email address')
    if (login.password.length < 6) return setLoginError('Password must be at least 6 characters')
    const nextProfile = { ...emptyProfile, email, name: email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, x => x.toUpperCase()) }
    const nextUser = { email, profile: nextProfile }
    localStorage.setItem('medcare-user', JSON.stringify(nextUser))
    setUser(nextUser)
    setP(nextProfile)
    setLoginError('')
  }

  const signOut = () => {
    localStorage.removeItem('medcare-user')
    setUser(null)
    setLogin({ email: '', password: '' })
    setP(emptyProfile)
    setT('Profile')
  }

  if (!user) return <main className="mx-auto grid min-h-[70vh] max-w-5xl place-items-center px-4 py-12"><section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="mb-7 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-primary/10 text-primary"><UserRound size={28} /></span><h1 className="mt-4 text-3xl font-bold">Welcome back</h1><p className="mt-2 text-sm text-muted">Sign in to manage your orders, appointments and health details.</p></div><form onSubmit={signIn} className="space-y-4"><label className="block text-sm font-semibold">Email address<input type="email" value={login.email} onChange={e => { setLogin(prev => ({ ...prev, email: e.target.value })); setLoginError('') }} autoComplete="email" placeholder="you@example.com" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-bg px-3 py-3 font-normal outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10" /></label><label className="block text-sm font-semibold">Password<input type="password" value={login.password} onChange={e => { setLogin(prev => ({ ...prev, password: e.target.value })); setLoginError('') }} autoComplete="current-password" placeholder="Enter your password" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-bg px-3 py-3 font-normal outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10" /></label>{loginError && <p role="alert" className="text-sm text-red-500">{loginError}</p>}<button className="btn-primary w-full"><LockKeyhole size={16} />Sign in</button></form><p className="mt-5 text-center text-xs text-muted">Your account is saved securely in this browser for this site.</p></section></main>

  const fields = [['name', 'Full name', UserRound, 'text'], ['email', 'Email address', Mail, 'email'], ['phone', 'Mobile number', Phone, 'tel']]
  return <main className="mx-auto max-w-5xl px-4 py-8 md:py-12"><div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-6 text-white shadow-xl shadow-primary/15 md:p-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Personal space</p><h1 className="mt-2 text-3xl font-bold md:text-4xl">My Account</h1><p className="mt-2 max-w-lg text-sm text-white/80">Manage your profile, orders and healthcare preferences in one place.</p></div><div className="flex h-20 w-20 shrink-0 items-center justify-center self-center rounded-3xl bg-white/15 ring-8 ring-white/10 sm:ml-auto sm:self-auto">{p.name ? <span className="text-3xl font-bold leading-none">{p.name.trim().charAt(0).toUpperCase()}</span> : <UserRound size={34} strokeWidth={1.8} className="shrink-0" />}</div></div></div>
    <div className="mt-6 grid gap-6 lg:grid-cols-[210px_1fr]"><aside className="card h-fit p-2"><div className="flex gap-2 overflow-x-auto lg:block">{tabs.map(([x, Icon]) => <button type="button" key={x} onClick={() => setT(x)} className={`flex w-full min-w-fit items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${t === x ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-muted hover:bg-primary/5 hover:text-primary'}`}><Icon size={17} />{x}</button>)}</div><div className="my-2 hidden border-t border-slate-100 lg:block" /><Link to="/orders" className="hidden items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted transition hover:bg-primary/5 hover:text-primary lg:flex"><ShoppingBag size={17} />Order history</Link><Link to="/records" className="hidden items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted transition hover:bg-primary/5 hover:text-primary lg:flex"><FileText size={17} />Health records</Link><button type="button" onClick={signOut} className="mt-2 hidden w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50 lg:flex"><LogOut size={17} />Sign out</button></aside>
      <section className="card min-h-[330px] p-5 sm:p-7">{t === 'Profile' && <><div className="border-b border-slate-100 pb-5"><h2 className="text-xl font-bold">Profile details</h2><p className="mt-1 text-sm text-muted">Keep your contact information up to date.</p></div><form onSubmit={e => { e.preventDefault(); const nextUser = { ...user, profile: p }; localStorage.setItem('medcare-user', JSON.stringify(nextUser)); setUser(nextUser); setSaved(true) }} className="mt-6 space-y-4">{fields.map(([k, label, Icon, type]) => <label key={k} className="block text-sm"><span className="font-semibold">{label}</span><span className="relative mt-1.5 block"><Icon size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" /><input type={type} value={p[k]} onChange={e => { setP(prev => ({ ...prev, [k]: e.target.value })); setSaved(false) }} className="w-full rounded-xl border border-slate-200 bg-bg py-3 pl-10 pr-3 outline-none transition hover:border-slate-300 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10" /></span></label>)}<div className="flex flex-wrap items-center gap-4 pt-2"><button className="btn-primary"><Check size={16} />Save changes</button>{saved && <span role="status" className="text-sm font-medium text-secondary">Profile saved</span>}</div></form></>}{t === 'Addresses' && <><div className="border-b border-slate-100 pb-5"><h2 className="text-xl font-bold">Saved addresses</h2><p className="mt-1 text-sm text-muted">Your delivery addresses for faster checkout.</p></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-primary/20 bg-primary/5 p-5"><div className="flex items-center gap-2 text-primary"><MapPin size={18} /><b>Home</b></div><p className="mt-3 text-sm leading-6 text-muted">12, Sample Street, Greater Noida, Uttar Pradesh 201306</p></div><div className="rounded-2xl border border-slate-200 p-5"><div className="flex items-center gap-2 text-ink"><MapPin size={18} /><b>Work</b></div><p className="mt-3 text-sm leading-6 text-muted">45, Business Park, Noida, Uttar Pradesh 201301</p></div></div></>}{t === 'Settings' && <><div className="border-b border-slate-100 pb-5"><h2 className="text-xl font-bold">Preferences</h2><p className="mt-1 text-sm text-muted">Choose how MedCare keeps you informed.</p></div><label className="mt-6 flex cursor-pointer items-center justify-between gap-5 rounded-2xl border border-slate-200 p-4 transition hover:border-primary/40"><span><span className="block font-semibold">Order and appointment notifications</span><span className="mt-1 block text-sm text-muted">Receive updates about your care and deliveries.</span></span><span className={`relative h-6 w-11 shrink-0 rounded-full transition ${n ? 'bg-primary' : 'bg-slate-300'}`}><input type="checkbox" checked={n} onChange={() => setN(!n)} className="sr-only" /><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${n ? 'left-6' : 'left-1'}`} /></span></label></>}</section></div>
  </main>
}
