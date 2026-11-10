import { useState } from 'react'
import { CalendarPlus, Check } from 'lucide-react'
import { BookingCalendar } from '../components/BookingCalendar'
import { downloadIcs, fmtDate, localTz, saveBooking, toLocal, typeOf, useBooking } from '../lib/booking'

/** Shown when no booking is stored in this browser. */
export function NoBooking() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-44 pb-32 text-center md:px-8">
      <h1 className="font-display text-4xl font-medium md:text-5xl">No booking found</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">Open the link in your confirmation email, or book a new consultation.</p>
      <a href="/book" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white hover:bg-black">Book a consultation</a>
    </section>
  )
}

/** P13: view, reschedule or cancel an existing booking. */
export function ManageBooking() {
  const b = useBooking()
  const [mode, setMode] = useState<'view' | 'reschedule' | 'cancel'>('view')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [flash, setFlash] = useState('')
  if (!b) return <NoBooking />
  const t = typeOf(b.type)
  const cancelled = b.status === 'cancelled'
  // Changes close 24 hours before the meeting (GST).
  const locked = new Date(`${b.date}T${b.time}:00+04:00`).getTime() - Date.now() < 864e5

  const reschedule = () => { saveBooking({ ...b, date, time }); setMode('view'); setDate(''); setTime(''); setFlash('Your booking has been moved. An updated invite is on its way.') }
  const cancel = () => { saveBooking({ ...b, status: 'cancelled' }); setMode('view'); setFlash('Your booking has been cancelled.') }

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 size-[560px] rounded-full bg-brand/20 blur-[120px]" />
      <div className="relative mx-auto max-w-[1440px] px-5 pt-36 pb-24 md:px-8 md:pt-44">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="font-display text-5xl font-medium tracking-tight md:text-7xl">Your consultation</h1>
            <span className={`rounded-full px-4 py-1.5 text-sm font-medium ${cancelled ? 'bg-ink/10 text-muted' : 'bg-brand'}`}>{cancelled ? 'Cancelled' : 'Confirmed'}</span>
          </div>
          <p className="text-sm text-muted">Ref <span className="font-medium text-ink">{b.ref}</span></p>
        </div>
        {flash && <p role="status" className="mb-6 flex items-center gap-2 rounded-2xl bg-brand/25 px-5 py-4 text-sm"><Check className="size-4" />{flash}</p>}

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <dl className="divide-y divide-ink/10 rounded-[2rem] bg-white/70 px-6 ring-1 ring-ink/5 md:px-8">
              {[
                ['Type', `${t.name} · ${t.mins} min`],
                ['Date & time', `${fmtDate(b.date)}, ${b.time} GST`],
                ['Your time', `${toLocal(b.time)} ${localTz}`],
                ['Format', b.format === 'online' ? 'Online · video link in your email' : `In person · ${b.city} (location details in your email)`],
              ].map(([k, v]) => <div key={k} className="flex flex-wrap gap-4 py-5"><dt className="w-32 text-sm text-muted">{k}</dt><dd className={`flex-1 text-sm ${cancelled ? 'text-muted line-through' : ''}`}>{v}</dd></div>)}
            </dl>
            {!cancelled && (
              <>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" disabled={locked} onClick={() => setMode('reschedule')} className="rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white hover:bg-black disabled:opacity-30">Reschedule</button>
                  <button type="button" disabled={locked} onClick={() => setMode('cancel')} className="rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium hover:border-ink disabled:opacity-30">Cancel booking</button>
                </div>
                <p className="mt-4 text-sm text-muted">Changes are possible until 24 hours before the meeting. After that, please <a href="/contact" className="underline decoration-brand decoration-2 underline-offset-4">get in touch</a>.</p>
                <button type="button" onClick={() => downloadIcs(b)} className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium hover:border-ink"><CalendarPlus className="size-4" aria-hidden />Add to calendar (.ics)</button>
              </>
            )}
            {cancelled && <a href="/book" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white hover:bg-black">Book a new consultation</a>}
          </div>

          {mode === 'reschedule' && (
            <div className="rounded-[2rem] bg-white/70 p-6 ring-1 ring-ink/5 md:p-8">
              <h2 className="mb-6 font-display text-2xl font-medium">Choose a new time</h2>
              <BookingCalendar date={date} time={time} onDate={setDate} onTime={setTime} />
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" disabled={!date || !time} onClick={reschedule} className="rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white hover:bg-black disabled:opacity-30">Confirm new time</button>
                <button type="button" onClick={() => setMode('view')} className="rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium hover:border-ink">Keep current time</button>
              </div>
              <p className="mt-4 text-xs text-muted">A new confirmation email and updated calendar invite are sent.</p>
            </div>
          )}
          {mode === 'cancel' && (
            <div role="alertdialog" aria-labelledby="cx-title" className="h-fit rounded-[2rem] bg-ink p-8 text-white">
              <h2 id="cx-title" className="font-display text-2xl font-medium">Cancel this consultation?</h2>
              <p className="mt-3 text-white/70">Your {t.name.toLowerCase()} on {fmtDate(b.date)} at {b.time} GST will be released.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={cancel} className="rounded-full bg-brand px-6 py-3.5 text-sm font-medium text-ink hover:brightness-95">Yes, cancel booking</button>
                <button type="button" onClick={() => setMode('view')} className="rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium hover:border-white">Keep booking</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
