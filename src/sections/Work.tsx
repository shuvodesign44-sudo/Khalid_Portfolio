import { useRef } from 'react'
import { projects } from '../data/content'
import { SectionHead } from '../components/ui'
import { useReveal } from '../lib/useReveal'

export function Work() {
  const ref = useRef<HTMLElement>(null); useReveal(ref)
  return (
    <section id="work" ref={ref} className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32">
      <SectionHead eyebrow="My work" title={<>Featured public-service<br />projects</>} size="text-[7.6vw] whitespace-nowrap sm:text-5xl md:text-7xl lg:text-[5.25rem]" link="View all work" />
      <div className="flex flex-col gap-8">
        {projects.map((p, i) => (
          <article key={p.title} style={{ top: 96 + i * 28 }} className="group sticky grid h-[640px] grid-rows-[280px_1fr] overflow-hidden rounded-[32px] md:h-[460px] md:grid-rows-1 bg-white shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.25)] md:grid-cols-2">
            <div className="h-full overflow-hidden"><img src={p.img} alt="" loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" /></div>
            <div className="flex flex-col justify-center p-7 md:p-14">
              <div className="mb-4 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="rounded-full bg-brand/25 px-3 py-1 text-xs">{t}</span>)}</div>
              <h3 className="font-display text-3xl leading-tight font-medium md:text-5xl">{p.title}</h3>
              <p className="mt-3 text-sm text-muted">{p.outcome}</p>
              <div className="mt-6 flex gap-2 border-t border-ink/5 pt-4">{p.tech.map((t) => <span key={t} className="rounded-full border border-ink/10 px-3 py-1 text-xs text-muted">{t}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
