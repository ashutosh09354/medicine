import { Apple, Dumbbell, Brain, ShieldCheck } from 'lucide-react'
export const hash = s => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h }
const PAL = [['#1769AA', '#E3F0FA'], ['#16A6A0', '#DFF5F3'], ['#E08A00', '#FFF1D6'], ['#6D4AE0', '#ECE8FF'], ['#D9455B', '#FDE7EA']]
export function ProductArt({ p }) {
  const [c, bg] = PAL[hash(p.name) % PAL.length], cat = p.category, n = p.name, label = n.split(' ')[0].slice(0, 10)
  const cross = (x, y) => <g fill={c}><rect x={x - 5} y={y - 12} width="10" height="24" rx="2" /><rect x={x - 12} y={y - 5} width="24" height="10" rx="2" /></g>
  const lbl = y => <text x="100" y={y} textAnchor="middle" fontSize="8" fontWeight="700" fill="#1E293B">{label}</text>
  let art
  if (/Vitamin|Supplement/.test(cat)) art = <><rect x="80" y="34" width="40" height="20" rx="5" fill="#1E293B" /><rect x="66" y="52" width="68" height="112" rx="14" fill={c} /><rect x="72" y="82" width="56" height="62" rx="6" fill="#fff" />{cross(100, 104)}{lbl(138)}</>
  else if (cat === 'Digestive') art = [-18, 0, 18].map((r, i) => <g key={i} transform={`rotate(${r} 100 164)`}><rect x="82" y="52" width="36" height="112" rx="4" fill={i === 1 ? c : '#fff'} stroke={c} strokeWidth="2" /><rect x="82" y="52" width="36" height="8" fill={c} opacity=".4" /></g>)
  else if (cat === 'Devices' && /BP/.test(n)) art = <><rect x="46" y="62" width="108" height="94" rx="14" fill="#fff" stroke={c} strokeWidth="3" /><rect x="60" y="74" width="80" height="44" rx="8" fill="#1E293B" /><text x="100" y="105" textAnchor="middle" fontSize="22" fontWeight="700" fill="#5EEAD4">120/80</text><circle cx="100" cy="138" r="8" fill={c} /></>
  else if (cat === 'Devices' && /Oximeter/.test(n)) art = <g transform="rotate(-20 100 100)"><rect x="52" y="70" width="96" height="62" rx="16" fill="#fff" stroke={c} strokeWidth="3" /><rect x="66" y="82" width="46" height="26" rx="5" fill="#1E293B" /><text x="89" y="102" textAnchor="middle" fontSize="16" fontWeight="700" fill="#5EEAD4">98</text><circle cx="130" cy="95" r="7" fill={c} /></g>
  else if (cat === 'Devices') art = <g transform="rotate(-35 100 100)"><rect x="86" y="26" width="28" height="136" rx="14" fill="#fff" stroke={c} strokeWidth="3" /><rect x="92" y="44" width="16" height="30" rx="4" fill="#1E293B" /><circle cx="100" cy="94" r="5" fill={c} /></g>
  else if (/Personal|Baby/.test(cat)) art = <><rect x="84" y="24" width="34" height="8" rx="4" fill="#1E293B" /><rect x="96" y="30" width="10" height="24" fill="#1E293B" /><rect x="68" y="54" width="64" height="110" rx="16" fill={c} /><rect x="74" y="86" width="52" height="56" rx="12" fill="#fff" />{lbl(118)}<circle cx="100" cy="132" r="4" fill={c} /></>
  else if (cat === 'Nutrition') art = <><rect x="42" y="66" width="116" height="18" rx="6" fill="#1E293B" /><rect x="46" y="82" width="108" height="84" rx="10" fill={c} /><rect x="56" y="96" width="88" height="54" rx="6" fill="#fff" />{lbl(126)}<rect x="76" y="132" width="48" height="6" rx="3" fill={bg} /></>
  else if (cat === 'Wellness') art = <><rect x="50" y="70" width="100" height="84" rx="12" fill={c} /><ellipse cx="50" cy="112" rx="16" ry="42" fill="#fff" opacity=".4" /><ellipse cx="50" cy="112" rx="9" ry="26" fill={bg} /><rect x="76" y="100" width="56" height="8" rx="4" fill="#fff" opacity=".5" /></>
  else art = <><rect x="44" y="64" width="84" height="100" rx="8" fill={c} /><rect x="44" y="64" width="84" height="22" rx="8" fill="#fff" opacity=".2" /><rect x="54" y="96" width="64" height="48" rx="6" fill="#fff" />{cross(86, 116)}
    <g transform="rotate(14 150 120)"><rect x="128" y="76" width="40" height="84" rx="6" fill="#fff" stroke={c} strokeWidth="2" />{[140, 156].flatMap(x => [0, 1, 2, 3].map(i => <circle key={x + '-' + i} cx={x} cy={92 + i * 17} r="6" fill={bg} stroke={c} />))}</g></>
  return <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label={n}><rect width="200" height="200" fill={bg} /><circle cx="165" cy="38" r="46" fill={c} opacity=".08" /><circle cx="30" cy="172" r="38" fill={c} opacity=".08" /><ellipse cx="100" cy="170" rx="54" ry="7" fill="#1E293B" opacity=".12" />{art}</svg>
}
const FEM = ['Ananya', 'Priya', 'Kavita']
export function DoctorPortrait({ name, round = true, className = '' }) {
  const h = hash(name), skin = ['#F1C9A5', '#E0A97F', '#C68A5E', '#A86B45'][h % 4], hair = ['#1E1B18', '#3B2A20', '#5A3A25'][(h >> 2) % 3], fem = FEM.some(f => name.includes(f)), bg = PAL[h % PAL.length][1], id = 'dp' + h
  return <svg viewBox="0 0 100 100" className={className} role="img" aria-label={name}>
    <defs><clipPath id={id}>{round ? <circle cx="50" cy="50" r="50" /> : <rect width="100" height="100" />}</clipPath></defs>
    <g clipPath={`url(#${id})`}><rect width="100" height="100" fill={bg} />
      {fem && <ellipse cx="50" cy="48" rx="25" ry="30" fill={hair} />}
      <path d="M8 100c0-22 14-32 42-32s42 10 42 32z" fill="#fff" /><path d="M40 70l10 15 10-15z" fill="#16A6A0" />
      <rect x="44" y="58" width="12" height="16" rx="5" fill={skin} /><ellipse cx="50" cy="44" rx="17" ry="20" fill={skin} />
      {fem ? <path d="M32 44c0-17 8-23 18-23s18 6 18 23c-4-9-10-13-18-13s-14 4-18 13z" fill={hair} /> : <path d="M33 42c-1-14 8-21 17-21s18 7 17 21c-3-6-6-9-9-10-6 3-14 3-20 0-3 1-4 5-5 10z" fill={hair} />}
      <circle cx="43.5" cy="45" r="1.6" fill="#1E293B" /><circle cx="56.5" cy="45" r="1.6" fill="#1E293B" /><path d="M44 53q6 5 12 0" stroke="#7A3E2B" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M36 72c-2 12 4 19 14 19s16-7 14-19" stroke="#1E293B" strokeWidth="2" fill="none" /><circle cx="50" cy="92" r="3" fill="#94A3B8" /></g></svg>
}
const BC = { Nutrition: [Apple, '#16A6A0', '#0E7C86'], Fitness: [Dumbbell, '#1769AA', '#0F4C81'], 'Mental Health': [Brain, '#6D4AE0', '#4C2FB3'], Prevention: [ShieldCheck, '#E08A00', '#B36B00'] }
export function BlogCover({ cat, className = '' }) {
  const [I, a, b] = BC[cat] || BC.Prevention
  return <div className={`relative grid place-items-center overflow-hidden ${className}`} style={{ background: a }}>
    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[24px] border-white/10" /><div className="absolute -bottom-16 -left-8 h-36 w-36 rounded-full border-[18px] border-white/10" />
    <div className="relative grid h-20 w-20 place-items-center border border-white/30 bg-white/10 text-white"><I size={36} strokeWidth={1.6} /></div></div>
}
