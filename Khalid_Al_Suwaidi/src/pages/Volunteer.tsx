import { useState } from 'react'
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { equity, events, testimonials, volunteerRoles } from '../data/pages'
import { Eyebrow, Tag } from '../components/ui'

const types = ['All', 'PitchMetrics', 'Workshops', 'Youth programmes'] as const

/** P07: volunteer work, mentoring impact and community training. */
export function Volunteer() {
  const [type, setType] = useState<(typeof types)[number]>('All')
  const [page, setPage] = useState(0)
  const [q, setQ] = useState(0)
  const list = type === 'All' ? events : events.filter((e) => e.type === type)
  const pages = Math.max(1, Math.ceil(list.length / 3))
  const shown = list.slice(page * 3, page * 3 + 3)
  const t = testimonials[q]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 size-[560px] rounded-full bg-brand/20 blur-[120px]" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 pt-36 pb-20 md:px-8 md:pt-44 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Volunteer work</Eyebrow>
            <h1 className="font-display text-5xl leading-[1.02] font-medium tracking-tight md:text-7xl">Building future <span className="bg-[linear-gradient(transparent_55%,var(--color-brand)_55%)] px-0.5">leaders</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">Outside my day job, I spend my time with young people, founders and communities, helping them find their footing and their voice.</p>
            <h2 className="mt-10 font-display text-xl font-medium">My mentoring philosophy</h2>
            <p className="mt-3 max-w-xl leading-relaxed text-muted">Listen first, ask better questions and leave people more confident than you found them. Good mentoring is less about answers and more about helping someone trust their own judgement.</p>
            <a href="#roles" className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium hover:border-ink">See volunteer roles<ArrowDown className="size-4" aria-hidden /></a>
          </div>
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=75" alt="Mentoring session with young professionals" className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="scroll-mt-24 border-y border-ink/10 bg-white/40">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8">
          <div className="mb-10 flex items-end justify-between gap-4"><div><Eyebrow>Impact</Eyebrow><h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">Roles and contributions</h2></div><p className="text-sm text-muted">{volunteerRoles.length} roles</p></div>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {volunteerRoles.map((r) => (
              <li key={r.role} className="flex flex-col rounded-3xl bg-sand p-6 ring-1 ring-ink/5 md:p-8">
                <div className="flex items-center gap-4"><span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white font-display text-lg">{r.org.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span><div><p className="text-sm text-muted">{r.org}</p><p className="text-sm font-medium">{r.years}</p></div></div>
                {r.tag && <div className="mt-5"><Tag tone="dark">{r.tag}</Tag></div>}
                <h3 className="mt-5 font-display text-xl leading-tight font-medium">{r.role}</h3>
                <a href={r.link === 'View gallery' ? '#events' : '/blog'} className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium">{r.link}<ArrowRight className="size-4" aria-hidden /></a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Balance & equity */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-8">
        <Eyebrow>Balance & equity</Eyebrow>
        <h2 className="mb-10 max-w-3xl font-display text-4xl font-medium tracking-tight md:text-5xl">Safeguarding fairness at work and in the community</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {equity.map((e) => (
            <article key={e.title} className="rounded-3xl border-l-4 border-brand bg-white/70 p-8 ring-1 ring-ink/5">
              <div className="flex items-center justify-between gap-4"><Tag tone="dark">Balance & Equity</Tag><span className="text-sm text-muted">{e.years}</span></div>
              <h3 className="mt-5 font-display text-2xl font-medium">{e.title}</h3>
              <p className="mt-3 text-muted">{e.body}</p>
              <a href="/blog" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">Read the article<ArrowRight className="size-4" aria-hidden /></a>
            </article>
          ))}
        </div>
      </section>

      {/* Events */}
      <section id="events" className="scroll-mt-24 border-y border-ink/10 bg-white/40">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div><Eyebrow>Community training</Eyebrow><h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">Training and pitching events</h2></div>
            <div className="flex gap-2">
              <button type="button" aria-label="Previous events" disabled={page === 0} onClick={() => setPage(page - 1)} className="grid size-11 place-items-center rounded-full border border-ink/20 disabled:opacity-30"><ChevronLeft className="size-5" /></button>
              <button type="button" aria-label="Next events" disabled={page >= pages - 1} onClick={() => setPage(page + 1)} className="grid size-11 place-items-center rounded-full border border-ink/20 disabled:opacity-30"><ChevronRight className="size-5" /></button>
            </div>
          </div>
          <div className="mb-8 flex flex-wrap gap-2">
            {types.map((x) => <button key={x} type="button" aria-pressed={type === x} onClick={() => { setType(x); setPage(0) }} className={`rounded-full border px-4 py-2 text-sm transition ${type === x ? 'border-ink bg-ink text-sand' : 'border-ink/15 bg-white/50 hover:border-ink/40'}`}>{x}</button>)}
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {shown.map((e) => (
              <li key={e.name}>
                <img src={e.img} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" />
                <div className="mt-4 flex items-center justify-between gap-4"><p className="font-medium">{e.name} <span className="text-muted">· {e.date}</span></p><span className="text-xs text-muted">{e.type}</span></div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-right text-sm text-muted">{list.length ? `${page * 3 + 1}–${page * 3 + shown.length} of ${list.length}` : 'No events'}</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center md:px-8">
        <Eyebrow>What mentees say</Eyebrow>
        <div className="flex items-center gap-4">
          <button type="button" aria-label="Previous quote" onClick={() => setQ((q - 1 + testimonials.length) % testimonials.length)} className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/20"><ChevronLeft className="size-5" /></button>
          <figure className="flex-1" aria-live="polite">
            <p aria-hidden className="font-display text-6xl leading-none text-brand">“</p>
            <blockquote className="mt-2 font-display text-2xl leading-tight font-medium md:text-4xl">{t.quote}</blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-3"><span className="grid size-12 place-items-center rounded-full bg-white font-display">{t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span><span className="text-left"><span className="block font-medium">{t.name}</span><span className="text-sm text-muted">{t.role}</span></span></figcaption>
          </figure>
          <button type="button" aria-label="Next quote" onClick={() => setQ((q + 1) % testimonials.length)} className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/20"><ChevronRight className="size-5" /></button>
        </div>
        <div className="mt-8 flex justify-center gap-2">{testimonials.map((x, i) => <button key={x.name} type="button" aria-label={`Quote ${i + 1}`} aria-current={i === q} onClick={() => setQ(i)} className={`h-2 rounded-full transition-all ${i === q ? 'w-6 bg-ink' : 'w-2 bg-ink/25'}`} />)}</div>
      </section>
    </>
  )
}
