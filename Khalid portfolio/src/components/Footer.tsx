import { BriefcaseBusiness, Camera, Gamepad2, AtSign, CirclePlay, Mail, MapPin } from 'lucide-react'
import { Logo } from './Logo'

const cols = [
  { h: 'Explore', l: ['About', 'My Work', 'Ventures', 'Volunteer', 'Get in Touch'] },
  { h: 'Thought leadership', l: ['Blog', 'Newsletter', 'Speaking', 'Media'] },
]
const socials = [{ I: BriefcaseBusiness, n: 'LinkedIn' }, { I: Camera, n: 'Instagram' }, { I: Gamepad2, n: 'Peleverse' }, { I: AtSign, n: 'X' }, { I: CirclePlay, n: 'YouTube' }]

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-2 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
        <div>
          <Logo dark signature />
          <p className="mt-6 max-w-xs text-sm">Abu Dhabi-based public-service leader and CEO & Founder of Peleverse, bridging government tradition and gaming innovation.</p>
        </div>
        {cols.map((c) => (
          <div key={c.h}><h3 className="mb-5 font-display text-white">{c.h}</h3><ul className="space-y-3 text-sm">{c.l.map((x) => <li key={x}><a href="#" className="hover:text-white">{x}</a></li>)}</ul></div>
        ))}
        <div>
          <h3 className="mb-5 font-display text-white">Contact</h3>
          <p className="flex items-center gap-2 text-sm"><Mail className="size-4" aria-hidden /><a href="mailto:hello@khalidalsuwaidi.ae" className="hover:text-white">hello@khalidalsuwaidi.ae</a></p>
          <p className="mt-3 flex items-center gap-2 text-sm"><MapPin className="size-4" aria-hidden />Abu Dhabi | Dubai</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <h3 className="mb-5 font-display text-white">Stay informed</h3>
          <div className="flex rounded-full bg-white/10 p-1">
            <label htmlFor="f-email" className="sr-only">Email</label>
            <input id="f-email" type="email" required placeholder="Email address" className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40" />
            <button className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-ink">Join</button>
          </div>
          <div className="mt-6 flex gap-2">{socials.map(({ I, n }) => <a key={n} href="#" aria-label={n} className="grid size-10 place-items-center rounded-full border border-white/15 transition hover:border-brand hover:text-brand"><I className="size-4" aria-hidden /></a>)}</div>
        </form>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-6 text-xs md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Khalid AlSuwaidi. All rights reserved.</p>
          <div className="flex gap-5"><a href="#" className="hover:text-white">Privacy</a><a href="#" className="hover:text-white">Cookie</a><span><button className="text-white">EN</button> | <button>AR</button></span></div>
        </div>
      </div>
    </footer>
  )
}
