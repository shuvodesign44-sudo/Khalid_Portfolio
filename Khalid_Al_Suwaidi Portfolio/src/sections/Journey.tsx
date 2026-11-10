import { useEffect, useLayoutEffect, useRef } from 'react'
import { timeline } from '../data/content'
import { gsap, ScrollTrigger } from '../lib/gsap'

const VIDEO_SRC = '/assets/journey.mp4'

/**
 * Pinned scroll scene over a scroll-scrubbed video; the timeline reveals year by year.
 * Scroll progress drives `video.currentTime` directly (no playback). The file is encoded
 * all-intra so forward and reverse seeks resolve instantly.
 */
export function Journey() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  // Target scroll progress (0–1), written by ScrollTrigger and read by the rAF scrub loop.
  const progress = useRef(0)

  // Video scrubbing: buffer the whole file, then ease currentTime toward the scroll target each frame.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let raf = 0
    let ready = false
    let shown = 0
    let objectUrl = ''
    const ctrl = new AbortController()

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!ready || video.seeking) return // never queue seeks; skip until the last one lands
      const target = progress.current * (video.duration - 0.05)
      const next = shown + (target - shown) * 0.25
      // Snap when close so it settles on the exact frame and stops seeking at rest.
      const t = Math.abs(target - next) < 1 / 48 ? target : next
      if (Math.abs(t - video.currentTime) < 1 / 96) return
      shown = t
      video.currentTime = t
    }

    const enable = () => {
      video.pause()
      ready = true
    }
    video.addEventListener('loadeddata', enable, { once: true })
    // Fully buffer as a blob so every seek is local and reverse scrubbing never stalls on the network.
    fetch(VIDEO_SRC, { signal: ctrl.signal })
      .then((r) => r.blob())
      .then((b) => {
        objectUrl = URL.createObjectURL(b)
        video.src = objectUrl
      })
      .catch(() => {
        if (!ctrl.signal.aborted) video.src = VIDEO_SRC
      })
    raf = requestAnimationFrame(tick)
    return () => {
      ctrl.abort()
      cancelAnimationFrame(raf)
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [])

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.t-card')
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
            progress.current = s.progress
            const idx = Math.min(cards.length - 1, Math.floor(s.progress * cards.length))
            cards.forEach((c, i) => c.classList.toggle('is-on', i <= idx))
          },
        },
      })
      tl.to('.j-track', { x: () => -(document.querySelector<HTMLElement>('.j-track')!.scrollWidth - window.innerWidth + 80), ease: 'none' }, 0)
        .to('.j-progress', { scaleX: 1, ease: 'none' }, 0)
      return () => ScrollTrigger.refresh()
    })
    return () => mm.revert()
  }, [])
  return (
    <section id="journey" ref={ref} className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-sand py-24">
      {/* Scroll-scrubbed video backdrop; the poster holds the first frame so nothing shifts while it loads */}
      <div aria-hidden className="absolute inset-0 bg-[url('/assets/journey-poster.jpg')] bg-cover bg-center">
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          poster="/assets/journey-poster.jpg"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
        />
        {/* Soft light scrim keeps the dark headline and cards legible over the sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-sand/85 via-sand/25 to-sand/10" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/25 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-8">
        <div className="mb-10 flex -translate-y-10 flex-col gap-6 md:-translate-y-20 md:flex-row md:items-end md:gap-6">
          <div>
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
