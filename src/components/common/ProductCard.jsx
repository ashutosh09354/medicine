import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart } from 'lucide-react'
import { useWishlist } from '../../store/listStores'
import { useCart } from '../../store/cartStore'
import { useToast } from '../../store/toastStore'
import { ProductArt } from './Art'
export default function ProductCard({ p, to }) {
  const { ids, toggle } = useWishlist(), saved = ids.includes(p.id), link = to || (p.id.startsWith('h') ? `/healthcare/${p.id}` : `/medicines/${p.id}`), add = useCart(s => s.add), show = useToast(s => s.show), off = Math.round((1 - p.price / p.mrp) * 100), [imageFailed, setImageFailed] = useState(false)
  const images = { m1: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=85', m2: 'https://images.unsplash.com/photo-1668453569370-789848f41ebe?auto=format&fit=crop&w=800&q=85', m3: 'https://images.apollo247.in/pub/media/catalog/product/E/L/ELE0001_1_1.jpg?tr=q-85', m4: 'https://images.unsplash.com/photo-1573883429746-084be9b5cfca?auto=format&fit=crop&w=800&q=85', m5: 'https://images.unsplash.com/photo-1655913198016-b7a20b9bdd48?auto=format&fit=crop&w=800&q=85', m6: 'https://images.unsplash.com/photo-1609725236589-d987ffc8133a?auto=format&fit=crop&w=800&q=85' }
  const image = images[p.id]
  return (
    <div className="card group relative flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={link} className="relative block aspect-square overflow-hidden">
        <div className="h-full w-full bg-slate-50 transition duration-500 group-hover:scale-105">{image && !imageFailed ? <img src={image} alt={p.name} loading="lazy" onError={() => setImageFailed(true)} className="h-full w-full object-cover" /> : <ProductArt p={p} />}</div>
        <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-ink">{off}% OFF</span>
        {p.rx && <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-amber-700">Rx required</span>}
      </Link>
      <button onClick={() => toggle(p.id)} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'} className="absolute right-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow"><Heart size={16} className={saved ? 'fill-red-500 text-red-500' : 'text-muted'} /></button>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-secondary">{p.category}</p>
        <Link to={link} className="mt-0.5 line-clamp-2 min-h-10 text-sm font-medium hover:text-primary">{p.name}</Link>
        <div className="mt-2 flex items-baseline gap-2"><b className="text-lg text-primary">₹{p.price}</b><s className="text-xs text-muted">₹{p.mrp}</s></div>
        <button onClick={() => { add(p); show('Added to cart') }} className="btn-primary mt-3 w-full"><ShoppingCart size={15} />Add to Cart</button>
      </div>
    </div>)
}
