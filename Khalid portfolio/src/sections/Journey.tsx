import { useLayoutEffect, useRef } from 'react'
import { timeline } from '../data/content'
import { gsap, ScrollTrigger } from '../lib/gsap'

const WALK_FRAMES = Array.from({ length: 31 }, (_, i) => `/assets/walk/${i + 1}.png`)
/** Full walk cycles played across the pinned scroll distance. */
const WALK_CYCLES = 5

/** Walking PNG sequence; frames are swapped by the scroll timeline. All stay mounted so swaps never flash. */
function WalkingFigure({ className = '' }: { className?: string }) {
  return (
    <div className={`relative aspect-[641/900] ${className}`}>
      {WALK_FRAMES.map((src, i) => (
        <img key={src} src={src} alt="" width={641} height={900} className={`walk-frame absolute inset-0 size-full ${i === 0 ? 'visible' : 'invisible'}`} />
      ))}
    </div>
  )
}

/** Pinned scroll scene over a horizontally scrolling desert panorama; the timeline reveals year by year. */
export function Journey() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.t-card')
      const frames = gsap.utils.toArray<HTMLElement>('.walk-frame')
      const walk = { f: 0 }
      let shown = 0
      const showFrame = () => {
        const next = Math.floor(walk.f) % frames.length
        if (next === shown) return
        frames[shown].style.visibility = 'hidden'
        frames[next].style.visibility = 'visible'
        shown = next
      }
      // Cards inside the left dissolve mask (0–22% of the viewport) ignore hover so they never light up while faded.
      const markFaded = () => {
        const fadeEdge = window.innerWidth * 0.22
        cards.forEach((c) => {
          const r = c.getBoundingClientRect()
          c.classList.toggle('is-faded', window.innerWidth >= 768 && r.left + r.width / 2 < fadeEdge)
        })
      }
      const tl = gsap.timeline({
        onUpdate: markFaded,
        scrollTrigger: {
          trigger: ref.current, start: 'top top', end: () => `+=${window.innerHeight * 2.4}`, pin: true, scrub: 0.8, invalidateOnRefresh: true,
          onUpdate: (s) => {
            const idx = Math.min(cards.length - 1, Math.floor(s.progress * cards.length))
            cards.forEach((c, i) => c.classList.toggle('is-on', i <= idx))
          },
        },
      })
      tl.to('.j-track', { x: () => -(document.querySelector<HTMLElement>('.j-track')!.scrollWidth - window.innerWidth + 80), ease: 'none' }, 0)
        // Slow parallax drift: only travel part of the panorama instead of panning to its end.
        .fromTo('.j-pano', { backgroundPosition: '0% 50%' }, { backgroundPosition: '30% 50%', ease: 'none' }, 0)
        .to('.j-progress', { scaleX: 1, ease: 'none' }, 0)
        // Character walks only while scrolling (forward or backward) and holds its frame when scrolling stops.
        .to(walk, { f: frames.length * WALK_CYCLES - 0.001, ease: 'none', onUpdate: showFrame }, 0)
      return () => ScrollTrigger.refresh()
    })
    return () => mm.revert()
  }, [])
  return (
    <section id="journey" ref={ref} className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-sand py-24">
      {/* Desert backdrop */}
      <div aria-hidden className="absolute inset-0">
        <div className="j-pano absolute inset-0 bg-[url('/assets/journey-panorama.jpg')] bg-[length:auto_100%] bg-[position:0%_50%] bg-no-repeat" />
        {/* Walking figure, anchored to the left edge of the content grid */}
        <WalkingFigure className="j-char pointer-events-none absolute z-20 -bottom-[310px] left-5 w-[282px] md:left-[max(2rem,calc((100vw-1440px)/2+2rem))] md:w-[403px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-8">
        <div className="mb-10 flex -translate-y-10 flex-col gap-6 md:-translate-y-20 md:flex-row md:items-end md:gap-6">
          <div>
            <p className="mb-3 text-xs tracking-[0.2em] text-ink/80 uppercase">Career journey</p>
            <h2 className="max-w-3xl font-display text-4xl leading-[1.02] font-medium tracking-tight md:text-6xl">Thirteen years shaping people and public service</h2>
          </div>
          {/* Scroll progress, aligned with the headline's last line */}
          <div className="h-0.5 w-full min-w-0 bg-ink/25 md:mb-7 md:flex-1"><div className="j-progress h-full origin-left scale-x-0 bg-ink" /></div>
        </div>
      </div>
      {/* Cards dissolve as they leave on the left, mirroring their fade-in on the right */}
      <div className="relative z-10 -my-10 py-10 md:[mask-image:linear-gradient(to_right,transparent,black_22%,black_100%)]">
      <ol className="j-track relative top-[60px] z-10 flex gap-4 overflow-x-auto px-5 pb-4 md:gap-6 md:overflow-visible md:px-8 md:pl-[50vw]">
        {timeline.map((t) => (
          <li key={t.year} className="t-card group w-[78vw] shrink-0 rounded-3xl border border-dashed border-ink/20 bg-white/40 p-8 opacity-50 transition-all duration-500 hover:-translate-y-1 hover:!border-brand hover:!bg-brand hover:!opacity-100 hover:shadow-xl sm:w-[416px] md:p-10 [&.is-faded]:pointer-events-none [&.is-on]:border-solid [&.is-on]:border-ink/10 [&.is-on]:bg-white/90 [&.is-on]:opacity-100">
            <p className="font-display text-[62px] leading-none font-medium tracking-tight text-ink/30 transition group-hover:text-ink group-[.is-on]:text-ink">{t.year}</p>
            <span className="mt-8 mb-5 block h-1 w-10 rounded-full bg-ink/15 transition group-[.is-on]:bg-brand group-hover:!bg-ink" />
            <h3 className="font-display text-[26px] leading-tight font-medium">{t.title}</h3>
            <p className="mt-3 text-lg text-muted transition group-hover:text-ink/75">{t.body}</p>
          </li>
        ))}
      </ol>
      </div>
    </section>
  )
}
