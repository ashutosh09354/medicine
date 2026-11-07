import { useToast } from '../../store/toastStore'
export default function Toaster() {
  const toasts = useToast(s => s.toasts)
  return <div aria-live="polite" className="fixed bottom-20 xl:bottom-4 left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2">{toasts.map(t => <div key={t.id} className="rounded-full bg-ink px-5 py-2.5 text-sm text-white shadow-lg">{t.msg}</div>)}</div>
}
