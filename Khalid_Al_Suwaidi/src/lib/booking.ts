import { useEffect, useState } from 'react'

export const consultTypes = [
  { id: 'hr', name: 'HR Strategic Advice', body: 'Workforce planning, structures and HR transformation for your organisation.', mins: 60, format: 'In person or online' },
  { id: 'partner', name: 'Partnership Discussion', body: 'Explore a collaboration with Peleverse or a government programme.', mins: 45, format: 'In person or online' },
  { id: 'speaking', name: 'Speaking Engagement Briefing', body: 'Agree topic, audience and logistics for a keynote or panel.', mins: 30, format: 'Online' },
  { id: 'venture', name: 'Venture Consultation', body: 'Founder advice on games, G2G and building ventures in the UAE.', mins: 60, format: 'In person or online', approval: true },
] as const

export type Booking = {
  ref: string
  type: (typeof consultTypes)[number]['id']
  date: string // ISO yyyy-mm-dd
  time: string // HH:MM in GST
  name: string
  email: string
  phone: string
  org: string
  topic: string
  notes: string
  format: 'in-person' | 'online'
  city: 'Abu Dhabi' | 'Dubai'
  status: 'confirmed' | 'cancelled'
}

export const slots = ['09:00', '10:30', '12:00', '14:00', '15:30']
const KEY = 'ka-booking'

/** Visitor's own timezone label and GST (UTC+4) offset difference in hours. */
export const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone
const localOffset = -new Date().getTimezoneOffset() / 60
export const toLocal = (gst: string) => {
  const [h, m] = gst.split(':').map(Number)
  const mins = (((h * 60 + m + (localOffset - 4) * 60) % 1440) + 1440) % 1440
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(Math.round(mins % 60)).padStart(2, '0')}`
}

/** Deterministic pseudo-availability: weekends closed, some weekdays/slots taken. */
export const isOpenDay = (d: Date) => {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  return d >= today && d.getDay() !== 5 && d.getDay() !== 6 && d.getDate() % 7 !== 3
}
export const isOpenSlot = (iso: string, t: string) => (Number(iso.slice(-2)) + slots.indexOf(t)) % 4 !== 0

export const fmtDate = (iso: string, opts: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', opts)

export const typeOf = (id: Booking['type']) => consultTypes.find((t) => t.id === id)!

export function loadBooking(): Booking | null {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null') } catch { return null }
}
export function saveBooking(b: Booking) {
  localStorage.setItem(KEY, JSON.stringify(b))
  window.dispatchEvent(new Event('booking'))
}

export function useBooking() {
  const [b, setB] = useState(loadBooking)
  useEffect(() => {
    const on = () => setB(loadBooking())
    window.addEventListener('booking', on)
    return () => window.removeEventListener('booking', on)
  }, [])
  return b
}

export const newRef = () => `KA-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`

/** Builds and downloads an .ics calendar file for the booking. */
export function downloadIcs(b: Booking) {
  const t = typeOf(b.type)
  const [h, m] = b.time.split(':').map(Number)
  const start = new Date(Date.UTC(+b.date.slice(0, 4), +b.date.slice(5, 7) - 1, +b.date.slice(8), h - 4, m))
  const end = new Date(start.getTime() + t.mins * 60000)
  const z = (d: Date) => d.toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z'
  const loc = b.format === 'online' ? 'Online video meeting' : `${b.city}, UAE`
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Khalid AlSuwaidi//Booking//EN', 'BEGIN:VEVENT', `UID:${b.ref}@khalidalsuwaidi.ae`, `DTSTAMP:${z(new Date())}`, `DTSTART:${z(start)}`, `DTEND:${z(end)}`, `SUMMARY:${t.name} with Khalid AlSuwaidi`, `LOCATION:${loc}`, `DESCRIPTION:Booking reference ${b.ref}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  a.download = `${b.ref}.ics`
  a.click()
  URL.revokeObjectURL(a.href)
}
