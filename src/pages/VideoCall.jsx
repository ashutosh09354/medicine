import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Mic, MicOff, Video, VideoOff, PhoneOff, Send } from 'lucide-react'
import Avatar from '../components/common/Avatar'
import { doctors } from '../data/care'
export default function VideoCall() {
  const d = doctors.find(x => x.id === useParams().id), vid = useRef(), stream = useRef()
  const [joined, setJoined] = useState(false), [ended, setEnded] = useState(false), [mic, setMic] = useState(true), [cam, setCam] = useState(true)
  const [sec, setSec] = useState(0), [err, setErr] = useState(''), [msgs, setMsgs] = useState([]), [txt, setTxt] = useState('')
  const stop = () => stream.current?.getTracks().forEach(t => t.stop())
  useEffect(() => stop, [])
  useEffect(() => { if (!joined || ended) return; const i = setInterval(() => setSec(s => s + 1), 1000); return () => clearInterval(i) }, [joined, ended])
  useEffect(() => { if (joined && vid.current && stream.current) vid.current.srcObject = stream.current }, [joined, cam])
  if (!d) return <div className="py-24 text-center"><p className="text-muted">Doctor not found.</p><Link to="/doctors" className="btn-primary mt-4">All Doctors</Link></div>
  const join = async () => {
    try { stream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }) } catch { setErr('Camera or microphone unavailable. You can still join in chat-only mode.'); setCam(false); setMic(false) }
    setJoined(true)
  }
  const toggle = (kind, on, set) => { stream.current?.getTracks().filter(t => t.kind === kind).forEach(t => (t.enabled = !on)); set(!on) }
  const end = () => { stop(); setEnded(true) }
  const send = e => { e.preventDefault(); if (txt.trim()) { setMsgs([...msgs, { me: true, t: txt.trim() }]); setTxt('') } }
  const clock = `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`
  if (ended) return <div className="py-24 text-center"><h1 className="text-2xl font-bold">Call ended</h1><p className="mt-2 text-muted">Duration {clock}</p><Link to="/doctors" className="btn-primary mt-4">Back to Doctors</Link></div>
  if (!joined) return (
    <div className="mx-auto max-w-md px-4 py-16 text-center"><Avatar name={d.name} size="mx-auto h-24 w-24 text-2xl" />
      <h1 className="mt-4 text-2xl font-bold">Video consultation</h1><p className="text-muted">{d.name} · {d.specialty}</p>
      <p className="mt-4 text-sm text-muted">Waiting room. Your browser will ask for camera and microphone access.</p>
      <button onClick={join} className="btn-primary mt-6 w-full">Join Call</button></div>)
  return (
    <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="relative grid aspect-video place-items-center rounded-2xl bg-ink text-white">
          <div className="text-center"><Avatar name={d.name} size="mx-auto h-20 w-20 text-2xl" /><p className="mt-2">{d.name}</p></div>
          <span className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs">{clock}</span>
          <div className="absolute bottom-3 right-3 h-24 w-36 overflow-hidden rounded-lg bg-slate-700 ring-2 ring-white/30">
            {cam ? <video ref={vid} autoPlay muted playsInline className="h-full w-full -scale-x-100 object-cover" /> : <p className="grid h-full place-items-center text-xs">Camera off</p>}</div>
        </div>
        {err && <p role="alert" className="mt-2 text-sm text-amber-600">{err}</p>}
        <div className="mt-4 flex justify-center gap-3">
          <button onClick={() => toggle('audio', mic, setMic)} aria-label="Toggle microphone" className={`grid h-12 w-12 place-items-center rounded-full ${mic ? 'bg-surface ring-1 ring-slate-200' : 'bg-red-100 text-red-600'}`}>{mic ? <Mic /> : <MicOff />}</button>
          <button onClick={() => toggle('video', cam, setCam)} aria-label="Toggle camera" className={`grid h-12 w-12 place-items-center rounded-full ${cam ? 'bg-surface ring-1 ring-slate-200' : 'bg-red-100 text-red-600'}`}>{cam ? <Video /> : <VideoOff />}</button>
          <button onClick={end} aria-label="End call" className="grid h-12 w-12 place-items-center rounded-full bg-red-600 text-white"><PhoneOff /></button></div>
      </div>
      <aside className="card flex h-[28rem] flex-col p-4"><h2 className="font-semibold">Chat</h2>
        <div className="mt-2 flex-1 space-y-2 overflow-y-auto text-sm">{msgs.map((m, i) => <p key={i} className={`max-w-[85%] rounded-xl px-3 py-2 ${m.me ? 'ml-auto bg-primary text-white' : 'bg-bg text-muted'}`}>{m.t}</p>)}</div>
        <form onSubmit={send} className="mt-2 flex gap-2"><input value={txt} onChange={e => setTxt(e.target.value)} placeholder="Type a message" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm" /><button aria-label="Send" className="btn-primary !px-3"><Send size={16} /></button></form></aside>
    </div>)
}
