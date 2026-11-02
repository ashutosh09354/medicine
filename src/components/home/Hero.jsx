import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Upload, ArrowRight, MapPin, Search } from 'lucide-react'
const stats = [['985+', 'Collection points'], ['1M+', 'Reports delivered'], ['150+', 'Expert specialists']]
export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-dark via-primary to-secondary text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">Your Health,<br />Our Priority.</h1>
          <p className="mt-4 max-w-md text-white/85">Medicines, lab tests and doctor consultations, all in one place.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/medicines" className="btn bg-accent text-ink hover:brightness-95">Explore Services <ArrowRight size={16} /></Link>
            <Link to="/upload-prescription" className="btn-ghost"><Upload size={16} />Upload Prescription</Link>
          </div>
          <div className="mt-8 flex flex-col gap-2 rounded-2xl bg-white p-2 text-ink sm:flex-row">
            <label className="flex flex-1 items-center gap-2 px-3 py-2 text-sm"><Search size={16} className="text-muted" /><input placeholder="Search tests or specialty" className="w-full outline-none" /></label>
            <label className="flex flex-1 items-center gap-2 px-3 py-2 text-sm sm:border-l sm:border-slate-100"><MapPin size={16} className="text-muted" /><input placeholder="Choose city" className="w-full outline-none" /></label>
            <Link to="/lab-tests" className="btn-primary">Search Now</Link>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {stats.map(([n, l]) => <div key={l} className="rounded-xl bg-white/10 p-3"><p className="text-xl font-bold">{n}</p><p className="text-xs text-white/80">{l}</p></div>)}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .2, duration: .6 }} className="relative mx-auto w-full max-w-sm pb-8">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/20">
            <img src="/hero.jpg" alt="Laboratory technician" loading="lazy" onError={e => { e.currentTarget.style.display = 'none' }} className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-4 right-4 rounded-2xl bg-white p-4 text-ink shadow-xl">
            <p className="font-semibold">Full Body Checkup</p>
            <span className="mt-1 inline-block rounded bg-secondary/10 px-2 py-0.5 text-xs text-secondary">Includes 85 parameters</span>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <p className="font-bold">₹1,499 <span className="text-xs font-normal text-muted line-through">₹2,199</span></p>
              <Link to="/lab-tests" className="btn-primary !py-1.5">Book now</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
