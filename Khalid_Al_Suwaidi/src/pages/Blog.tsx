import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { articles, blogCategories, shelf } from '../data/pages'
import { CtaBand } from '../sections/CtaBand'
import { Eyebrow, PageIntro, Tag } from '../components/ui'

const PAGE = 7

export function Meta({ read, date }: { read: string; date: string }) {
  return <p className="text-sm text-muted">{read} read · {date}</p>
}

/** P05: Thought Leadership listing with featured row, category filter, load more and a sticky reading shelf. */
export function Blog() {
  const [cat, setCat] = useState<(typeof blogCategories)[number]>('All')
  const [shown, setShown] = useState(PAGE)
  const [lead, ...side] = articles
  const list = useMemo(() => (cat === 'All' ? articles : articles.filter((a) => a.cat === cat)), [cat])
  const [newest, ...rest] = list
  const visible = rest.slice(0, shown - 1)

  return (
    <>
      <PageIntro eyebrow="Thought leadership" title="Insights on government, people and play" lede="Essays on workforce strategy, leadership and what happens when public service borrows from game design."
        aside={<a href="#newsletter" className="inline-flex shrink-0 items-center gap-2 text-sm font-medium">Newsletter archive<ArrowRight className="size-4" aria-hidden /></a>} />

      {/* Featured */}
      <section className="border-y border-ink/10 bg-white/40">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8">
          <Eyebrow>Featured insights</Eyebrow>
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <a href={`/blog/${lead.slug}`} className="group relative block min-h-[420px] overflow-hidden rounded-[2rem]">
              <img src={lead.img} alt="" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-4 bottom-4 max-w-lg rounded-3xl bg-sand p-6 md:bottom-6 md:left-6 md:p-8">
                <Tag>{lead.cat}</Tag>
                <h2 className="mt-3 font-display text-2xl leading-tight font-medium md:text-3xl">{lead.title}</h2>
                <div className="mt-3"><Meta {...lead} /></div>
              </div>
            </a>
            <div className="grid gap-6">
              {side.slice(0, 2).map((a) => (
                <a key={a.slug} href={`/blog/${a.slug}`} className="group flex gap-5 rounded-3xl bg-sand p-4 ring-1 ring-ink/5 transition hover:shadow-lg">
                  <img src={a.img} alt="" className="w-36 shrink-0 rounded-2xl object-cover md:w-44" />
                  <div className="py-2"><Tag>{a.cat}</Tag><h3 className="mt-3 font-display text-xl leading-tight font-medium group-hover:underline group-hover:decoration-brand group-hover:decoration-2 group-hover:underline-offset-4">{a.title}</h3><div className="mt-3"><Meta {...a} /></div></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter + grid + shelf */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => { setCat(c); setShown(PAGE) }}
                className={`rounded-full border px-4 py-2 text-sm transition ${cat === c ? 'border-ink bg-ink text-sand' : 'border-ink/15 bg-white/50 hover:border-ink/40'}`}>{c}</button>
            ))}
          </div>
          <p className="text-sm text-muted" aria-live="polite">{list.length} articles</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            {newest && (
              <a href={`/blog/${newest.slug}`} className="group mb-8 grid overflow-hidden rounded-3xl bg-white/70 ring-1 ring-ink/5 transition hover:shadow-xl md:grid-cols-2">
                <img src={newest.img} alt="" className="aspect-[4/3] size-full object-cover" />
                <div className="flex flex-col justify-center p-6 md:p-10"><Tag tone="brand">Newest · {newest.cat}</Tag><h2 className="mt-4 font-display text-3xl leading-tight font-medium">{newest.title}</h2><p className="mt-3 text-muted">{newest.excerpt}</p><div className="mt-5"><Meta {...newest} /></div></div>
              </a>
            )}
            <div className="grid gap-8 sm:grid-cols-2">
              {visible.map((a) => (
                <a key={a.slug} href={`/blog/${a.slug}`} className="group block">
                  <div className="aspect-[16/11] overflow-hidden rounded-3xl"><img src={a.img} alt="" loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" /></div>
                  <div className="mt-5"><Tag>{a.cat}</Tag></div>
                  <h3 className="mt-3 font-display text-2xl leading-tight font-medium group-hover:underline group-hover:decoration-brand group-hover:decoration-2 group-hover:underline-offset-4">{a.title}</h3>
                  <div className="mt-3"><Meta {...a} /></div>
                </a>
              ))}
            </div>
            {list.length === 0 && <p className="text-muted">No articles in this category yet.</p>}
            <div className="mt-14 text-center">
              {shown < list.length && <button type="button" onClick={() => setShown((s) => s + 4)} className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium hover:border-ink">Load more articles</button>}
              <p className="mt-3 text-sm text-muted">Showing {Math.min(shown, list.length)} of {list.length}</p>
            </div>
          </div>

          <aside className="h-fit rounded-3xl bg-white/70 p-6 ring-1 ring-ink/5 lg:sticky lg:top-24">
            <Eyebrow>Personal touches</Eyebrow>
            <h2 className="font-display text-2xl leading-tight font-medium">Books and technology shaping my leadership</h2>
            <ul className="mt-6 divide-y divide-ink/10">
              {shelf.map((s) => (
                <li key={s.title} className="flex gap-4 py-4">
                  <img src={s.img} alt={s.title} loading="lazy" className="size-14 shrink-0 rounded-xl object-cover" />
                  <div><p className="text-[11px] tracking-[0.18em] text-muted uppercase">{s.kind}</p><p className="font-medium">{s.title}</p><p className="text-sm text-muted">{s.note}</p></div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
