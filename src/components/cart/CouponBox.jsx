import { useState } from 'react'
import { Tag, X } from 'lucide-react'
import { useCart } from '../../store/cartStore'
import { useToast } from '../../store/toastStore'
import { COUPONS, totals } from '../../utils/pricing'
export default function CouponBox() {
  const { items, coupon, setCoupon } = useCart(), show = useToast(s => s.show), [v, setV] = useState('')
  const apply = () => { const c = v.trim().toUpperCase(), d = COUPONS[c]
    if (!d) return show('Invalid coupon code')
    if (d.min && totals(items, '').sub < d.min) return show(`Add items worth ₹${d.min} to use ${c}`)
    setCoupon(c); setV(''); show(`${c} applied`) }
  return <div className="rounded-xl bg-bg p-3">
    {coupon ? <div className="flex items-center justify-between text-sm"><span className="flex items-center gap-2 font-medium text-secondary"><Tag size={15} />{coupon} · {COUPONS[coupon].label}</span><button type="button" onClick={() => setCoupon('')} aria-label="Remove coupon"><X size={16} /></button></div>
      : <><div className="flex gap-2"><input value={v} onChange={e => setV(e.target.value)} placeholder="Coupon code" aria-label="Coupon code" className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm uppercase" /><button type="button" onClick={apply} className="btn-primary !py-2">Apply</button></div>
        <p className="mt-2 text-xs text-muted">Try WELCOME10, HEALTH50 or FREESHIP</p></>}
  </div>
}
