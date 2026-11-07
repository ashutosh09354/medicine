import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Medicines from './pages/Medicines'
import Cart from './pages/Cart'
import LabTests from './pages/LabTests'
import LabTestDetail from './pages/LabTestDetail'
import Doctors from './pages/Doctors'
import DoctorProfile from './pages/DoctorProfile'
import Consultation from './pages/Consultation'
import ProductList from './pages/ProductListPage'
import ProductDetail from './pages/ProductDetail'
import UploadPrescription from './pages/UploadPrescription'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Account from './pages/Account'
import Blogs from './pages/Blogs'
import BlogDetail from './pages/BlogDetail'
import VideoCall from './pages/VideoCall'
import Reminders from './pages/Reminders'
import Wishlist from './pages/Wishlist'
import Records from './pages/Records'
import BMI from './pages/BMI'
import Toaster from './components/common/Toaster'
import NotFound from './pages/NotFound'
const titles = { '/': 'Home', '/medicines': 'Medicines', '/lab-tests': 'Lab Tests', '/doctors': 'Doctors', '/consultation': 'Book Consultation', '/healthcare': 'Healthcare Products', '/blogs': 'Health Blogs', '/cart': 'Cart', '/checkout': 'Checkout', '/account': 'Account', '/orders': 'Orders', '/reminders': 'Medicine Reminders', '/bmi': 'BMI Calculator', '/records': 'Health Records', '/wishlist': 'Wishlist', '/upload-prescription': 'Upload Prescription' }
export default function App() {
  const { pathname } = useLocation()
  useEffect(() => { document.title = `${titles[pathname] || 'MedCare'} | MedCare`; window.scrollTo(0, 0) }, [pathname])
  return (<><Toaster /><Header /><main key={pathname} className="page min-h-[60vh] pb-20 xl:pb-0"><Routes>
    <Route path="/" element={<Home />} /><Route path="/medicines" element={<Medicines />} /><Route path="/medicines/:id" element={<ProductDetail kind="medicine" />} />
    <Route path="/healthcare" element={<ProductList />} /><Route path="/healthcare/:id" element={<ProductDetail kind="healthcare" />} />
    <Route path="/upload-prescription" element={<UploadPrescription />} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={<Checkout />} />
    <Route path="/lab-tests" element={<LabTests />} /><Route path="/lab-tests/:id" element={<LabTestDetail />} />
    <Route path="/doctors" element={<Doctors />} /><Route path="/doctors/:id" element={<DoctorProfile />} /><Route path="/consultation" element={<Consultation />} />
    <Route path="/blogs" element={<Blogs />} /><Route path="/blogs/:slug" element={<BlogDetail />} />
    <Route path="/account" element={<Account />} /><Route path="/orders" element={<Orders />} />
    <Route path="/video-call/:id" element={<VideoCall />} /><Route path="/reminders" element={<Reminders />} /><Route path="/wishlist" element={<Wishlist />} /><Route path="/records" element={<Records />} /><Route path="/bmi" element={<BMI />} />
    <Route path="*" element={<NotFound />} /></Routes></main><Footer /></>)
}
