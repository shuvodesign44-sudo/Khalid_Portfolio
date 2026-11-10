import { useEffect, useState } from 'react'

/** Minimal client-side router: intercepts same-origin links whose path differs from the current page. */
export function usePath() {
  const [path, setPath] = useState(() => window.location.pathname)
  useEffect(() => {
    const go = (url: URL) => {
      setPath(url.pathname)
      // Wait for the new page to render, then honour the hash or start at the top.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const el = url.hash ? document.querySelector(url.hash) : null
        if (el) el.scrollIntoView()
        else window.scrollTo(0, 0)
      }))
    }
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element).closest('a')
      if (!a || a.target || !a.getAttribute('href')) return
      if (a.getAttribute('href') === '#') {
        e.preventDefault()
        return
      }
      const url = new URL(a.href)
      if (url.origin !== location.origin || url.pathname === location.pathname) return
      e.preventDefault()
      history.pushState(null, '', url)
      go(url)
    }
    const onPop = () => go(new URL(location.href))
    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPop)
    return () => { document.removeEventListener('click', onClick); window.removeEventListener('popstate', onPop) }
  }, [])
  return path
}
