export const medicines = [
  { id: 'm1', name: 'Paracetamol 500mg (15 tablets)', category: 'Fever & Pain', price: 28, mrp: 35, rx: false },
  { id: 'm2', name: 'Vitamin C 500mg Chewable', category: 'Vitamins', price: 189, mrp: 240, rx: false },
  { id: 'm3', name: 'ORS Electrolyte Powder (10 sachets)', category: 'Digestive', price: 95, mrp: 110, rx: false },
  { id: 'm4', name: 'Cetirizine 10mg (10 tablets)', category: 'Allergy', price: 22, mrp: 28, rx: false },
  { id: 'm5', name: 'Amoxicillin 500mg Capsules', category: 'Antibiotics', price: 118, mrp: 140, rx: true },
  { id: 'm6', name: 'Digital Thermometer', category: 'Devices', price: 249, mrp: 320, rx: false },
]
export const labTests = [
  { id: 't1', name: 'Full Body Checkup', params: 85, price: 1499, mrp: 2199 },
  { id: 't2', name: 'Complete Blood Count', params: 24, price: 299, mrp: 450 },
  { id: 't3', name: 'Thyroid Profile', params: 3, price: 399, mrp: 600 },
  { id: 't4', name: 'Diabetes Screening', params: 6, price: 549, mrp: 800 },
]
export const services = [
  { to: '/medicines', title: 'Medicines', text: 'Order genuine medicines delivered to your door.' },
  { to: '/lab-tests', title: 'Lab Tests', text: 'Book tests with convenient home sample collection.' },
  { to: '/doctors', title: 'Doctor Consultation', text: 'Find and book appointments with doctors.' },
  { to: '/healthcare', title: 'Healthcare Products', text: 'Wellness essentials and devices.' },
  { to: '/blogs', title: 'Health Blogs', text: 'Articles on everyday health and wellness.' },
]
