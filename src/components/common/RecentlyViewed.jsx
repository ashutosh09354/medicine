import { useRecents } from '../../store/listStores'
import { medicines } from '../../data'
import { products } from '../../data/extra'
import ProductCard from './ProductCard'
import Reveal from './Reveal'
export default function RecentlyViewed({ exclude }) {
  const ids = useRecents(s => s.ids), list = ids.filter(i => i !== exclude).map(i => [...medicines, ...products].find(p => p.id === i)).filter(Boolean)
  if (!list.length) return null
  return <Reveal className="mx-auto max-w-7xl px-4 pt-14"><h2 className="text-2xl font-bold">Recently Viewed</h2><span className="mt-2 block h-1 w-12 rounded-full bg-accent" />
    <div className="-mx-4 mt-6 flex snap-x gap-4 overflow-x-auto px-4 pb-3">{list.map(p => <div key={p.id} className="w-44 shrink-0 snap-start sm:w-52"><ProductCard p={p} /></div>)}</div></Reveal>
}
