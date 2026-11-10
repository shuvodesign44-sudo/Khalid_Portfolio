import { ArrowRight } from 'lucide-react'
import { useState, type ReactNode } from 'react'

export function SectionHead({ eyebrow, title, link, href = '#', size = 'text-4xl sm:text-5xl md:text-7xl lg:text-[84px]', center = false }: { eyebrow: string; title: ReactNode; link: string; href?: string; size?: string; center?: boolean }) {
  return (
    <div className={`reveal ${center ? 'mb-0 items-center text-center md:mb-0' : 'mb-10 md:mb-14'} flex flex-col gap-4 ${center ? '' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div>
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

/** Light page intro used by inner pages: ruled eyebrow, display headline, optional lede and trailing slot. */
export function PageIntro({ eyebrow, title, lede, aside, children }: { eyebrow: string; title: ReactNode; lede?: ReactNode; aside?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 size-[560px] rounded-full bg-brand/20 blur-[120px]" />
      <div className="relative mx-auto max-w-[1440px] px-5 pt-36 pb-14 md:px-8 md:pt-44 md:pb-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="max-w-4xl font-display text-5xl leading-[1.02] font-medium tracking-tight md:text-7xl">{title}</h1>
            {lede && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>}
          </div>
          {aside}
        </div>
        {children}
      </div>
    </section>
  )
}

export function Eyebrow(_props: { children: ReactNode; light?: boolean }) {
  return null
}

export function Tag({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' | 'brand' }) {
  const s = { light: 'border border-ink/10 bg-white/80 text-ink', dark: 'bg-ink text-sand', brand: 'bg-brand text-ink' }[tone]
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${s}`}>{children}</span>
}

/** Share buttons; "Copy link" copies the current URL and confirms inline. */
export function ShareRow({ title }: { title: string }) {
  const url = typeof window === 'undefined' ? '' : window.location.href
  const e = encodeURIComponent
  const links = [
    { n: 'LinkedIn', h: `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}` },
    { n: 'Facebook', h: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}` },
    { n: 'X', h: `https://x.com/intent/post?url=${e(url)}&text=${e(title)}` },
    { n: 'WhatsApp', h: `https://wa.me/?text=${e(`${title} ${url}`)}` },
    { n: 'Email', h: `mailto:?subject=${e(title)}&body=${e(url)}` },
  ]
  const cls = 'rounded-full border border-ink/15 bg-white/60 px-4 py-2 text-sm transition hover:border-ink'
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => <a key={l.n} href={l.h} target="_blank" rel="noreferrer" className={cls}>{l.n}</a>)}
      <CopyLink className={cls} />
    </div>
  )
}

function CopyLink({ className }: { className: string }) {
  const [done, setDone] = useState(false)
  return (
    <button type="button" className={className} onClick={() => { navigator.clipboard?.writeText(window.location.href); setDone(true); setTimeout(() => setDone(false), 1800) }}>
      {done ? 'Copied' : 'Copy link'}
    </button>
  )
}

/** Inline newsletter sign-up with language and consent, used on blog pages. */
export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [sent, setSent] = useState(false)
  if (sent) return <p className={`rounded-2xl px-5 py-4 text-sm ${dark ? 'bg-white/10' : 'bg-brand/20'}`}>Almost there. Check your inbox to confirm your subscription.</p>
  const field = dark ? 'bg-white/10 text-white placeholder:text-white/50' : 'border border-ink/15 bg-white placeholder:text-ink/40'
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="nlf-email">Email address</label>
        <input id="nlf-email" type="email" required placeholder="Email address" className={`h-12 flex-1 rounded-full px-5 outline-none focus:ring-2 focus:ring-brand ${field}`} />
        <label className="sr-only" htmlFor="nlf-lang">Language</label>
        <select id="nlf-lang" className={`h-12 rounded-full px-4 outline-none ${field}`}><option>EN</option><option>AR</option></select>
        <button className={`h-12 rounded-full px-6 text-sm font-medium transition ${dark ? 'bg-brand text-ink hover:brightness-95' : 'bg-ink text-white hover:bg-black'}`}>Subscribe</button>
      </div>
      <label className={`flex items-start gap-2 text-xs ${dark ? 'text-white/70' : 'text-muted'}`}><input type="checkbox" required className="mt-0.5 accent-[var(--color-brand)]" />I agree to receive the newsletter and accept the privacy policy.</label>
    </form>
  )
}
