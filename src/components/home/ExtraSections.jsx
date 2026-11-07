import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Clock, ShieldCheck, CalendarCheck, Headphones, Truck, Video, Bell, Calculator, Smartphone, FileText } from 'lucide-react'
import { BlogCover } from '../common/Art'
import { blogs } from '../../data/extra'

const why = [[Truck, 'Convenient Access', 'Order, book and consult from one place.'], [ShieldCheck, 'Secure Experience', 'Your health information is handled with care.'], [CalendarCheck, 'Easy Booking', 'Pick a slot in a few taps.'], [Headphones, 'Customer Support', 'Help available when you need it.'], [Clock, 'Save Time', 'Skip the queues and travel.']]
const tools = [[Video, 'Video Consultation', 'Meet a doctor face to face online.', '/doctors'], [Bell, 'Medicine Reminders', 'Never miss a dose.', '/reminders'], [Calculator, 'BMI Calculator', 'Quick health screening figure.', '/bmi'], [FileText, 'Health Records', 'Keep reports in one place.', '/records']]
const blogImages = {
  'understanding-your-blood-test': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=85',
  'eating-for-better-sleep': 'https://images.unsplash.com/photo-1686828752370-c0398d724e82?auto=format&fit=crop&w=900&q=85',
  'walking-for-heart-health': 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=85',
}

function BlogImage({ blog }) {
  const [failed, setFailed] = useState(false)
  return blogImages[blog.slug] && !failed
    ? <img src={blogImages[blog.slug]} alt={blog.title} loading="lazy" onError={() => setFailed(true)} className="mb-3 h-32 w-full rounded-xl object-cover" />
    : <BlogCover cat={blog.category} className="mb-3 h-32 rounded-xl" />
}

export function Tools() {
  return <section className="mx-auto max-w-7xl px-4 pt-14"><h2 className="text-2xl font-bold">Health Tools</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{tools.map(([I, t, d, to]) => <Link key={t} to={to} className="card flex items-start gap-3 p-5 transition hover:-translate-y-1 hover:shadow-md"><span className="rounded-xl bg-secondary/10 p-2 text-secondary"><I /></span><span><b className="block">{t}</b><span className="text-sm text-muted">{d}</span></span></Link>)}</div></section>
}
export function WhyUs() {
  return <section className="mx-auto max-w-7xl px-4 pt-14"><h2 className="text-2xl font-bold">Why Choose Us</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{why.map(([I, t, d]) => <div key={t} className="card p-5"><I className="text-primary" /><p className="mt-3 font-semibold">{t}</p><p className="mt-1 text-sm text-muted">{d}</p></div>)}</div></section>
}
export function BlogStrip() {
  return <section className="mx-auto max-w-7xl px-4 pt-14"><div className="flex justify-between"><h2 className="text-2xl font-bold">From Our Blog</h2><Link to="/blogs" className="text-sm font-semibold text-primary">View All</Link></div><div className="mt-6 grid gap-4 sm:grid-cols-3">{blogs.slice(0, 3).map(b => <Link key={b.slug} to={`/blogs/${b.slug}`} className="card p-5 transition hover:-translate-y-1 hover:shadow-md"><BlogImage blog={b} /><p className="text-xs font-semibold text-secondary">{b.category}</p><h3 className="mt-1 font-semibold">{b.title}</h3><p className="mt-1 text-sm text-muted">{b.excerpt}</p><span className="mt-3 inline-block text-sm font-semibold text-primary">Read More</span></Link>)}</div></section>
}
export function AppPromo() {
  return <section className="mx-auto mt-14 max-w-7xl px-4"><div className="flex flex-col items-center gap-6 bg-ink p-8 text-white md:flex-row"><Smartphone size={64} className="text-secondary" /><div className="flex-1 text-center md:text-left"><h2 className="text-2xl font-bold">Healthcare wherever you are</h2><p className="mt-1 text-white/70">Manage medicines, appointments and health records in one place.</p></div><div className="flex gap-3 text-sm text-white/70"><span>Easy access</span><span>•</span><span>Personal care</span></div></div></section>
}
