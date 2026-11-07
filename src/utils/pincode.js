const AREAS = { 11: 'Delhi', 12: 'Haryana / NCR', 20: 'Noida / Uttar Pradesh', 38: 'Ahmedabad', 40: 'Mumbai', 41: 'Pune', 50: 'Hyderabad', 56: 'Bengaluru', 60: 'Chennai', 70: 'Kolkata' }
export const checkPin = pin => ({ ok: !!AREAS[pin.slice(0, 2)], city: AREAS[pin.slice(0, 2)] || '' })
