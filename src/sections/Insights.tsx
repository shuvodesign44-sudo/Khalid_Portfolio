import { useRef } from 'react'
import { insights } from '../data/content'
import { SectionHead } from '../components/ui'
import { useReveal } from '../lib/useReveal'

export function Insights() {
  const ref = useRef<HTMLElement>(null); useReveal(ref)
  return (
    <section id="insights" ref={ref} className="mx-auto max-w-[1440px] px-5 pb-24 md:px-8 md:pb-32">
      <SectionHead eyebrow="Thought leadership" title="Latest insights" link="All insights" />
      <div className="grid gap-8 md:grid-cols-3">
        {insights.map((p) => (
          <a key={p.title} href="#" className="reveal group block">
            <div className="aspect-[16/11] overflow-hidden rounded-3xl"><img src={p.img} alt="" loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" /></div>
            <p className="mt-5 text-xs tracking-[0.18em] text-muted uppercase">{p.cat}</p>
            <h3 className="mt-2 font-display text-2xl leading-tight font-medium group-hover:underline group-hover:decoration-brand group-hover:decoration-2 group-hover:underline-offset-4">{p.title}</h3>
            <p className="mt-3 text-sm text-muted">{p.read} read · {p.date}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
