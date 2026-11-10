import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { fmtDate, isOpenDay, isOpenSlot, localTz, slots, toLocal } from '../lib/booking'

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

/** Month calendar plus GST time slots with the visitor's local time alongside. */
export function BookingCalendar({ date, time, onDate, onTime }: { date: string; time: string; onDate: (d: string) => void; onTime: (t: string) => void }) {
  const start = date ? new Date(`${date}T00:00:00`) : new Date()
  const [view, setView] = useState(new Date(start.getFullYear(), start.getMonth(), 1))
  const first = (view.getDay() + 6) % 7 // Monday-first
  const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1))]
  const month = (d: number) => setView(new Date(view.getFullYear(), view.getMonth() + d, 1))
  const thisMonth = new Date(); thisMonth.setDate(1); thisMonth.setHours(0, 0, 0, 0)

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_280px]">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <button type="button" aria-label="Previous month" disabled={view <= thisMonth} onClick={() => month(-1)} className="grid size-9 place-items-center rounded-full border border-ink/15 disabled:opacity-30"><ChevronLeft className="size-4" /></button>
          <p className="font-display text-lg font-medium">{view.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
          <button type="button" aria-label="Next month" onClick={() => month(1)} className="grid size-9 place-items-center rounded-full border border-ink/15"><ChevronRight className="size-4" /></button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} className="py-2">{d}</span>)}</div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (!d) return <span key={i} />
            const open = isOpenDay(d)
            const on = iso(d) === date
            return (
              <button key={i} type="button" disabled={!open} aria-pressed={on} onClick={() => { onDate(iso(d)); onTime('') }}
                className={`mx-auto grid size-10 place-items-center rounded-full text-sm transition ${on ? 'bg-ink text-white' : open ? 'border border-ink/15 bg-white hover:border-ink' : 'text-ink/25'}`}>
                {d.getDate()}
              </button>
            )
          })}
        </div>
        <p className="mt-4 flex flex-wrap gap-4 text-xs text-muted"><span className="flex items-center gap-1.5"><span className="size-3 rounded-full border border-ink/30 bg-white" />Available</span><span className="flex items-center gap-1.5"><span className="size-3 rounded-full bg-ink" />Selected</span><span className="text-ink/30">Greyed: unavailable</span></p>
      </div>
      <div>
        <p className="mb-2 font-display text-lg font-medium">{date ? fmtDate(date, { weekday: 'long', day: 'numeric', month: 'long' }) : 'Choose a day'}</p>
        <p className="mb-4 rounded-xl bg-sand px-3 py-2 text-xs text-muted">Times in Gulf Standard Time (GST, UTC+4). Your time zone: {localTz}.</p>
        <div className="space-y-2">
          {slots.map((t) => {
            const open = !!date && isOpenSlot(date, t)
            const on = t === time
            return (
              <button key={t} type="button" disabled={!open} aria-pressed={on} onClick={() => onTime(t)}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm transition ${on ? 'border-ink bg-ink text-white' : open ? 'border-ink/15 bg-white hover:border-ink' : 'border-ink/5 text-ink/25 line-through'}`}>
                <span className="font-medium">{t} GST</span><span className={on ? 'text-white/70' : 'text-muted'}>{toLocal(t)} your time</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
