import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from './gsap'

/** Fades/slides in every `.reveal` child of the scope as it enters the viewport. */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!scope.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el, i) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    }, scope)
    return () => ctx.revert()
  }, [scope])
}
