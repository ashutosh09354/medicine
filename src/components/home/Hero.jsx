import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Search, Upload } from 'lucide-react'

export default function Hero() {
  return <section className="border-b border-slate-200 bg-[#eaf3f8]">
    <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:py-16 lg:py-20">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">EVERYDAY HEALTHCARE, MADE EASIER</p>
        <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">Care that fits into your day.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">Order medicines, arrange lab tests and connect with qualified doctors through one simple service.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/medicines" className="btn-primary">Explore Services <ArrowRight size={16} /></Link>
          <Link to="/upload-prescription" className="btn border border-slate-300 bg-white text-ink hover:border-primary hover:text-primary"><Upload size={16} />Upload Prescription</Link>
        </div>
        <form action="/medicines" className="mx-auto mt-7 flex w-full max-w-xl items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-1.5 text-left shadow-sm transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
          <Search size={18} className="shrink-0 text-muted" />
          <input name="q" aria-label="Search medicines" placeholder="Search medicines, health products or tests" className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-slate-400" />
          <button type="submit" className="hidden text-sm font-semibold text-primary hover:text-primary-dark sm:block">Search</button>
        </form>
      </motion.div>
    </div>
  </section>
}
