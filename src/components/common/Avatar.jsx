export default function Avatar({ name, size = 'h-16 w-16' }) {
  const ini = name.replace('Dr. ', '').split(' ').map(w => w[0]).join('')
  return <div className={`${size} grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary font-bold text-white`}>{ini}</div>
}
