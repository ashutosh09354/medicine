export const productCats = ['All', 'Personal Care', 'Supplements', 'Devices', 'Nutrition', 'Baby Care', 'Wellness']
export const products = [
  { id: 'h1', name: 'Daily Multivitamin (60 tablets)', category: 'Supplements', price: 499, mrp: 650 },
  { id: 'h2', name: 'Digital BP Monitor', category: 'Devices', price: 1599, mrp: 2200 },
  { id: 'h3', name: 'Gentle Baby Lotion 200ml', category: 'Baby Care', price: 249, mrp: 299 },
  { id: 'h4', name: 'Whey Protein 1kg', category: 'Nutrition', price: 1899, mrp: 2499 },
  { id: 'h5', name: 'Herbal Face Wash 100ml', category: 'Personal Care', price: 189, mrp: 240 },
  { id: 'h6', name: 'Yoga Mat 6mm', category: 'Wellness', price: 699, mrp: 999 },
  { id: 'h7', name: 'Pulse Oximeter', category: 'Devices', price: 899, mrp: 1299 },
  { id: 'h8', name: 'Omega-3 Capsules (60)', category: 'Supplements', price: 599, mrp: 799 },
]
export const blogCats = ['All', 'Nutrition', 'Fitness', 'Mental Health', 'Prevention']
export const blogs = [
  { slug: 'understanding-your-blood-test', title: 'Understanding Your Blood Test Report', category: 'Prevention', date: '12 Oct 2026', excerpt: 'A simple guide to the common values on a blood report and what they generally indicate.', body: ['Blood tests give a snapshot of how your body is functioning. Values are compared against reference ranges, which can differ between laboratories.', 'A result outside the range does not automatically mean a problem. Always discuss your report with a qualified doctor.'] },
  { slug: 'eating-for-better-sleep', title: 'Eating Habits That Support Better Sleep', category: 'Nutrition', date: '03 Oct 2026', excerpt: 'Small changes to evening meals that may help you wind down.', body: ['Heavy late-night meals can make it harder to rest comfortably. Try finishing dinner a couple of hours before bed.', 'Limit caffeine in the afternoon and stay hydrated through the day.'] },
  { slug: 'walking-for-heart-health', title: 'Why a Daily Walk Matters', category: 'Fitness', date: '25 Sep 2026', excerpt: 'Regular moderate activity is one of the simplest habits for long-term wellbeing.', body: ['Brisk walking requires no equipment and suits most ages.', 'Start with ten minutes a day and build gradually. Check with your doctor if you have existing conditions.'] },
  { slug: 'managing-everyday-stress', title: 'Managing Everyday Stress', category: 'Mental Health', date: '14 Sep 2026', excerpt: 'Practical routines to help you pause and reset during busy weeks.', body: ['Breaks, sleep and time outdoors all help.', 'If stress feels overwhelming, speaking with a professional is a good step.'] },
]
export const orders = [
  { id: 'MC10234', date: '28 Oct 2026', total: 548, status: 2, items: 'Paracetamol 500mg, Vitamin C' },
  { id: 'MC10198', date: '15 Oct 2026', total: 1499, status: 3, items: 'Full Body Checkup' },
]
export const orderSteps = ['Placed', 'Packed', 'Out for delivery', 'Delivered']
