import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Pill, FlaskConical, Stethoscope, HeartPulse, BookOpen, Thermometer, Sparkles, Droplets, Wind, ShieldCheck, Activity, Home as HomeIcon, Truck, Video, Bell, Upload, ArrowRight, ClipboardList, CalendarCheck, PackageCheck } from 'lucide-react'
import RecentlyViewed from '../components/common/RecentlyViewed'
import Hero from '../components/home/Hero'
import Reveal from '../components/common/Reveal'
import Avatar from '../components/common/Avatar'
import ProductCard from '../components/common/ProductCard'
import { Tools, WhyUs, BlogStrip } from '../components/home/ExtraSections'
import { medicines } from '../data'
import { tests, doctors } from '../data/care'
const trust = [[HomeIcon, 'Home sample collection', 'Book tests from home'], [Truck, 'Free delivery above ₹500', 'On medicine orders'], [Video, 'Video consultation', 'Talk to doctors online'], [Bell, 'Medicine reminders', 'Stay on schedule']]
const cats = [[Thermometer, 'Fever & Pain', '#E5586B'], [Sparkles, 'Vitamins', '#E08A00'], [Droplets, 'Digestive', '#16A6A0'], [Wind, 'Allergy', '#6D4AE0'], [ShieldCheck, 'Antibiotics', '#1769AA'], [Activity, 'Devices', '#0E7C86']]
const services = [[Pill, 'Medicines', 'Genuine medicines at your door', '/medicines', '#1769AA'], [FlaskConical, 'Lab Tests', 'Packages with home pickup', '/lab-tests', '#16A6A0'], [Stethoscope, 'Doctor Consultation', 'Video or in-person slots', '/doctors', '#6D4AE0'], [HeartPulse, 'Healthcare Products', 'Wellness essentials', '/healthcare', '#E5586B'], [BookOpen, 'Health Blogs', 'Reads for everyday health', '/blogs', '#E08A00']]
const steps = [[ClipboardList, 'Choose', 'Pick medicines, a lab test or a doctor.'], [CalendarCheck, 'Book', 'Select a slot or add to cart in a few taps.'], [PackageCheck, 'Receive', 'Get delivery, home pickup or a video call.']]
const labImages = {
  t1: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=85',
  t2: 'https://www.hoxworth.org/content/hoxworth/lab-services/components/_jcr_content/main/image.img.jpeg/1552328856518/bloodvials.jpeg',
  t3: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=85',
  t4: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202212/lab-3498584_960_720-one_one.jpg?VersionId=.Dl3AL._x_9entIQxwL2JnTMpORWPIwE',
}
const Head = ({ t, to, sub }) => <div className="flex items-end justify-between"><div><h2 className="text-2xl font-bold md:text-3xl">{t}</h2><span className="mt-2 block h-1 w-12 rounded-full bg-accent" />{sub && <p className="mt-1 text-sm text-muted">{sub}</p>}</div>{to && <Link to={to} className="flex items-center gap-1 text-sm font-semibold text-primary">View All <ArrowRight size={14} /></Link>}</div>
export default function Home() {
  const [failedLabImages, setFailedLabImages] = useState({})
  return (<>
    <Hero />
    <div className="mx-auto -mt-6 grid max-w-7xl grid-cols-2 gap-3 px-4 lg:grid-cols-4">{trust.map(([I, t, d]) => <div key={t} className="card relative z-10 flex items-center gap-3 p-4 shadow-md"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary/10 text-secondary"><I size={20} /></span><span className="text-sm"><b className="block leading-tight">{t}</b><span className="text-xs text-muted">{d}</span></span></div>)}</div>
    <Reveal className="mx-auto max-w-7xl px-4 pt-14"><Head t="Shop by Category" />
      <div className="mt-6 grid grid-cols-3 gap-3 md:grid-cols-6">{cats.map(([I, l, c]) => <Link key={l} to={`/medicines?cat=${encodeURIComponent(l)}`} className="card flex flex-col items-center gap-2 p-4 text-center text-sm font-medium transition hover:-translate-y-1 hover:shadow-md"><span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: c + '1A', color: c }}><I /></span>{l}</Link>)}</div></Reveal>
    <Reveal className="mx-auto max-w-7xl px-4 pt-14"><Head t="Our Services" sub="Everything you need for your health in one place" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{services.map(([I, t, d, to, c]) => <Link key={to} to={to} className="card group p-5 transition hover:-translate-y-1 hover:shadow-lg"><span className="grid h-12 w-12 place-items-center rounded-2xl text-white transition group-hover:scale-110" style={{ background: c }}><I /></span><p className="mt-4 font-semibold">{t}</p><p className="mt-1 text-sm text-muted">{d}</p></Link>)}</div></Reveal>
    <Reveal className="mx-auto max-w-7xl px-4 pt-14"><Head t="Popular Medicines" to="/medicines" />
      <div className="-mx-4 mt-6 flex snap-x gap-4 overflow-x-auto px-4 pb-3">{medicines.map(p => <div key={p.id} className="w-44 shrink-0 snap-start sm:w-52"><ProductCard p={p} /></div>)}</div></Reveal>
    <Reveal className="mx-auto grid max-w-7xl gap-4 px-4 pt-14 md:grid-cols-2">
      <Link to="/upload-prescription" className="flex items-center gap-4 rounded-3xl bg-gradient-to-r from-primary to-primary-dark p-6 text-white"><Upload size={44} /><span><b className="block text-xl">Have a prescription?</b><span className="text-sm text-white/80">Upload it and order in minutes.</span></span><ArrowRight className="ml-auto" /></Link>
      <Link to="/lab-tests/t1" className="flex items-center gap-4 rounded-3xl bg-gradient-to-r from-secondary to-[#0E7C86] p-6 text-white"><FlaskConical size={44} /><span><b className="block text-xl">Full Body Checkup</b><span className="text-sm text-white/80">85 parameters from ₹1,499.</span></span><ArrowRight className="ml-auto" /></Link></Reveal>
    <Reveal className="mx-auto max-w-7xl px-4 pt-14"><Head t="Popular Lab Tests" to="/lab-tests" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{tests.slice(0, 4).map(t => <Link key={t.id} to={`/lab-tests/${t.id}`} className="card group overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"><div className="relative h-32 overflow-hidden bg-slate-100">{labImages[t.id] && !failedLabImages[t.id] ? <img src={labImages[t.id]} alt={`${t.name} laboratory testing`} loading="lazy" onError={() => setFailedLabImages(prev => ({ ...prev, [t.id]: true }))} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" /> : <div className="grid h-full place-items-center text-secondary"><FlaskConical size={36} /></div>}</div>
        <div className="p-4"><p className="font-semibold">{t.name}</p><p className="text-xs text-muted">{t.params} parameters · Reports in {t.report}</p><p className="mt-2 font-bold">₹{t.price} <s className="text-xs font-normal text-muted">₹{t.mrp}</s></p></div></Link>)}</div></Reveal>
    <Reveal className="mx-auto max-w-7xl px-4 pt-14"><Head t="Consult a Doctor" to="/doctors" sub="Book a slot or start a video consultation" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{doctors.slice(0, 4).map(d => <div key={d.id} className="card p-5 text-center transition hover:-translate-y-1 hover:shadow-lg"><Avatar name={d.name} size="mx-auto h-24 w-24" /><p className="mt-3 font-semibold">{d.name}</p><p className="text-sm text-secondary">{d.specialty}</p><p className="text-xs text-muted">{d.exp} yrs · ₹{d.fee}</p>
        <Link to={`/doctors/${d.id}`} className="btn-primary mt-3 w-full">View Profile</Link></div>)}</div></Reveal>
    <Reveal className="mx-auto max-w-7xl px-4 pt-14"><Head t="How It Works" />
      <div className="mt-6 grid gap-4 md:grid-cols-3">{steps.map(([I, t, d], i) => <div key={t} className="card flex gap-4 p-5"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-white"><I /></span><span><b>{i + 1}. {t}</b><span className="mt-1 block text-sm text-muted">{d}</span></span></div>)}</div></Reveal>
    <RecentlyViewed /><Tools /><WhyUs /><BlogStrip />
  </>)
}
