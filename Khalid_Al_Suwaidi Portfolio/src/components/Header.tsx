import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { nav } from '../data/content'

export function Header({ path = '/' }: { path?: string }) {
  const active = (href: string) => href !== '#' && href !== '/#home' && !href.startsWith('/#') && path.startsWith(href.split('#')[0])
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-xl' : 'bg-white/90 backdrop-blur-md'}`}>
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-8">
        <Logo />
        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-6 text-[13px]">
            {nav.map((n) => (
              <li key={n.label}>
                <a href={n.href} aria-current={active(n.href) ? 'page' : undefined} className={`flex items-center gap-1 border-b-2 py-1 transition hover:text-ink ${active(n.href) ? 'border-brand text-ink' : 'border-transparent text-ink/75'}`}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-5 text-[13px] lg:flex">
          <span><button className="font-medium">EN</button> <span className="text-ink/30">|</span> <button className="text-ink/50 hover:text-ink">AR</button></span>
          <a href="#" className="text-ink/75 hover:text-ink">Sign in</a>
          <a href="/book" className="rounded-full bg-brand px-5 py-2.5 font-medium text-ink transition hover:brightness-95">Book a consultation</a>
        </div>
        <button className="xl:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="border-t border-ink/5 bg-white px-5 pb-6 xl:hidden" aria-label="Mobile">
          {nav.map((n) => <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="block border-b border-ink/5 py-3 font-display text-xl">{n.label}</a>)}
          <a href="/book" className="mt-5 inline-block rounded-full bg-brand px-5 py-3 text-sm font-medium">Book a consultation</a>
        </nav>
      )}
    </header>
  )
}
