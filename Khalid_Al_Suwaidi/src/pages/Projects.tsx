import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { allProjects, expertise } from '../data/content'

const filters = ['All', ...expertise] as const

/** "My Work" index: intro, headline stats, expertise filter and the full project grid. */
export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const list = useMemo(() => (filter === 'All' ? allProjects : allProjects.filter((p) => p.area === filter)), [filter])
  const stats = [
    { label: 'Years of service', value: '13' },
    { label: 'Areas of expertise', value: String(expertise.length) },
  ]

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        {/* Background photo with a left-weighted scrim so the copy stays legible */}
        <img src="/assets/projects-hero.jpg" alt="" aria-hidden className="absolute inset-0 size-full object-cover object-[70%_center]" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/10" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/60 to-transparent" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 pt-36 pb-16 md:px-8 md:pt-44 md:pb-24 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="max-w-4xl font-display text-5xl leading-[1.02] font-medium tracking-tight md:text-7xl lg:text-[88px]">
              Thirteen years of public service and <span className="bg-[linear-gradient(transparent_55%,var(--color-brand)_55%)] px-0.5 text-white">HRMD</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/80">Workforce models, organisational design, grievance systems and leadership programmes delivered across Abu Dhabi government, each measured by the outcome it produced.</p>
          </div>
          <dl className="flex gap-8 border-t border-white/20 pt-6 lg:mr-16 lg:flex-col lg:gap-6 lg:border-t-0 lg:border-l lg:border-white/20 lg:pt-0 lg:pl-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-white/70">{s.label}</dt>
                <dd className="font-display text-3xl font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="filter-label" className="mx-auto max-w-[1440px] px-5 pt-14 pb-24 md:px-8 md:pt-20 md:pb-32">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span id="filter-label" className="mr-2 text-sm text-muted">Filter by expertise</span>
            {filters.map((f) => (
              <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-sm transition ${filter === f ? 'border-ink bg-ink text-sand' : 'border-ink/15 bg-white/50 hover:border-ink/40'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <li key={p.title}>
              <a href={`/projects/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white/70 ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt="" loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 rounded-full bg-sand/90 px-3 py-1 text-xs font-medium backdrop-blur">{p.area}</span>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="text-xs tracking-wide text-muted">{p.years}</p>
                  <h2 className="mt-2 font-display text-2xl leading-tight font-medium">{p.title}</h2>
                  <p className="mt-4 text-sm text-muted"><span className="font-medium text-ink">Key outcome:</span> {p.outcome}</p>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <ul className="flex flex-wrap gap-1.5">{p.tech.map((t) => <li key={t} className="rounded-full border border-ink/10 px-2.5 py-1 text-xs">{t}</li>)}</ul>
                    <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium">View case study<ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
