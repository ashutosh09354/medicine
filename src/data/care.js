export const testCategories = ['All', 'Full Body', 'Blood', 'Thyroid', 'Diabetes', 'Vitamins']
export const tests = [
  { id: 't1', name: 'Full Body Checkup', category: 'Full Body', params: 85, price: 1499, mrp: 2199, fasting: '10–12 hours fasting', report: '24 hours', includes: ['Complete Blood Count', 'Lipid Profile', 'Liver Function', 'Kidney Function', 'Thyroid Profile', 'Blood Glucose'] },
  { id: 't2', name: 'Complete Blood Count', category: 'Blood', params: 24, price: 299, mrp: 450, fasting: 'No fasting needed', report: '12 hours', includes: ['Hemoglobin', 'RBC Count', 'WBC Count', 'Platelet Count', 'Hematocrit'] },
  { id: 't3', name: 'Thyroid Profile', category: 'Thyroid', params: 3, price: 399, mrp: 600, fasting: 'No fasting needed', report: '24 hours', includes: ['T3', 'T4', 'TSH'] },
  { id: 't4', name: 'Diabetes Screening', category: 'Diabetes', params: 6, price: 549, mrp: 800, fasting: '8–10 hours fasting', report: '24 hours', includes: ['Fasting Glucose', 'HbA1c', 'Post-meal Glucose', 'Average Glucose'] },
  { id: 't5', name: 'Vitamin D & B12', category: 'Vitamins', params: 2, price: 699, mrp: 999, fasting: 'No fasting needed', report: '48 hours', includes: ['Vitamin D (25-OH)', 'Vitamin B12'] },
  { id: 't6', name: 'Lipid Profile', category: 'Blood', params: 8, price: 449, mrp: 650, fasting: '9–12 hours fasting', report: '24 hours', includes: ['Total Cholesterol', 'HDL', 'LDL', 'Triglycerides', 'VLDL'] },
]
export const specialties = ['All', 'General Physician', 'Dermatologist', 'Cardiologist', 'Pediatrician', 'Gynecologist', 'Dentist']
export const doctors = [
  { id: 'd1', name: 'Dr. Ananya Sharma', specialty: 'General Physician', exp: 12, fee: 499, online: true, degree: 'MBBS, MD (Medicine)', about: 'Focuses on preventive care and management of everyday and chronic conditions.' },
  { id: 'd2', name: 'Dr. Rohan Mehta', specialty: 'Cardiologist', exp: 15, fee: 899, online: true, degree: 'MBBS, DM (Cardiology)', about: 'Experienced in heart health, blood pressure and lifestyle-related cardiac care.' },
  { id: 'd3', name: 'Dr. Priya Nair', specialty: 'Dermatologist', exp: 8, fee: 649, online: false, degree: 'MBBS, MD (Dermatology)', about: 'Treats common skin, hair and nail concerns.' },
  { id: 'd4', name: 'Dr. Arjun Verma', specialty: 'Pediatrician', exp: 10, fee: 549, online: true, degree: 'MBBS, MD (Pediatrics)', about: 'Child health, growth monitoring and routine pediatric care.' },
  { id: 'd5', name: 'Dr. Kavita Rao', specialty: 'Gynecologist', exp: 14, fee: 799, online: true, degree: 'MBBS, MS (Obstetrics & Gynecology)', about: 'Women\'s health, pregnancy care and routine gynecological consultation.' },
  { id: 'd6', name: 'Dr. Imran Khan', specialty: 'Dentist', exp: 6, fee: 399, online: false, degree: 'BDS, MDS', about: 'General dental care and oral health guidance.' },
]
export const slots = ['09:00 AM', '10:30 AM', '12:00 PM', '03:00 PM', '04:30 PM', '06:00 PM']
