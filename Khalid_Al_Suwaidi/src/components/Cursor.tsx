import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

/** Follower cursor plus magnetic pull on [data-magnetic] elements. Pointer-fine devices only. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const x = gsap.quickTo(dot.current, 'x', { duration: 0.35, ease: 'power3' })
    const y = gsap.quickTo(dot.current, 'y', { duration: 0.35, ease: 'power3' })
    const move = (e: PointerEvent) => {
      x(e.clientX); y(e.clientY)
      const hot = (e.target as HTMLElement).closest('a,button')
      gsap.to(dot.current, { scale: hot ? 3 : 1, duration: 0.3 })
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2)
        const near = Math.hypot(dx, dy) < 90
        gsap.to(el, { x: near ? dx * 0.3 : 0, y: near ? dy * 0.3 : 0, duration: 0.5, ease: 'power3.out' })
      })
    }
    addEventListener('pointermove', move)
    return () => removeEventListener('pointermove', move)
  }, [])
  return <div ref={dot} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[70] -mt-2 -ml-2 hidden size-4 rounded-full bg-brand mix-blend-difference [@media(pointer:fine)]:block" />
}
