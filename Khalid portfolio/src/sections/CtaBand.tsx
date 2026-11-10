import { ArrowRight, MapPin } from 'lucide-react'
import { useState, type FormEvent } from 'react'

export function CtaBand() {
  const [done, setDone] = useState(false)
  const submit = (e: FormEvent) => { e.preventDefault(); setDone(true) }
  return (
    <section id="newsletter" className="mx-auto max-w-[1440px] px-5 pb-24 md:px-8">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        {/* Newsletter */}
        <form onSubmit={submit} className="flex flex-col justify-between gap-10 rounded-[32px] bg-white p-8 md:p-12">
          <div>
            <p className="mb-4 text-xs tracking-[0.2em] text-muted uppercase">Newsletter</p>
            <h2 className="font-display text-3xl leading-tight font-medium md:text-[44px]">Ready to create something people remember?</h2>
            <p className="mt-4 max-w-md text-muted">One considered letter a month. No noise.</p>
          </div>
          {done ? <p className="text-sm" role="status">Thank you – you’re on the list.</p> : (
            <div className="flex flex-col gap-3">
              <label className="sr-only" htmlFor="nl-email">Email</label>
              <input id="nl-email" type="email" required placeholder="Your email" className="rounded-full border border-ink/10 bg-sand px-5 py-4 text-sm outline-none focus:border-ink" />
              <div className="flex gap-3">
                <button className="flex-1 rounded-full bg-ink px-6 py-4 text-sm font-medium text-white hover:bg-black">Subscribe</button>
              </div>
            </div>
          )}
        </form>

        {/* Work with Khalid + Abu Dhabi map */}
        <div id="contact" className="relative min-h-[520px] overflow-hidden rounded-[32px] bg-[#e7efe9]">
          <img src="/assets/abu-dhabi-map.png" alt="Map of Abu Dhabi and its islands" loading="lazy" className="absolute inset-0 size-full object-cover object-[62%_45%]" />
          {/* Soft sand wash so text reads cleanly without hiding the islands */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#f1e2c4] via-[#f1e2c4]/80 to-transparent" />
          <span className="absolute top-6 right-7 hidden text-right font-mono text-[11px] leading-relaxed tracking-wider text-ink/60 md:block">24.4539° N<br />54.3773° E</span>
          <div className="absolute inset-x-6 bottom-6 md:inset-x-9 md:bottom-9">
            <p className="mb-4 flex items-center gap-2 text-[11px] font-medium tracking-[0.24em] text-ink/70 uppercase"><span className="grid size-6 place-items-center rounded-full bg-ink text-white"><MapPin className="size-3" aria-hidden /></span>Abu Dhabi · Dubai</p>
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
              <div className="max-w-[420px]">
                <h2 className="font-display text-[42px] leading-[1.05] font-medium tracking-tight text-ink">From the UAE to the world</h2>
              </div>
              <a data-magnetic href="#" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white shadow-[0_12px_30px_-12px_rgba(0,0,0,0.5)] hover:bg-black">Book a consultation <ArrowRight className="size-4" aria-hidden /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
