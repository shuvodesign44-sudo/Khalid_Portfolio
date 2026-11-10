import { useRef, useState } from 'react'
import { Apple, Play, ArrowUpRight, Plus } from 'lucide-react'
import { ventures } from '../data/content'
import { SectionHead } from '../components/ui'
import { useReveal } from '../lib/useReveal'

/** Expanding accordion: the active panel grows, the others collapse into strips. */
export function Ventures() {
  const ref = useRef<HTMLElement>(null); useReveal(ref)
  const [active, setActive] = useState(0)
  return (
    <section id="ventures" ref={ref} className="bg-ink py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHead eyebrow="Ventures" title="Peleverse and wider ventures" link="Discuss a similar project" />
        <div className="reveal flex h-[680px] flex-col gap-3 md:h-[600px] md:flex-row" onMouseLeave={() => undefined}>
          {ventures.map((v, i) => {
            const on = active === i
            return (
              <article
                key={v.name}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative min-h-0 min-w-0 overflow-hidden rounded-[28px] ring-1 ring-white/10 transition-[flex-grow] duration-[800ms] ease-[cubic-bezier(.65,0,.35,1)]"
                style={{ flex: `${on ? 5 : 1} 1 0%` }}
              >
                <img src={v.art} alt="" loading="lazy" style={{ objectPosition: (v as { pos?: string }).pos }} className={`absolute inset-0 size-full object-cover transition duration-[900ms] ${on ? 'scale-100 opacity-100' : 'scale-110 opacity-60'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
                <div className="absolute inset-0 transition-opacity duration-500" style={{ background: v.hue, mixBlendMode: 'soft-light', opacity: on ? 0.15 : 0.5 }} />

                {/* Collapsed label */}
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={on}
                  aria-label={`Show ${v.name}`}
                  className={`absolute inset-0 flex items-center justify-between gap-4 p-5 text-left transition-opacity duration-500 md:flex-col md:justify-between md:py-7 ${on ? 'pointer-events-none opacity-0' : 'opacity-100 delay-300'}`}
                >
                  <span aria-hidden className="size-9" />
                  <span className="font-display text-3xl font-medium whitespace-nowrap md:text-5xl md:[writing-mode:vertical-rl] md:rotate-180">{v.name}</span>
                  <span className="grid size-9 place-items-center rounded-full bg-white/15 backdrop-blur"><Plus className="size-4" aria-hidden /></span>
                </button>

                {/* Expanded content */}
                <div className={`absolute inset-x-0 bottom-0 flex flex-col gap-5 p-6 transition-all duration-700 md:p-10 ${on ? 'translate-y-0 opacity-100 delay-300' : 'pointer-events-none translate-y-6 opacity-0'}`}>
                  <h3 className="font-display text-4xl leading-none font-medium md:text-6xl">{v.name}</h3>
                  <p className="max-w-md text-white/75">{v.blurb}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <a href="#" tabIndex={on ? 0 : -1} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs text-ink"><Apple className="size-3.5" aria-hidden />App Store</a>
                    <a href="#" tabIndex={on ? 0 : -1} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs text-ink"><Play className="size-3.5" aria-hidden />Google Play</a>
                    <a href="#" tabIndex={on ? 0 : -1} className="inline-flex items-center gap-1 px-2 text-xs font-medium">Preview<ArrowUpRight className="size-3.5" aria-hidden /></a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
