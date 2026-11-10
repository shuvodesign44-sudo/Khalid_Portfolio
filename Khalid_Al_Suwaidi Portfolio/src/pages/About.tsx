import { useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { awards, timeline } from '../data/content'
import { ShareRow, Tag } from '../components/ui'

const cats = ['All', 'Government', 'Innovation', 'Leadership', 'Community'] as const
const awardCat: (typeof cats)[number][] = ['Government', 'Innovation', 'Innovation', 'Leadership', 'Government', 'Leadership', 'Government', 'Community']
const learning = [
  { title: 'MSc Human Resource Management', inst: 'United Arab Emirates University', kind: 'Degree', year: '2012' },
  { title: 'Government Leadership Programme', inst: 'Mohammed bin Rashid Centre for Leadership', kind: 'Programme', year: '2018' },
  { title: 'Strategic Workforce Planning', inst: 'CIPD', kind: 'Certification', year: '2020' },
  { title: 'Game Design Fundamentals', inst: 'CalArts (online)', kind: 'Certification', year: '2023' },
]
const media = [
  { title: 'Games as a tool for national engagement', where: 'Government Summit, Dubai', date: '12 Feb 2025', kind: 'Talk' },
  { title: 'From HR to heritage games: a founder story', where: 'The National', date: '03 Dec 2024', kind: 'Interview' },
  { title: 'Peleverse launches Rehla 71 across the GCC', where: 'Khaleej Times', date: '18 Sep 2024', kind: 'Press' },
  { title: 'Leading through ambiguity in the public sector', where: 'HR Summit Abu Dhabi', date: '22 May 2024', kind: 'Talk' },
]
const jumps = [['Biography', 'story'], ['Career', 'timeline'], ['Awards', 'awards'], ['Education', 'learning'], ['Media', 'media']]

/** P09: profile, biography, career timeline, awards, learning and media. */
export function About() {
  const [cat, setCat] = useState<(typeof cats)[number]>('All')
  const [year, setYear] = useState('All years')
  const years = ['All years', ...[...new Set(awards.map((a) => a.year))].sort().reverse()]
  const list = awards.map((a, i) => ({ ...a, cat: awardCat[i] })).filter((a) => (cat === 'All' || a.cat === cat) && (year === 'All years' || a.year === year)).sort((a, b) => +b.year - +a.year)

  return (
    <>
      {/* Profile */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 size-[560px] rounded-full bg-brand/20 blur-[120px]" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 pt-36 pb-20 md:px-8 md:pt-44 lg:grid-cols-[440px_1fr] lg:items-center">
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#efe6d8] to-[#e6f0dc]">
            <img src="/assets/khalid.png" alt="Portrait of Khalid AlSuwaidi" className="aspect-[4/5] w-full object-cover object-top" />
          </div>
          <div>
            <h1 className="font-display text-5xl leading-[1.02] font-medium tracking-tight md:text-7xl">Khalid AlSuwaidi</h1>
            <p className="mt-6 max-w-2xl font-display text-2xl leading-snug font-medium">Public-service leader, HR specialist and founder of <span className="bg-[linear-gradient(transparent_55%,var(--color-brand)_55%)] px-0.5">Peleverse</span></p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">For thirteen years I have helped Abu Dhabi government build the workforce, structures and leaders it needs. Today I also build games that carry Emirati stories to a new generation.</p>
            <dl className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[['13', 'Years of public service'], ['CEO', 'Peleverse'], [String(awards.length), 'Awards'], ['40+', 'Talks and interviews']].map(([v, l]) => (
                <div key={l} className="rounded-3xl bg-white/70 p-5 ring-1 ring-ink/5"><dd className="font-display text-4xl font-medium">{v}</dd><dt className="mt-1 text-sm text-muted">{l}</dt></div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/book" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white hover:bg-black">Book a consultation<ArrowRight className="size-4" aria-hidden /></a>
              <a href="/contact" className="rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium hover:border-ink">Get in touch</a>
              <a href="#share" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium hover:border-ink">Share<ArrowUpRight className="size-4" aria-hidden /></a>
            </div>
            <nav aria-label="Jump to section" className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span>Jump to</span>{jumps.map(([l, id]) => <a key={id} href={`#${id}`} className="hover:text-ink">{l}</a>)}
            </nav>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section id="story" className="scroll-mt-24 border-y border-ink/10 bg-white/40">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:px-8 lg:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">My story</h2>
          <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-ink/80">
            <p>I joined public service in 2013 as an HR officer working on federal workforce programmes. It taught me early that most organisational problems are really people problems, and that good data makes them easier to solve.</p>
            <p>Over the next decade I led manpower planning for Abu Dhabi, redesigned the structures of more than forty government entities and launched a national leadership academy that has certified thousands of leaders.</p>
            <p>In 2022 I founded Peleverse, a games studio rooted in Emirati heritage. Our titles, starting with Rehla 71, turn national stories into experiences young people choose to play. The Game-to-Government framework that guides them is how I connect both halves of my work.</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
        <h2 className="mb-14 max-w-3xl font-display text-4xl font-medium tracking-tight md:text-5xl">Thirteen years shaping people and public service</h2>
        <ol className="relative mx-auto max-w-5xl before:absolute before:top-0 before:bottom-0 before:left-4 before:w-px before:bg-ink/15 md:before:left-1/2">
          {timeline.map((t, i) => (
            <li key={t.year} className={`relative mb-8 pl-12 md:w-1/2 md:pl-0 ${i % 2 ? 'md:ml-auto md:pl-12' : 'md:pr-12'}`}>
              <span aria-hidden className={`absolute top-6 left-[11px] size-3 rounded-full ring-4 ring-sand ${i === timeline.length - 1 ? 'border-2 border-ink bg-sand' : 'bg-ink'} ${i % 2 ? 'md:-left-1.5' : 'md:right-[-6px] md:left-auto'}`} />
              <div className="rounded-3xl bg-white/80 p-6 ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-lg">
                <p className="font-display text-3xl font-medium">{t.year}</p>
                <h3 className="mt-3 font-display text-xl font-medium">{t.title}</h3>
                <p className="mt-1 text-muted">{t.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Awards */}
      <section id="awards" className="scroll-mt-24 border-y border-ink/10 bg-white/40">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8">
          <h2 className="mb-8 font-display text-4xl font-medium tracking-tight md:text-5xl">Awards and recognitions</h2>
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor="aw-year">Year</label>
              <select id="aw-year" value={year} onChange={(e) => setYear(e.target.value)} className="h-10 rounded-full border border-ink/15 bg-white px-4 text-sm outline-none">{years.map((y) => <option key={y}>{y}</option>)}</select>
              {cats.map((c) => <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-2 text-sm transition ${cat === c ? 'border-ink bg-ink text-sand' : 'border-ink/15 bg-white/50 hover:border-ink/40'}`}>{c}</button>)}
            </div>
            <p className="text-sm text-muted" aria-live="polite">{list.length} awards</p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((a) => (
              <li key={a.title} className="flex flex-col overflow-hidden rounded-3xl bg-sand ring-1 ring-ink/5">
                <div className="relative aspect-[4/3] bg-white"><img src={a.img} alt={a.alt} loading="lazy" className="size-full object-cover" /><span className="absolute top-4 right-4"><Tag>{a.cat}</Tag></span></div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm text-muted">{a.year}</p>
                  <h3 className="mt-1 font-display text-xl leading-tight font-medium">{a.title}</h3>
                  <p className="mt-1 text-sm text-muted">{a.body}</p>
                  <a href="#" className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium">View<ArrowUpRight className="size-4" aria-hidden /></a>
                </div>
              </li>
            ))}
          </ul>
          {list.length === 0 && <p className="text-muted">No awards match these filters.</p>}
        </div>
      </section>

      {/* Learning + media */}
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:px-8 lg:grid-cols-2">
        <div id="learning" className="scroll-mt-24">
          <h2 className="mb-6 font-display text-3xl font-medium md:text-4xl">Learning</h2>
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {learning.map((l) => (
              <li key={l.title} className="flex items-center gap-4 py-5">
                <div className="flex-1"><p className="font-medium">{l.title}</p><p className="text-sm text-muted">{l.inst}</p></div>
                <Tag>{l.kind}</Tag><span className="w-12 text-right text-sm text-muted">{l.year}</span>
              </li>
            ))}
          </ul>
        </div>
        <div id="media" className="scroll-mt-24">
          <h2 className="mb-6 font-display text-3xl font-medium md:text-4xl">Talks, interviews and press</h2>
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {media.map((m) => (
              <li key={m.title}><a href="#" className="group flex items-center gap-4 py-5">
                <span className="w-20 shrink-0"><Tag tone={m.kind === 'Press' ? 'brand' : 'light'}>{m.kind}</Tag></span>
                <div className="flex-1"><p className="font-medium group-hover:underline group-hover:decoration-brand group-hover:decoration-2 group-hover:underline-offset-4">{m.title}</p><p className="text-sm text-muted">{m.where} · {m.date}</p></div>
                <ArrowUpRight className="size-4 text-muted" aria-hidden />
              </a></li>
            ))}
          </ul>
          <a href="/blog" className="mt-5 inline-flex items-center gap-2 text-sm font-medium">Show all media<ArrowRight className="size-4" aria-hidden /></a>
        </div>
      </section>

      {/* Work with Khalid */}
      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-8">
        <div className="grid gap-10 rounded-[2rem] bg-ink p-8 text-white md:p-14 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-medium md:text-5xl">Speaking, advice or partnership?</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/book" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-medium text-ink hover:brightness-95">Book a consultation<ArrowRight className="size-4" aria-hidden /></a>
              <a href="/contact" className="rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium hover:border-white">Get in touch</a>
            </div>
          </div>
          <div id="share" className="scroll-mt-24 rounded-3xl bg-white p-6 text-ink lg:p-8">
            <h3 className="mb-4 font-display text-xl font-medium">Share this profile</h3>
            <ShareRow title="Khalid AlSuwaidi" />
          </div>
        </div>
      </section>
    </>
  )
}
