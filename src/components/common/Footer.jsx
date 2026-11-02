import { Link } from 'react-router-dom'
const cols = { Services: [['/medicines', 'Medicines'], ['/lab-tests', 'Lab Tests'], ['/doctors', 'Doctor Consultation'], ['/healthcare', 'Healthcare'], ['/blogs', 'Health Blogs']], Company: [['/', 'About Us'], ['/', 'Contact Us']], Legal: [['/', 'Privacy Policy'], ['/', 'Terms and Conditions'], ['/', 'Refund & Cancellation']] }
export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div><p className="text-xl font-bold text-white">MedCare</p><p className="mt-2 text-sm">Your Health, Our Priority.</p></div>
        {Object.entries(cols).map(([h, ls]) => <div key={h}><p className="mb-3 font-semibold text-white">{h}</p>
          <ul className="space-y-2 text-sm">{ls.map(([to, l]) => <li key={l}><Link to={to} className="hover:text-white">{l}</Link></li>)}</ul></div>)}
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs">© 2026 MedCare. Demo project with sample data.</p>
    </footer>
  )
}
