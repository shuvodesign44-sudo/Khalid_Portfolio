import { useState } from 'react'
import { ArrowLeft, ArrowRight, Download, FileText, X } from 'lucide-react'
import { allProjects } from '../data/content'
import { projectDetail } from '../data/pages'
import { CtaBand } from '../sections/CtaBand'
import { Eyebrow, ShareRow, Tag } from '../components/ui'

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=75`
const gallery = [
  { img: u('1551288049-bebda4e38f71'), cap: 'Organisation chart' },
  { img: u('1460925895917-afdab827c52f'), cap: 'Planning diagram' },
  { img: u('1524178232363-1fb2b075b655'), cap: 'Training session' },
  { img: u('1552664730-d307ca884978'), cap: 'Leadership workshop' },
  { img: u('1540575467063-178a50c2df87'), cap: 'Programme launch' },
]

/** P03: case-study template, driven by the project slug. */
export function ProjectDetail({ slug }: { slug: string }) {
  const idx = Math.max(0, allProjects.findIndex((p) => p.slug === slug))
  const p = allProjects[idx]
  const d = projectDetail(p)
  const prev = allProjects[(idx - 1 + allProjects.length) % allProjects.length]
  const next = allProjects[(idx + 1) % allProjects.length]
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <>
      {/* Banner with overlapping title card */}
      <section className="mx-auto max-w-[1440px] px-5 pt-28 md:px-8 md:pt-32">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center justify-between text-sm text-muted">
          <ol className="flex items-center gap-2"><li><a href="/projects" className="hover:text-ink">My Work</a></li><li aria-hidden>/</li><li className="text-ink">{p.area}</li></ol>
          <a href="/projects" className="inline-flex items-center gap-1.5 hover:text-ink"><ArrowLeft className="size-4" aria-hidden />All projects</a>
        </nav>
        <div className="relative overflow-hidden rounded-[2rem]">
          <img src={p.img} alt="" className="h-[420px] w-full object-cover md:h-[560px]" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          <div className="absolute inset-x-4 bottom-4 max-w-2xl rounded-3xl bg-sand p-6 md:inset-x-auto md:bottom-8 md:left-8 md:p-10">
            <Tag>{p.area}</Tag>
            <h1 className="mt-4 font-display text-3xl leading-[1.05] font-medium tracking-tight md:text-5xl">{p.title}</h1>
            <p className="mt-4 text-sm text-muted">Abu Dhabi Government · {p.years}</p>
          </div>
        </div>
      </section>

      {/* Impact at a glance */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-20">
        <Eyebrow>Impact at a glance</Eyebrow>
        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {d.stats.map((s) => (
            <div key={s.l} className="rounded-3xl bg-white/70 p-6 ring-1 ring-ink/5 md:p-8">
              <dd className="font-display text-4xl font-medium md:text-5xl">{s.v}</dd>
              <dt className="mt-2 text-sm text-muted">{s.l}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Summary + sticky role card */}
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-20 md:px-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-12">
          <div>
            <Eyebrow>Executive summary</Eyebrow>
            <h2 className="font-display text-3xl font-medium">The challenge</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{d.challenge}</p>
            <h2 className="mt-10 font-display text-3xl font-medium">The mission</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{d.mission}</p>
          </div>
          <div className="rounded-3xl border-l-4 border-brand bg-white/70 p-8 ring-1 ring-ink/5 md:p-10">
            <Eyebrow>Outcome and impact</Eyebrow>
            <h3 className="font-display text-2xl leading-tight font-medium md:text-3xl">{p.outcome}</h3>
            <ul className="mt-6 space-y-3">
              {d.results.map((r, i) => <li key={r} className="flex gap-3 text-muted"><span className="font-medium text-ink">Result {i + 1}</span>{r}</li>)}
            </ul>
          </div>
        </div>
        <aside className="h-fit rounded-3xl bg-ink p-8 text-white/80 lg:sticky lg:top-24">
          <Eyebrow light>My role</Eyebrow>
          <h3 className="font-display text-2xl font-medium text-white">{p.area} Lead</h3>
          <p className="mt-6 text-sm font-medium text-white">Responsibilities</p>
          <ul className="mt-3 space-y-2 text-sm">{d.responsibilities.map((r) => <li key={r} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />{r}</li>)}</ul>
          <dl className="mt-8 space-y-3 border-t border-white/15 pt-6 text-sm">
            {[['Domain', p.area], ['Period', p.years], ['Organisation', 'Abu Dhabi Government entity']].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4"><dt className="text-white/50">{k}</dt><dd className="text-right text-white">{v}</dd></div>
            ))}
          </dl>
        </aside>
      </section>

      {/* Visual evidence */}
      <section className="border-y border-ink/10 bg-white/40">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div><Eyebrow>Visual evidence</Eyebrow><h2 className="font-display text-3xl font-medium md:text-4xl">Charts, plans and training</h2></div>
            <p className="text-sm text-muted">{gallery.length + 4} images</p>
          </div>
          <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
            {gallery.map((g, i) => (
              <button key={g.cap} type="button" onClick={() => setLightbox(i)} className={`group relative overflow-hidden rounded-3xl ${i === 0 ? 'aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto' : 'aspect-[4/3]'}`}>
                <img src={g.img} alt={g.cap} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" />
                {i === gallery.length - 1 && <span className="absolute inset-0 grid place-items-center bg-ink/60 font-display text-4xl text-white">+4</span>}
              </button>
            ))}
          </div>
          <div className="mt-12">
            <Eyebrow>Technical stack</Eyebrow>
            <div className="flex flex-wrap gap-2">{[...p.tech, 'HRIS platform'].filter((t, i, a) => a.indexOf(t) === i).map((t) => <span key={t} className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm">{t}</span>)}</div>
          </div>
        </div>
      </section>

      {/* Featured quote */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center md:px-8">
        <p aria-hidden className="font-display text-6xl leading-none text-brand">“</p>
        <blockquote className="mt-2 font-display text-3xl leading-tight font-medium md:text-4xl">Good workforce planning is not about predicting the future. It is about being ready for more than one.</blockquote>
        <p className="mt-6 text-sm text-muted">Khalid AlSuwaidi, Programme Lead</p>
      </section>

      {/* Share + documents + prev/next */}
      <section className="mx-auto max-w-[1440px] space-y-16 px-5 pb-24 md:px-8">
        <div><h2 className="mb-4 font-display text-xl font-medium">Share this project</h2><ShareRow title={p.title} /></div>
        <div>
          <Eyebrow>Supporting documents</Eyebrow>
          <ul className="divide-y divide-ink/10 rounded-3xl bg-white/70 ring-1 ring-ink/5">
            {d.docs.map((doc) => (
              <li key={doc.name} className="flex flex-wrap items-center gap-4 px-6 py-5">
                <FileText className="size-5 text-muted" aria-hidden />
                <span className="flex-1 font-medium">{doc.name}</span>
                <span className="text-sm text-muted">{doc.meta}</span>
                <a href="#" className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm hover:border-ink">Download<Download className="size-4" aria-hidden /></a>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[{ p: prev, dir: 'Previous project' }, { p: next, dir: 'Next project' }].map(({ p: x, dir }, i) => (
            <a key={dir} href={`/projects/${x.slug}`} className={`group flex items-center gap-5 rounded-3xl bg-white/70 p-4 ring-1 ring-ink/5 transition hover:shadow-lg ${i ? 'md:flex-row-reverse md:text-right' : ''}`}>
              <img src={x.img} alt="" className="size-24 shrink-0 rounded-2xl object-cover md:size-28" />
              <div className="min-w-0">
                <p className={`flex items-center gap-1.5 text-xs tracking-[0.18em] text-muted uppercase ${i ? 'md:justify-end' : ''}`}>{!i && <ArrowLeft className="size-3.5" aria-hidden />}{dir}{i ? <ArrowRight className="size-3.5" aria-hidden /> : null}</p>
                <p className="mt-2 font-display text-xl leading-tight font-medium">{x.title}</p>
                <div className="mt-2"><Tag>{x.area}</Tag></div>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center"><a href="/projects" className="inline-flex rounded-full border border-ink/20 px-6 py-3 text-sm font-medium hover:border-ink">All projects</a></div>
      </section>

      <CtaBand />

      {lightbox !== null && (
        <div role="dialog" aria-modal="true" aria-label={gallery[lightbox].cap} className="fixed inset-0 z-[70] grid place-items-center bg-ink/90 p-6" onClick={() => setLightbox(null)}>
          <button type="button" aria-label="Close" className="absolute top-6 right-6 grid size-11 place-items-center rounded-full bg-white/10 text-white"><X className="size-5" /></button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-5xl">
            <img src={gallery[lightbox].img.replace('w=1200', 'w=1800')} alt={gallery[lightbox].cap} className="max-h-[80vh] rounded-2xl" />
            <figcaption className="mt-3 text-center text-sm text-white/70">{gallery[lightbox].cap}</figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
