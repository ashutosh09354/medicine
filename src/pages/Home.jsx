import { Link } from 'react-router-dom'
import Hero from '../components/home/Hero'
import ProductCard from '../components/common/ProductCard'
import { medicines, labTests, services } from '../data'
export default function Home() {
  return (<>
    <Hero />
    <section className="mx-auto max-w-7xl px-4 pt-14">
      <h2 className="text-2xl font-bold">Healthcare Services</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {services.map(s => <Link key={s.to} to={s.to} className="card group p-5 transition hover:-translate-y-1 hover:bg-primary hover:text-white">
          <p className="font-semibold">{s.title}</p><p className="mt-1 text-sm text-muted group-hover:text-white/80">{s.text}</p></Link>)}
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 pt-14">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Popular Medicines</h2><Link to="/medicines" className="text-sm font-semibold text-primary">View All</Link></div>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">{medicines.map(p => <ProductCard key={p.id} p={p} />)}</div>
    </section>
    <section className="mx-auto max-w-7xl px-4 pt-14">
      <h2 className="text-2xl font-bold">Popular Lab Tests</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {labTests.map(t => <div key={t.id} className="card p-5"><p className="font-semibold">{t.name}</p><p className="text-sm text-muted">{t.params} parameters · Home sample collection</p>
          <p className="mt-3 font-bold">₹{t.price} <s className="text-xs font-normal text-muted">₹{t.mrp}</s></p><Link to="/lab-tests" className="btn-primary mt-3 w-full">Book Now</Link></div>)}
      </div>
    </section>
  </>)
}
