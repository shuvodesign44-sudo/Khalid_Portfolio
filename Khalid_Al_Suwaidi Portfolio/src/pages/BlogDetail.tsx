import { useState } from 'react'
import { ArrowRight, Bookmark, BookmarkCheck, Play } from 'lucide-react'
import { articles } from '../data/pages'
import { CtaBand } from '../sections/CtaBand'
import { Eyebrow, Tag } from '../components/ui'
import { Meta } from './Blog'

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=900&q=75`
const photos = ['1540575467063-178a50c2df87', '1524178232363-1fb2b075b655', '1505373877841-8d25f7d46678', '1552664730-d307ca884978', '1522202176988-66273c2fd55f'].map(u)

/** P06: article template with reading column, sticky share rail, gallery, tags and related articles. */
export function BlogDetail({ slug }: { slug: string }) {
  const a = articles.find((x) => x.slug === slug) ?? articles[0]
  const related = articles.filter((x) => x.slug !== a.slug && x.cat === a.cat).concat(articles.filter((x) => x.cat !== a.cat)).slice(0, 3)
  const [saved, setSaved] = useState(false)
  const [video, setVideo] = useState(false)
  const share = (n: string) => `https://${{ in: 'www.linkedin.com/sharing/share-offsite/?url=', f: 'www.facebook.com/sharer/sharer.php?u=', X: 'x.com/intent/post?url=', WA: 'wa.me/?text=' }[n]}${encodeURIComponent(window.location.href)}`

  return (
    <article>
      <header className="mx-auto max-w-[1440px] px-5 pt-32 md:px-8 md:pt-40">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted"><a href="/blog" className="hover:text-ink">Thought Leadership</a> / <a href="/blog" className="hover:text-ink">Blog</a> / <span className="text-ink">{a.cat}</span></nav>
        <Tag>{a.cat}</Tag>
        <h1 className="mt-5 max-w-5xl font-display text-4xl leading-[1.05] font-medium tracking-tight md:text-6xl lg:text-7xl">{a.title}</h1>
        <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted">{a.excerpt}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-ink/10 py-5">
          <img src="/assets/khalid.png" alt="" className="size-12 rounded-full bg-white object-cover object-top" />
          <div className="flex-1"><p className="font-medium">Khalid AlSuwaidi</p><Meta {...a} /></div>
          <button type="button" aria-pressed={saved} onClick={() => setSaved(!saved)} className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm hover:border-ink">{saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}{saved ? 'Saved' : 'Save'}</button>
          <a href="#share" className="rounded-full border border-ink/15 px-4 py-2 text-sm hover:border-ink">Share</a>
        </div>
      </header>

      <figure className="mx-auto mt-10 max-w-[1100px] px-5">
        <img src={a.img.replace('w=900', 'w=1800').replace('w=1200', 'w=1800')} alt="" className="aspect-[16/9] w-full rounded-[2rem] object-cover" />
        <figcaption className="mt-3 text-sm text-muted">Photo: Peleverse / Khalid AlSuwaidi</figcaption>
      </figure>

      <div className="mx-auto grid max-w-[1100px] gap-10 px-5 py-16 lg:grid-cols-[80px_1fr]">
        <aside aria-label="Share" className="hidden lg:block">
          <div className="sticky top-28 flex flex-col items-center gap-2">
            <p className="mb-1 text-[11px] tracking-[0.18em] text-muted uppercase">Share</p>
            {['in', 'f', 'X', 'WA'].map((n) => <a key={n} href={share(n)} target="_blank" rel="noreferrer" aria-label={`Share on ${n}`} className="grid size-11 place-items-center rounded-full border border-ink/15 bg-white/60 text-xs font-medium hover:border-ink">{n}</a>)}
            <a href={`mailto:?subject=${encodeURIComponent(a.title)}&body=${encodeURIComponent(window.location.href)}`} aria-label="Share by email" className="grid size-11 place-items-center rounded-full border border-ink/15 bg-white/60 text-xs font-medium hover:border-ink">@</a>
          </div>
        </aside>

        <div className="mx-auto max-w-[680px] space-y-6 text-lg leading-[1.75] text-ink/85">
          <p>In thirteen years of public service, the hardest problems I have worked on were rarely technical. They were about people: how they learn, what keeps them motivated and why good intentions so often fail to change behaviour.</p>
          <p>This piece sets out what I have learned, where the evidence points and what I would do differently if I started again tomorrow.</p>
          <h2 className="pt-6 font-display text-3xl leading-tight font-medium text-ink">Start from the outcome, not the tool</h2>
          <p>Every successful programme I have led began with a clear statement of the change we wanted to see. Systems, platforms and frameworks came later. When we reversed that order, adoption suffered.</p>
          <blockquote className="my-10 border-l-4 border-brand pl-6">
            <p className="font-display text-2xl leading-snug font-medium text-ink md:text-3xl">"People do not resist change. They resist being changed without a reason they believe in."</p>
            <footer className="mt-3 text-sm text-muted">Khalid AlSuwaidi</footer>
          </blockquote>
          <p>That reason has to be visible in the first week, not promised for the end of the year. Small, early wins build the trust that larger reforms depend on.</p>
          <figure className="py-4"><img src={photos[1]} alt="Workshop participants" className="aspect-[16/9] w-full rounded-3xl object-cover" /><figcaption className="mt-3 text-sm text-muted">Leadership workshop, Abu Dhabi, 2024.</figcaption></figure>
          <p>Measurement matters too. We track participation, but we also track what happens months later: promotions, retention and the quality of decisions people make.</p>
          <figure className="py-4">
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-ink">
              {video ? <video className="size-full object-cover" src="/assets/journey.mp4" controls autoPlay playsInline /> : (
                <button type="button" onClick={() => setVideo(true)} className="group absolute inset-0" aria-label="Play video">
                  <img src={photos[0]} alt="" className="size-full object-cover opacity-70" />
                  <span className="absolute inset-0 m-auto grid size-20 place-items-center rounded-full bg-brand transition group-hover:scale-110"><Play className="size-7 fill-ink" /></span>
                </button>
              )}
            </div>
            <figcaption className="mt-3 text-sm text-muted">Talk recording: Government Summit, 2024.</figcaption>
          </figure>
          <p>None of this is complicated. It does take patience, honest data and leaders willing to stay with an idea long enough for it to work.</p>
        </div>
      </div>

      <section className="mx-auto max-w-[1100px] space-y-14 px-5 pb-20">
        <div>
          <div className="mb-5 flex items-end justify-between"><div><Eyebrow>Event gallery</Eyebrow><h2 className="font-display text-2xl font-medium">Seminar photos</h2></div><p className="text-sm text-muted">12 photos</p></div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {photos.map((p, i) => <div key={p} className="relative aspect-square overflow-hidden rounded-2xl"><img src={p} alt="" loading="lazy" className="size-full object-cover" />{i === 4 && <span className="absolute inset-0 grid place-items-center bg-ink/60 font-display text-3xl text-white">+7</span>}</div>)}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">{['HRMD', 'Expert', 'G2G Framework', 'Leadership'].map((t) => <a key={t} href="/blog" className="rounded-full border border-ink/15 bg-white/60 px-4 py-2 text-sm hover:border-ink">{t}</a>)}</div>
      </section>

      <CtaBand />

      <section className="border-t border-ink/10 bg-white/40">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8">
          <div className="mb-10 flex items-end justify-between gap-4"><div><Eyebrow>Related</Eyebrow><h2 className="font-display text-3xl font-medium md:text-4xl">More in {a.cat}</h2></div><a href="/blog" className="inline-flex items-center gap-2 text-sm font-medium">All {a.cat} articles<ArrowRight className="size-4" aria-hidden /></a></div>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <a key={r.slug} href={`/blog/${r.slug}`} className="group flex gap-4 rounded-3xl bg-sand p-4 ring-1 ring-ink/5 transition hover:shadow-lg">
                <img src={r.img} alt="" className="w-28 shrink-0 rounded-2xl object-cover" />
                <div className="py-1"><Tag>{r.cat}</Tag><h3 className="mt-2 font-display text-lg leading-tight font-medium">{r.title}</h3><div className="mt-2"><Meta {...r} /></div></div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
