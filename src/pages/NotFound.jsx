import { Link } from 'react-router-dom'
export default function NotFound() { return <div className="py-24 text-center"><h1 className="text-5xl font-bold text-primary">404</h1><p className="mt-2 text-muted">Page not found.</p><Link to="/" className="btn-primary mt-4">Go Home</Link></div> }
