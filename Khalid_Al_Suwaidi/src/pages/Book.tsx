import { useState, type FormEvent, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { BookingCalendar } from '../components/BookingCalendar'
import { consultTypes, fmtDate, localTz, newRef, saveBooking, toLocal, typeOf, type Booking } from '../lib/booking'

const steps = ['Type', 'Date & time', 'Your details', 'Review']
const field = 'h-12 w-full rounded-2xl border border-ink/15 bg-white px-4 outline-none transition focus:border-ink focus:ring-2 focus:ring-brand/40'
type Draft = Omit<Booking, 'ref' | 'status'>

/** P10: four-step consultation booking with a sticky summary. */
export function Book() {
  const pre = new URLSearchParams(location.search).get('type') as Draft['type'] | null
  const [step, setStep] = useState(pre ? 1 : 0)
  const [d, setD] = useState<Draft>({ type: pre ?? 'hr', date: '', time: '', name: '', email: '', phone: '', org: '', topic: '', notes: '', format: 'in-person', city: 'Abu Dhabi' })
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((x) => ({ ...x, [k]: v }))
  const t = typeOf(d.type)
  const go = (n: number) => { setStep(n); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const submitDetails = (e: FormEvent) => { e.preventDefault(); go(3) }
  const confirm = () => {
    saveBooking({ ...d, ref: newRef(), status: 'confirmed' })
    history.pushState(null, '', '/book/confirmed')
    dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 size-[560px] rounded-full bg-brand/20 blur-[120px]" />
        <div className="relative mx-auto max-w-[1440px] px-5 pt-36 pb-12 md:px-8 md:pt-44">
          <h1 className="font-display text-5xl leading-[1.02] font-medium tracking-tight md:text-7xl">Book a consultation</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">Choose a session, pick a time that suits you and tell me a little about what you would like to discuss.</p>
          <ol className="mt-12 flex items-center gap-3">
            {steps.map((s, i) => (
              <li key={s} className="flex flex-1 items-center gap-3 last:flex-none">
                <button type="button" disabled={i > step} onClick={() => go(i)} className="flex items-center gap-2 disabled:cursor-default">
                  <span className={`grid size-9 shrink-0 place-items-center rounded-full text-sm font-medium transition ${i < step ? 'bg-brand text-ink' : i === step ? 'bg-ink text-white' : 'border border-ink/20 text-muted'}`}>{i < step ? <Check className="size-4" /> : i + 1}</span>
                  <span className={`hidden text-sm sm:block ${i <= step ? 'font-medium' : 'text-muted'}`}>{s}</span>
                </button>
                {i < steps.length - 1 && <span className={`h-px flex-1 ${i < step ? 'bg-ink' : 'bg-ink/15'}`} />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-5 pb-24 md:px-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[2rem] bg-white/70 p-6 ring-1 ring-ink/5 md:p-10">
          {step === 0 && (
            <Step title="Choose a consultation type" n={1}>
              <div role="radiogroup" className="grid gap-4 md:grid-cols-2">
                {consultTypes.map((c) => {
                  const on = d.type === c.id
                  return (
                    <button key={c.id} type="button" role="radio" aria-checked={on} onClick={() => set('type', c.id)} className={`rounded-3xl border p-6 text-left transition ${on ? 'border-ink bg-white shadow-lg' : 'border-ink/10 bg-white/60 hover:border-ink/40'}`}>
                      <span className="flex items-center gap-3"><span className={`grid size-5 place-items-center rounded-full border ${on ? 'border-ink' : 'border-ink/30'}`}>{on && <span className="size-2.5 rounded-full bg-ink" />}</span><span className="font-display text-xl font-medium">{c.name}</span></span>
                      <p className="mt-3 text-sm text-muted">{c.body}</p>
                      <p className="mt-4 text-sm font-medium">{c.mins} min · {c.format}</p>
                      {'approval' in c && <span className="mt-3 inline-block rounded-full bg-brand/30 px-3 py-1 text-xs">Confirmed after approval</span>}
                    </button>
                  )
                })}
              </div>
              <Nav next={() => go(1)} />
            </Step>
          )}

          {step === 1 && (
            <Step title="Pick a date and time" n={2}>
              <BookingCalendar date={d.date} time={d.time} onDate={(v) => set('date', v)} onTime={(v) => set('time', v)} />
              <Nav back={() => go(0)} next={() => go(2)} disabled={!d.date || !d.time} />
            </Step>
          )}

          {step === 2 && (
            <Step title="Your details" n={3}>
              <form onSubmit={submitDetails} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Full name *"><input required autoComplete="name" value={d.name} onChange={(e) => set('name', e.target.value)} className={field} /></Field>
                  <Field label="Email *"><input required type="email" autoComplete="email" value={d.email} onChange={(e) => set('email', e.target.value)} className={field} /></Field>
                  <Field label="Phone *"><div className="flex gap-2"><select aria-label="Country code" className={`${field} w-28`}><option>+971</option><option>+966</option><option>+974</option><option>+44</option></select><input required type="tel" autoComplete="tel" placeholder="50 123 4567" value={d.phone} onChange={(e) => set('phone', e.target.value)} className={field} /></div></Field>
                  <Field label="Organisation"><input autoComplete="organization" value={d.org} onChange={(e) => set('org', e.target.value)} className={field} /></Field>
                </div>
                <Field label="Topic *"><input required placeholder="What would you like to discuss?" value={d.topic} onChange={(e) => set('topic', e.target.value)} className={field} /></Field>
                <Field label="Notes"><textarea rows={4} value={d.notes} onChange={(e) => set('notes', e.target.value)} className={`${field} h-auto py-3`} /></Field>
                <fieldset>
                  <legend className="mb-3 text-sm font-medium">Meeting format *</legend>
                  <div className="flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 text-sm"><input type="radio" name="fmt" checked={d.format === 'in-person'} onChange={() => set('format', 'in-person')} className="accent-[var(--color-ink)]" />In person</label>
                    {d.format === 'in-person' && <select aria-label="City" value={d.city} onChange={(e) => set('city', e.target.value as Draft['city'])} className={`${field} h-10 w-40`}><option>Abu Dhabi</option><option>Dubai</option></select>}
                    <label className="flex items-center gap-2 text-sm"><input type="radio" name="fmt" checked={d.format === 'online'} onChange={() => set('format', 'online')} className="accent-[var(--color-ink)]" />Online: video link sent in the confirmation</label>
                  </div>
                </fieldset>
                <label className="flex items-start gap-3 text-sm text-muted"><input type="checkbox" required className="mt-1 size-4 accent-[var(--color-ink)]" />I agree to the Privacy Policy. *</label>
                <div className="flex items-center justify-between gap-4 pt-4">
                  <button type="button" onClick={() => go(1)} className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium hover:border-ink"><ArrowLeft className="size-4" />Back</button>
                  <button className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-black">Continue<ArrowRight className="size-4" /></button>
                </div>
              </form>
            </Step>
          )}

          {step === 3 && (
            <Step title="Review and confirm" n={4}>
              <dl className="divide-y divide-ink/10 rounded-3xl bg-sand/60 px-6">
                {[
                  ['Type', `${t.name} · ${t.mins} min`, 0],
                  ['Date & time', `${fmtDate(d.date)}, ${d.time} GST (${toLocal(d.time)} your time)`, 1],
                  ['Format', d.format === 'online' ? 'Online video meeting' : `In person · ${d.city}`, 2],
                  ['Your details', `${d.name} · ${d.email} · ${d.phone}`, 2],
                ].map(([k, v, s]) => (
                  <div key={k as string} className="flex flex-wrap items-center gap-4 py-4"><dt className="w-32 text-sm text-muted">{k}</dt><dd className="flex-1 text-sm">{v}</dd><button type="button" onClick={() => go(s as number)} className="text-sm font-medium underline decoration-brand decoration-2 underline-offset-4">Edit</button></div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-muted">Free to reschedule or cancel up to 24 hours before the meeting.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={confirm} className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-white hover:bg-black">Confirm booking<ArrowRight className="size-4" /></button>
                <button type="button" onClick={() => go(2)} className="rounded-full border border-ink/20 px-6 py-4 text-sm font-medium hover:border-ink">Back</button>
              </div>
            </Step>
          )}
        </div>

        <aside className="h-fit rounded-[2rem] bg-ink p-8 text-white/80 lg:sticky lg:top-24">
          <p className="font-display text-xl font-medium text-white">Your booking</p>
          <dl className="mt-6 space-y-4 text-sm">
            <Row k="Type" v={t.name} change={() => go(0)} />
            <Row k="Duration" v={`${t.mins} min`} />
            <Row k="Date & time" v={d.date && d.time ? `${fmtDate(d.date, { weekday: 'short', day: 'numeric', month: 'short' })}, ${d.time} GST` : 'Not chosen yet'} change={step > 1 ? () => go(1) : undefined} />
            <Row k="Your time" v={d.time ? `${toLocal(d.time)} ${localTz}` : '—'} />
            <Row k="Format" v={step > 2 ? (d.format === 'online' ? 'Online' : `In person · ${d.city}`) : 'Not chosen yet'} />
          </dl>
          <p className="mt-6 border-t border-white/15 pt-5 text-xs text-white/50">No payment is taken. You will get a confirmation email with a calendar invite.</p>
        </aside>
      </section>
    </>
  )
}

function Step({ title, n, children }: { title: string; n: number; children: ReactNode }) {
  return <div><div className="mb-8 flex items-baseline justify-between gap-4"><h2 className="font-display text-3xl font-medium">{title}</h2><p className="shrink-0 text-sm text-muted">Step {n} of 4</p></div>{children}</div>
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-medium">{label}</span>{children}</label>
}
function Nav({ back, next, disabled }: { back?: () => void; next: () => void; disabled?: boolean }) {
  return (
    <div className="mt-10 flex items-center justify-between gap-4">
      {back ? <button type="button" onClick={back} className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium hover:border-ink"><ArrowLeft className="size-4" />Back</button> : <span />}
      <button type="button" disabled={disabled} onClick={next} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-black disabled:opacity-30">Continue<ArrowRight className="size-4" /></button>
    </div>
  )
}
function Row({ k, v, change }: { k: string; v: string; change?: () => void }) {
  return <div className="flex items-start justify-between gap-4"><div><dt className="text-white/50">{k}</dt><dd className="mt-0.5 text-white">{v}</dd></div>{change && <button type="button" onClick={change} className="text-xs text-brand hover:underline">Change</button>}</div>
}
