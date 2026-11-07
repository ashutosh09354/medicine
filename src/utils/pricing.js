export const COUPONS = {
  WELCOME10: { label: '10% off your order', calc: s => Math.round(s * 0.1) },
  HEALTH50: { label: '₹50 off orders above ₹499', min: 499, calc: () => 50 },
  FREESHIP: { label: 'Free delivery', ship: true, calc: () => 0 },
}
export function totals(items, code) {
  const sub = items.reduce((a, i) => a + i.price * i.qty, 0), c = COUPONS[code], ok = !!c && (!c.min || sub >= c.min)
  const disc = ok ? c.calc(sub) : 0, base = sub && sub < 500 ? 40 : 0, ship = ok && c.ship ? 0 : base
  return { sub, disc, ship, total: Math.max(0, sub - disc + ship), applied: ok }
}
