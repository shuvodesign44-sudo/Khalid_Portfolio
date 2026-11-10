import { useState, type FormEvent } from 'react'
import { ArrowRight, ArrowUpRight, Calendar, CheckCircle2, Mail, Minus, Plus } from 'lucide-react'
import { inquiryTypes } from '../data/pages'
import { Eyebrow, PageIntro } from '../components/ui'

const socials = [
  { n: 'LinkedIn', h: '@khalidalsuwaidi', i: 'in' },
  { n: 'Instagram', h: '@khalidalsuwaidi', i: 'IG' },
  { n: 'Peleverse Instagram', h: '@peleverse', i: 'IG' },
  { n: 'X', h: '@khalidalsuwaidi', i: 'X' },
  { n: 'Facebook', h: '@khalidalsuwaidi', i: 'f' },
  { n: 'YouTube', h: '@khalidalsuwaidi', i: 'YT' },
]
const field = 'h-12 w-full rounded-2xl border border-ink/15 bg-white px-4 outline-none transition focus:border-ink focus:ring-2 focus:ring-brand/40'

/** P08: enquiry form with conditional speaking fields, email/social side panel and a stylised UAE map. */
export function Contact() {
  const [type, setType] = useState<(typeof inquiryTypes)[number]>(inquiryTypes[0])
  const [msg, setMsg] = useState('')
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [sent, setSent] = useState(false)
  const [zoom, setZoom] = useState(1)
  const emailBad = touched && email.length > 0 && !/^\S+@\S+\.\S+$/.test(email)

  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); if (!emailBad) setSent(true) }

  return (
    <>
      <PageIntro eyebrow="Get in touch" title="Let's work together" lede="For speaking, partnerships or HR strategy advice, send a short note and I will come back to you personally.">
        <p className="mt-8 text-sm">Prefer a meeting? <a href="/book" className="inline-flex items-center gap-1 font-medium underline decoration-brand decoration-2 underline-offset-4">Book a consultation<ArrowRight className="size-4" aria-hidden /></a></p>
      </PageIntro>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-5 pb-20 md:px-8 lg:grid-cols-[1fr_380px]">
        <div id="enquiry" className="scroll-mt-24 rounded-[2rem] bg-white/70 p-6 ring-1 ring-ink/5 md:p-10">
          {sent ? (
            <div className="py-16 text-center">
              <CheckCircle2 className="mx-auto size-14 text-brand" aria-hidden />
              <h2 className="mt-6 font-display text-3xl font-medium">Thank you, your enquiry is on its way</h2>
              <p className="mt-3 text-muted">I usually reply within two working days.</p>
              <button type="button" onClick={() => { setSent(false); setMsg(''); setEmail(''); setTouched(false) }} className="mt-8 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium hover:border-ink">Send another enquiry</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6">
              <div className="flex items-baseline justify-between"><h2 className="font-display text-3xl font-medium">Send an enquiry</h2><p className="text-xs text-muted">* Required</p></div>
              <div>
                <label htmlFor="c-type" className="mb-2 block text-sm font-medium">Inquiry type *</label>
                <select id="c-type" value={type} onChange={(e) => setType(e.target.value as typeof type)} className={field}>{inquiryTypes.map((t) => <option key={t}>{t}</option>)}</select>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div><label htmlFor="c-name" className="mb-2 block text-sm font-medium">Full name *</label><input id="c-name" required autoComplete="name" placeholder="Your name" className={field} /></div>
                <div>
                  <label htmlFor="c-email" className="mb-2 block text-sm font-medium">Email *</label>
                  <input id="c-email" type="email" required autoComplete="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => setTouched(true)} aria-invalid={emailBad} aria-describedby="c-email-err" className={`${field} ${emailBad ? 'border-red-500' : ''}`} />
                  {emailBad && <p id="c-email-err" className="mt-2 text-xs text-red-600">Enter a valid email address, e.g. name@example.com</p>}
                </div>
              </div>
              <div><label htmlFor="c-org" className="mb-2 block text-sm font-medium">Organisation</label><input id="c-org" autoComplete="organization" placeholder="Organisation name (optional)" className={field} /></div>
              {type === 'Speaking Engagements' && (
                <fieldset className="rounded-2xl border border-dashed border-ink/20 bg-sand/60 p-5">
                  <legend className="px-2 text-xs tracking-[0.18em] text-muted uppercase">Speaking engagement details</legend>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div><label htmlFor="c-date" className="mb-2 flex items-center gap-2 text-sm font-medium"><Calendar className="size-4" aria-hidden />Event date *</label><input id="c-date" type="date" required className={field} /></div>
                    <div><label htmlFor="c-loc" className="mb-2 block text-sm font-medium">Event location *</label><input id="c-loc" required placeholder="City, venue" className={field} /></div>
                  </div>
                </fieldset>
              )}
              <div>
                <label htmlFor="c-msg" className="mb-2 block text-sm font-medium">Message *</label>
                <textarea id="c-msg" required maxLength={2000} rows={6} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Tell me about your enquiry" className={`${field} h-auto py-3`} />
                <p className="mt-1 text-right text-xs text-muted">{msg.length} / 2000</p>
              </div>
              {/* Honeypot: hidden from people, catches bots */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <label className="flex items-start gap-3 text-sm text-muted"><input type="checkbox" required className="mt-1 size-4 accent-[var(--color-ink)]" />I agree that my details are used to reply to this enquiry, as set out in the Privacy Policy. *</label>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-white hover:bg-black">Send enquiry<ArrowRight className="size-4" aria-hidden /></button>
                <p className="text-sm text-muted">Usually replies within 2 working days</p>
              </div>
            </form>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] bg-ink p-8 text-white">
            <Eyebrow light>Say hello</Eyebrow>
            <h2 className="font-display text-2xl font-medium">Prefer email?</h2>
            <p className="mt-2 text-white/70">hello@khalidalsuwaidi.ae</p>
            <a href="mailto:hello@khalidalsuwaidi.ae?subject=Hello%20Khalid" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-medium text-ink hover:brightness-95"><Mail className="size-4" aria-hidden />Say hello</a>
            <p className="mt-3 text-xs text-white/50">Opens your email app with a pre-written subject.</p>
          </div>
          <div className="rounded-[2rem] bg-white/70 p-6 ring-1 ring-ink/5 md:p-8">
            <Eyebrow>Follow</Eyebrow>
            <h2 className="mb-5 font-display text-2xl font-medium">Social profiles</h2>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.n}><a href="#" className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white px-4 py-3 transition hover:border-ink">
                  <span className="grid size-10 place-items-center rounded-full bg-sand text-xs font-medium">{s.i}</span>
                  <span className="flex-1"><span className="block text-sm font-medium">{s.n}</span><span className="text-xs text-muted">{s.h}</span></span>
                  <ArrowUpRight className="size-4 text-muted" aria-hidden />
                </a></li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {/* Where I work */}
      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-8">
        <Eyebrow>Where I work</Eyebrow>
        <h2 className="mb-8 font-display text-4xl font-medium tracking-tight md:text-5xl">Abu Dhabi and Dubai</h2>
        <div className="relative h-[460px] overflow-hidden rounded-[2rem] bg-[#cfe9e6]">
          <img src="/assets/abu-dhabi-map.png" alt="Stylised map of Abu Dhabi and Dubai" style={{ transform: `scale(${zoom})` }} className="size-full object-cover transition-transform duration-500" />
          <div className="absolute top-6 left-6 max-w-xs rounded-3xl bg-white p-6 shadow-lg">
            <h3 className="font-display text-xl font-medium">Based in the UAE</h3>
            <p className="mt-1 text-sm">Abu Dhabi | Dubai</p>
            <p className="mt-2 text-sm text-muted">Meetings in person or online.</p>
          </div>
          <div className="absolute top-6 right-6 flex flex-col overflow-hidden rounded-xl bg-white shadow-lg">
            <button type="button" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(2, z + 0.25))} className="grid size-10 place-items-center hover:bg-sand"><Plus className="size-4" /></button>
            <button type="button" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(1, z - 0.25))} className="grid size-10 place-items-center border-t border-ink/10 hover:bg-sand"><Minus className="size-4" /></button>
          </div>
        </div>
      </section>
    </>
  )
}
