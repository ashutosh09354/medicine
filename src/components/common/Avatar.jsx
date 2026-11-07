import { DoctorPortrait } from './Art'
export default function Avatar({ name, size = 'h-16 w-16' }) {
  return <div className={`${size} shrink-0 overflow-hidden rounded-full ring-2 ring-white`}><DoctorPortrait name={name} className="h-full w-full" /></div>
}
