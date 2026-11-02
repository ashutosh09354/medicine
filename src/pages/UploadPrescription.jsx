import { useRef, useState, useEffect } from 'react'
import { UploadCloud, X, FileText, CheckCircle2 } from 'lucide-react'
const OK = ['image/jpeg', 'image/png', 'application/pdf']
export default function UploadPrescription() {
  const [file, setFile] = useState(null), [err, setErr] = useState(''), [drag, setDrag] = useState(false), [done, setDone] = useState(false), [url, setUrl] = useState(''), ref = useRef()
  useEffect(() => { if (file?.type.startsWith('image/')) { const u = URL.createObjectURL(file); setUrl(u); return () => URL.revokeObjectURL(u) } setUrl('') }, [file])
  const pick = f => { if (!f) return; if (!OK.includes(f.type)) return setErr('Please choose a JPG, PNG or PDF file.'); if (f.size > 5 * 1024 * 1024) return setErr('File must be under 5 MB.'); setErr(''); setFile(f) }
  if (done) return <div className="mx-auto max-w-md px-4 py-16 text-center"><CheckCircle2 size={56} className="mx-auto text-secondary" /><h1 className="mt-4 text-2xl font-bold">Prescription received</h1><p className="mt-2 text-sm text-muted">Demo only: the file was not uploaded anywhere and has not been reviewed.</p></div>
  return (
    <div className="mx-auto max-w-2xl px-4 py-8"><h1 className="text-3xl font-bold">Upload Prescription</h1>
      <div onDragOver={e => { e.preventDefault(); setDrag(true) }} onDragLeave={() => setDrag(false)} onDrop={e => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files[0]) }}
        className={`mt-6 rounded-2xl border-2 border-dashed p-10 text-center ${drag ? 'border-primary bg-primary/5' : 'border-slate-300 bg-surface'}`}>
        <UploadCloud className="mx-auto text-primary" size={40} /><p className="mt-2 font-medium">Drag and drop your prescription here</p>
        <button type="button" onClick={() => ref.current.click()} className="btn-primary mt-3">Choose file</button>
        <input ref={ref} type="file" accept=".jpg,.jpeg,.png,.pdf" hidden onChange={e => pick(e.target.files[0])} /></div>
      {err && <p role="alert" className="mt-3 text-sm text-red-500">{err}</p>}
      {file && <div className="card mt-4 flex items-center gap-3 p-3">{url ? <img src={url} alt="Preview" className="h-16 w-16 rounded object-cover" /> : <FileText className="text-primary" size={32} />}
        <div className="flex-1 text-sm"><p className="font-medium">{file.name}</p><p className="text-muted">{(file.size / 1024).toFixed(0)} KB</p></div>
        <button onClick={() => setFile(null)} aria-label="Remove file"><X /></button></div>}
      <ul className="mt-6 list-disc space-y-1 pl-5 text-sm text-muted"><li>JPG, PNG or PDF, up to 5 MB.</li><li>Make sure the doctor's name, date and medicines are clearly visible.</li></ul>
      <button onClick={() => file ? setDone(true) : setErr('Please select a file first.')} className="btn-primary mt-6 w-full">Submit</button></div>)
}
