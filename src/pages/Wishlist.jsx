import { Link } from 'react-router-dom'
import ProductCard from '../components/common/ProductCard'
import PageHeader from '../components/common/PageHeader'
import { useWishlist } from '../store/listStores'
import { medicines } from '../data'
import { products } from '../data/extra'
export default function Wishlist() {
  const ids = useWishlist(s => s.ids), list = [...medicines, ...products].filter(p => ids.includes(p.id))
  return <div className="mx-auto max-w-7xl px-4 py-8"><PageHeader title="My Wishlist" sub="Products you've saved for later" />
    {list.length ? <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">{list.map(p => <ProductCard key={p.id} p={p} />)}</div>
      : <div className="py-16 text-center"><p className="text-muted">Nothing saved yet. Tap the heart on any product.</p><Link to="/medicines" className="btn-primary mt-4">Browse Medicines</Link></div>}</div>
}
