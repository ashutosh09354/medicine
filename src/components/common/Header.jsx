import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, User, MapPin, Search, Stethoscope } from 'lucide-react'
import { useCart } from '../../store/cartStore'
const links = [['/', 'Home'], ['/medicines', 'Medicines'], ['/lab-tests', 'Lab Tests'], ['/doctors', 'Consultations'], ['/blogs', 'Blogs']]
export default function Header() {
  const count = useCart(s => s.items.reduce((a, i) => a + i.qty, 0))
  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary"><Stethoscope className="text-secondary" />MedCare</Link>
        <button className="hidden items-center gap-1 text-sm text-muted md:flex"><MapPin size={16} />Select PIN code</button>
        <div className="relative ml-auto hidden max-w-md flex-1 md:block">
          <Search size={16} className="absolute left-3 top-3 text-muted" />
          <input placeholder="Search medicines & healthcare" className="w-full rounded-full bg-bg py-2.5 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <nav className="hidden items-center gap-5 text-sm font-medium lg:flex">
          {links.map(([to, l]) => <NavLink key={to} to={to} end className={({ isActive }) => isActive ? 'text-primary' : 'text-muted hover:text-ink'}>{l}</NavLink>)}
        </nav>
        <Link to="/account" className="btn-primary ml-auto md:ml-0"><User size={16} /><span className="hidden sm:inline">Login</span></Link>
        <Link to="/cart" className="relative p-2" aria-label="Cart"><ShoppingCart />
          {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-xs font-bold">{count}</span>}
        </Link>
      </div>
      <nav className="flex justify-around border-t border-slate-100 py-2 text-xs lg:hidden">
        {links.map(([to, l]) => <NavLink key={to} to={to} end className={({ isActive }) => isActive ? 'font-semibold text-primary' : 'text-muted'}>{l}</NavLink>)}
      </nav>
    </header>
  )
}
