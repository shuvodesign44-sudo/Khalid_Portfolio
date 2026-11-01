import { useEffect, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { nav } from '../data/content'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'bg-sand/85 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-xl' : 'bg-sand/40 backdrop-blur-sm'}`}>
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-8">
        <Logo signature />
        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-6 text-[13px]">
            {nav.map((n) => (
              <li key={n.label} className="group relative">
                <a href={n.href} className="flex items-center gap-1 text-ink/75 transition hover:text-ink">
                  {n.label}{n.children && <ChevronDown className="size-3.5" aria-hidden />}
                </a>
                {n.children && (
                  <ul className="invisible absolute top-full left-0 mt-3 w-44 rounded-2xl border border-ink/5 bg-white p-2 opacity-0 shadow-xl transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    {n.children.map((c) => <li key={c.label}><a href={c.href} className="block rounded-xl px-3 py-2 hover:bg-sand">{c.label}</a></li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-5 text-[13px] lg:flex">
          <span><button className="font-medium">EN</button> <span className="text-ink/30">|</span> <button className="text-ink/50 hover:text-ink">AR</button></span>
          <a href="#" className="text-ink/75 hover:text-ink">Sign in</a>
          <a href="#contact" className="rounded-full bg-brand px-5 py-2.5 font-medium text-ink transition hover:brightness-95">Book a consultation</a>
        </div>
        <button className="xl:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="border-t border-ink/5 bg-sand px-5 pb-6 xl:hidden" aria-label="Mobile">
          {nav.map((n) => <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="block border-b border-ink/5 py-3 font-display text-xl">{n.label}</a>)}
          <a href="#contact" className="mt-5 inline-block rounded-full bg-brand px-5 py-3 text-sm font-medium">Book a consultation</a>
        </nav>
      )}
    </header>
  )
}
