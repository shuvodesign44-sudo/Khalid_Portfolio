import { ArrowRight, CalendarPlus, Check, Video } from 'lucide-react'
import { downloadIcs, fmtDate, localTz, toLocal, typeOf, useBooking } from '../lib/booking'
import { NoBooking } from './ManageBooking'

/** P11: booking confirmation with summary, calendar download and manage link. */
export function BookingConfirmed() {
  const b = useBooking()
  if (!b) return <NoBooking />
  const t = typeOf(b.type)
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 size-[560px] rounded-full bg-brand/20 blur-[120px]" />
      <div className="relative mx-auto max-w-[1440px] px-5 pt-36 pb-24 md:px-8 md:pt-44">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-white/80 p-8 text-center ring-1 ring-ink/5 md:p-14">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand"><Check className="size-8" aria-hidden /></span>
          <h1 className="mt-6 font-display text-4xl font-medium tracking-tight md:text-5xl">Your consultation is booked</h1>
          <p className="mt-3 text-muted">Booking reference <span className="font-medium text-ink">{b.ref}</span></p>

          <dl className="mt-10 divide-y divide-ink/10 rounded-3xl bg-sand/70 px-6 text-left">
            {[
              ['Type', `${t.name} · ${t.mins} min`],
              ['Date & time', `${fmtDate(b.date)}, ${b.time} GST`],
              ['Your time', `${toLocal(b.time)} ${localTz}`],
              ['Format', b.format === 'online' ? 'Online · video link in your email' : `In person · ${b.city} (location details in your email)`],
            ].map(([k, v]) => <div key={k} className="flex flex-wrap gap-4 py-4"><dt className="w-32 text-sm text-muted">{k}</dt><dd className="flex-1 text-sm">{v}</dd></div>)}
          </dl>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={() => downloadIcs(b)} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-medium text-white hover:bg-black"><CalendarPlus className="size-4" aria-hidden />Add to calendar (.ics)</button>
            {b.format === 'online' && <a href="#" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-medium hover:brightness-95"><Video className="size-4" aria-hidden />Join video meeting</a>}
            <a href="/book/manage" className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-4 text-sm font-medium hover:border-ink">Manage booking<ArrowRight className="size-4" aria-hidden /></a>
          </div>
          <p className="mt-8 text-sm text-muted">A confirmation email with the calendar invite has been sent to <span className="text-ink">{b.email}</span>. You will get a reminder 24 hours before the meeting.</p>
          {t.id === 'venture' && <p className="mt-3 text-sm text-muted">Venture consultations are confirmed after a short review. You will hear back within one working day.</p>}
        </div>
      </div>
    </section>
  )
}
