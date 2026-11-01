import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

export function SectionHead({ eyebrow, title, link, href = '#', size = 'text-4xl sm:text-5xl md:text-7xl lg:text-[84px]', center = false }: { eyebrow: string; title: ReactNode; link: string; href?: string; size?: string; center?: boolean }) {
  return (
    <div className={`reveal ${center ? 'mb-0 items-center text-center md:mb-0' : 'mb-10 md:mb-14'} flex flex-col gap-4 ${center ? '' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div>
        <p className="mb-3 text-xs tracking-[0.2em] text-muted uppercase">{eyebrow}</p>
        <h2 className={`${center ? 'mx-auto max-w-4xl' : 'max-w-3xl'} font-display leading-[1.02] font-medium tracking-tight ${size}`}>{title}</h2>
      </div>
      <a href={href} className={`group inline-flex items-center gap-2 text-sm font-medium ${center ? 'mt-2 rounded-full border border-ink/15 px-5 py-2.5' : ''}`}>
        {link}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </a>
    </div>
  )
}

export function Pill({ children, variant = 'dark', href = '#' }: { children: ReactNode; variant?: 'dark' | 'outline' | 'brand'; href?: string }) {
  const s = { dark: 'bg-ink text-sand hover:bg-black', outline: 'border border-ink/20 text-ink hover:border-ink', brand: 'bg-brand text-ink hover:brightness-95' }[variant]
  return <a data-magnetic href={href} className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition ${s}`}>{children}</a>
}
