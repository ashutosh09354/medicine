import { Routes, Route } from 'react-router-dom'
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
import NotFound from './pages/NotFound'
export default function App() {
  return (<><Header /><main className="min-h-[60vh]"><Routes>
    <Route path="/" element={<Home />} /><Route path="/medicines" element={<Medicines />} /><Route path="/medicines/:id" element={<ProductDetail kind="medicine" />} />
    <Route path="/healthcare" element={<ProductList />} /><Route path="/healthcare/:id" element={<ProductDetail kind="healthcare" />} />
    <Route path="/upload-prescription" element={<UploadPrescription />} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={<Checkout />} />
    <Route path="/lab-tests" element={<LabTests />} /><Route path="/lab-tests/:id" element={<LabTestDetail />} />
    <Route path="/doctors" element={<Doctors />} /><Route path="/doctors/:id" element={<DoctorProfile />} /><Route path="/consultation" element={<Consultation />} />
    <Route path="/blogs" element={<Blogs />} /><Route path="/blogs/:slug" element={<BlogDetail />} />
    <Route path="/account" element={<Account />} /><Route path="/orders" element={<Orders />} />
    <Route path="*" element={<NotFound />} /></Routes></main><Footer /></>)
}
