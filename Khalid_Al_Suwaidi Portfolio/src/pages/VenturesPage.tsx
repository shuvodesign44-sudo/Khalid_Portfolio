import { ArrowDown, ArrowRight, ArrowUpRight, Play } from 'lucide-react'
import { ventures } from '../data/content'
import { g2gStages } from '../data/pages'
import { Eyebrow, PageIntro, Tag } from '../components/ui'

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1400&q=75`
const assetPathPrefix = '/assets'
const imgPeleverseLogo = `${assetPathPrefix}/bc8d9.png`
const jump = [['Peleverse', 'peleverse'], ['Rehla 71', 'titles'], ['Shara 71', 'titles'], ['Al Mandoos', 'titles'], ['Consultancy', 'consultancy'], ['Other ventures', 'other']]

/** P04: entrepreneurial portfolio. */
export function VenturesPage() {
  return (
    <>
      <PageIntro eyebrow="Ventures" title="Ventures as tools for national engagement" lede="Every venture starts from the same question: how do we get people to care about the things that matter to the country? Games, advice and technology are simply different answers.">
        <nav aria-label="Jump to venture" className="mt-10 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm text-muted">Jump to</span>
          {jump.map(([l, id]) => <a key={l} href={`#${id}`} className="rounded-full border border-ink/15 bg-white/60 px-4 py-2 text-sm transition hover:border-ink">{l}</a>)}
        </nav>
      </PageIntro>

      {/* G2G framework */}
      <section id="g2g" className="scroll-mt-24 border-y border-ink/10 bg-white/50">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:px-8 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <Eyebrow>The G2G framework</Eyebrow>
            <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">Game-to-Government</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">A four-stage method for turning policy goals into experiences citizens choose to take part in. It sits behind every Peleverse title.</p>
            <a href="#peleverse" className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium hover:border-ink">How G2G works<ArrowDown className="size-4" aria-hidden /></a>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {g2gStages.map((s, i) => (
              <li key={s.title} className="relative rounded-3xl bg-sand p-6 ring-1 ring-ink/5">
                <span className="grid size-10 place-items-center rounded-full bg-brand font-display font-medium">{i + 1}</span>
                <h3 className="mt-6 font-display text-xl font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.body}</p>
                {i < g2gStages.length - 1 && <ArrowRight aria-hidden className="absolute top-1/2 -right-3.5 hidden size-5 -translate-y-1/2 text-ink/30 lg:block" />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Peleverse */}
      <section id="peleverse" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
        <div className="overflow-hidden rounded-[2rem] bg-white/70 ring-1 ring-ink/5">
          <div className="relative">
            <img src="/assets/rehla-71.png" alt="Peleverse key art" className="h-[340px] w-full object-cover object-[50%_70%] md:h-[480px]" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-end gap-4 md:bottom-8 md:left-10">
              <div className="grid size-20 place-items-center rounded-2xl bg-[#0f1d2a] md:size-24">
                <img src={imgPeleverseLogo} alt="Peleverse logo" className="size-11 object-contain md:size-14" />
              </div>
              <div className="flex gap-2 pb-1"><Tag tone="dark">Gaming</Tag><a href="#g2g" className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium">G2G framework<ArrowUpRight className="size-3" aria-hidden /></a></div>
            </div>
          </div>
          <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="font-display text-4xl font-medium md:text-5xl">Peleverse</h2>
              <p className="mt-6 text-xs tracking-[0.2em] text-muted uppercase">Higher purpose</p>
              <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted">A games studio rooted in Emirati heritage. Peleverse builds mobile games that carry national stories, values and history to a new generation, in a format they already love.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white hover:bg-black">Visit website<ArrowUpRight className="size-4" aria-hidden /></a>
                <a href="#titles" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium hover:border-ink"><Play className="size-4" aria-hidden />Preview</a>
                <a href="#" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium hover:border-ink">Share<ArrowUpRight className="size-4" aria-hidden /></a>
              </div>
            </div>
            <div className="lg:border-l lg:border-ink/10 lg:pl-10">
              <p className="text-xs tracking-[0.2em] text-muted uppercase">Leadership</p>
              <ul className="mt-5 space-y-4">
                {[{ n: 'Khalid AlSuwaidi', r: 'CEO & Founder', img: '/assets/khalid.png' }, { n: 'Mohammed Sobhy', r: 'Co-founder & CTO', img: null }].map((m) => (
                  <li key={m.n} className="flex items-center gap-4">
                    {m.img ? <img src={m.img} alt="" className="size-14 rounded-full bg-sand object-cover object-top" /> : <span className="grid size-14 place-items-center rounded-full bg-sand font-display">MS</span>}
                    <div><p className="font-medium">{m.n}</p><p className="text-sm text-muted">{m.r}</p></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="titles" className="scroll-mt-24 border-t border-ink/10 p-6 md:p-10">
            <p className="mb-6 text-xs tracking-[0.2em] text-muted uppercase">Titles</p>
            <div className="grid gap-6 md:grid-cols-3">
              {ventures.map((v) => (
                <article key={v.name} className="overflow-hidden rounded-3xl bg-sand ring-1 ring-ink/5">
                  <img src={v.art} alt={`${v.name} key art`} style={{ objectPosition: v.pos }} className="aspect-[16/10] w-full object-cover" />
                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <img src={v.art} alt="" style={{ objectPosition: v.pos }} className="size-12 rounded-xl object-cover" />
                      <div className="flex-1"><h3 className="font-display text-xl font-medium">{v.name}</h3><p className="text-xs text-muted">Mobile game</p></div>
                    </div>
                    <p className="mt-4 text-sm text-muted">{v.blurb}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <a href="#" className="rounded-full bg-ink px-4 py-2 text-xs font-medium text-white">App Store</a>
                      <a href="#" className="rounded-full bg-ink px-4 py-2 text-xs font-medium text-white">Google Play</a>
                      <a href="#" className="ml-auto inline-flex items-center gap-1 text-sm font-medium">Preview<Play className="size-3.5" aria-hidden /></a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consultancy */}
      <section id="consultancy" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-20 md:px-8">
        <div className="grid overflow-hidden rounded-[2rem] bg-white/70 ring-1 ring-ink/5 lg:grid-cols-2">
          <img src={u('1497366216548-37526070297c')} alt="" className="h-72 w-full object-cover lg:h-full" />
          <div className="p-6 md:p-12">
            <div className="flex items-center gap-3"><span className="grid size-14 place-items-center rounded-2xl bg-sand font-display text-lg">KA</span><Tag tone="dark">Consultancy</Tag></div>
            <h2 className="mt-6 font-display text-3xl font-medium md:text-4xl">KA Advisory</h2>
            <p className="mt-5 text-xs tracking-[0.2em] text-muted uppercase">Higher purpose</p>
            <p className="mt-2 text-lg leading-relaxed text-muted">Helping government entities build workforce plans, structures and leadership programmes that last, drawing on thirteen years inside the system.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="/book?type=hr" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white hover:bg-black">Book a consultation<ArrowRight className="size-4" aria-hidden /></a>
              <a href="#" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium hover:border-ink">Share<ArrowUpRight className="size-4" aria-hidden /></a>
              <span className="ml-auto flex items-center gap-2 text-sm text-muted"><span className="flex -space-x-2">{['KA', 'MS', 'RH'].map((x) => <span key={x} className="grid size-9 place-items-center rounded-full bg-sand text-[11px] font-medium ring-2 ring-white">{x}</span>)}</span>Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Other ventures */}
      <section id="other" className="mx-auto grid max-w-[1440px] scroll-mt-24 gap-6 px-5 pb-24 md:grid-cols-2 md:px-8 md:pb-32">
        {[
          { tag: 'Tech startup', name: 'Talentry', body: 'An AI assistant that helps HR teams forecast skills gaps and plan hiring months ahead.', img: u('1551288049-bebda4e38f71'), stores: true },
          { tag: 'Social enterprise', name: 'Qudwa', body: 'Pairing young Emiratis with experienced mentors from across public and private sectors.', img: u('1522202176988-66273c2fd55f'), stores: false },
        ].map((v) => (
          <article key={v.name} className="overflow-hidden rounded-[2rem] bg-white/70 ring-1 ring-ink/5">
            <div className="relative"><img src={v.img} alt="" className="aspect-[16/9] w-full object-cover" /><span className="absolute bottom-4 left-4 grid size-14 place-items-center rounded-2xl bg-sand font-display text-lg">{v.name[0]}</span></div>
            <div className="p-6 md:p-8">
              <Tag tone="dark">{v.tag}</Tag>
              <h2 className="mt-4 font-display text-3xl font-medium">{v.name}</h2>
              <p className="mt-3 text-muted">{v.body}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <a href="#" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white hover:bg-black">Visit website<ArrowUpRight className="size-4" aria-hidden /></a>
                {v.stores ? <><a href="#" className="rounded-full border border-ink/20 px-5 py-3 text-sm hover:border-ink">App Store</a><a href="#" className="rounded-full border border-ink/20 px-5 py-3 text-sm hover:border-ink">Google Play</a></> : <a href="#" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm hover:border-ink">Share<ArrowUpRight className="size-4" aria-hidden /></a>}
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
