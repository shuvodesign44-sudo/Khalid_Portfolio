import { useEffect, useRef, useState, type WheelEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { awards } from '../data/content'
import { SectionHead } from '../components/ui'
import { useReveal } from '../lib/useReveal'

const n = awards.length
/** Shortest signed distance from the active card, so the deck wraps endlessly. */
const offsetOf = (i: number, active: number) => {
  let d = (i - active) % n
  if (d > n / 2) d -= n
  if (d < -n / 2) d += n
  return d
}

export function Recognition() {
  const ref = useRef<HTMLElement>(null); useReveal(ref)
  const [active, setActive] = useState(0)
  const go = (d: number) => setActive((a) => (a + d + n) % n)
  const cur = awards[active]
  const VISIBLE = 2
  const [paused, setPaused] = useState(false)
  const drag = useRef<number | null>(null)
  const wheelLock = useRef(0)

  // Gentle auto-advance; pauses on hover/focus/drag
  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => go(1), 4500)
    return () => clearInterval(t)
  }, [paused, active])

  const onWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaX) < 20 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return
    const now = Date.now()
    if (now - wheelLock.current < 600) return
    wheelLock.current = now
    go(e.deltaX > 0 ? 1 : -1)
  }

  return (
    <section id="recognition" ref={ref} className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHead eyebrow="Recognition" title="Awards and Recognition" link="See all awards" center size="text-[7.4vw] whitespace-nowrap sm:text-5xl md:text-7xl lg:text-[84px]" />
      </div>

      {/* Fan deck: centre card on top, neighbours tucked behind with a slight tilt */}
      <div
        className="relative mx-auto mt-6 h-[262px] max-w-[1440px] touch-pan-y select-none [--w:200px] md:mt-9 md:h-[388px] md:[--w:296px]"
        role="group" aria-roledescription="carousel" aria-label="Awards" tabIndex={0}
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
        onKeyDown={(e) => { if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1) }}
        onWheel={onWheel}
        onPointerDown={(e) => { drag.current = e.clientX }}
        onPointerUp={(e) => {
          if (drag.current === null) return
          const dx = e.clientX - drag.current; drag.current = null
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
        }}
        onPointerCancel={() => { drag.current = null }}
      >
        {awards.map((a, i) => {
          const d = offsetOf(i, active)
          const k = Math.abs(d)
          const hidden = k > VISIBLE
          const x = [0, 0.68, 1.06][Math.min(k, 2)] * Math.sign(d)
          const y = [0, 22, 46][Math.min(k, 2)]
          const scale = [1, 0.93, 0.86][Math.min(k, 2)]
          return (
            <button
              key={a.title}
              type="button"
              aria-label={`${a.title}, ${a.year}`}
              aria-current={d === 0}
              tabIndex={hidden ? -1 : 0}
              onClick={() => d !== 0 && setActive(i)}
              className="absolute bottom-0 left-1/2 aspect-[296/384] w-[var(--w)] overflow-hidden rounded-[18px] bg-ink shadow-[0_24px_50px_-20px_rgba(0,0,0,0.4)] transition-[transform,opacity] duration-[800ms] ease-[cubic-bezier(.65,0,.35,1)] outline-none focus-visible:ring-2 focus-visible:ring-ink md:rounded-[22px]"
              style={{
                transform: `translateX(calc(-50% + var(--w) * ${x})) translateY(${hidden ? 60 : y}px) rotate(${d * 6.5}deg) scale(${hidden ? 0.8 : scale})`,
                opacity: hidden ? 0 : 1,
                zIndex: 10 - k,
                pointerEvents: hidden ? 'none' : 'auto',
                cursor: d === 0 ? 'default' : 'pointer',
              }}
            >
              <img src={a.img} alt={a.alt} loading="lazy" draggable={false} className="size-full object-cover" />
            </button>
          )
        })}
      </div>

      {/* Caption flanked by round arrows, as in the reference */}
      <div className="mx-auto mt-14 grid w-full md:mt-16 max-w-[560px] grid-cols-[44px_1fr_44px] items-center gap-4 px-5 box-content">
        <button onClick={() => go(-1)} aria-label="Previous award" className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-white transition hover:scale-105 hover:bg-black"><ChevronLeft className="size-5" aria-hidden /></button>
        <div key={active} className="min-w-0 animate-[fade_0.6s_ease-out] text-center" aria-live="polite">
          <h3 className="font-display text-lg leading-tight font-medium md:text-xl">{cur.title}</h3>
          <p className="mt-1 font-mono text-xs text-muted md:text-sm">{cur.body} · {cur.year}</p>
        </div>
        <button onClick={() => go(1)} aria-label="Next award" className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-white transition hover:scale-105 hover:bg-black"><ChevronRight className="size-5" aria-hidden /></button>
      </div>
    </section>
  )
}
