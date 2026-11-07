export default function PageHeader({ title, sub }) {
  return <div className="border-b border-slate-200 pb-7 md:pb-9">
    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">MedCare</p>
    <h1 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h1>{sub && <p className="mt-2 max-w-xl text-muted">{sub}</p>}
  </div>
}
