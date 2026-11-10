import { useLayoutEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { gsap } from '../lib/gsap'

const assetPathPrefix = '/assets'
const imgIcon = `${assetPathPrefix}/b3948.svg`
const imgSkyline = `${assetPathPrefix}/032cd.png`
const imgKhalid = `${assetPathPrefix}/da7b6.png`
const imgDot = `${assetPathPrefix}/d9cd4.svg`

const bg =
  'radial-gradient(ellipse 48% 58% at 82% 8%, rgba(131,223,74,0.38) 0%, rgba(131,223,74,0) 58%), radial-gradient(ellipse 35% 54% at 12% 88%, rgba(196,156,108,0.32) 0%, rgba(196,156,108,0) 60%), linear-gradient(172deg, rgb(246,231,210) 7.7%, rgb(245,241,236) 46.6%, rgb(231,243,216) 92.3%)'
const veil =
  'linear-gradient(180deg, rgba(245,241,236,0.98) 4.9%, rgba(246,234,218,0.98) 27.7%, rgba(247,227,201,0.862) 58.8%, rgba(247,226,200,0) 81.6%)'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.h-in', { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.1, delay: 0.15 })
      gsap.from('.h-man', { x: 60, opacity: 0, duration: 1.4, ease: 'power3.out', delay: 0.3 })
      gsap.to('.h-sky', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <section id="home" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pt-20" style={{ backgroundImage: bg }}>
      <img src={imgSkyline} alt="" aria-hidden className="h-sky pointer-events-none absolute inset-0 size-full object-cover object-[50%_70%]" />
      <div aria-hidden className="absolute inset-0" style={{ backgroundImage: veil }} />

      {/* Portrait: mirrored and cropped to the upper body, as in the design */}
      <div className="h-man pointer-events-none absolute right-[-30%] bottom-0 aspect-[1319/829] h-[55%] overflow-hidden sm:right-[-20%] md:h-[72%] lg:right-[-8%] lg:h-[83%]">
        <img src={imgKhalid} alt="Khalid AlSuwaidi" className="absolute top-0 left-0 h-[238.68%] w-full max-w-none -scale-x-100" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-[30vh] md:px-8 md:pb-0">
        <div className="flex flex-col items-start gap-[38px]">
          <div className="flex flex-col items-start gap-3">
            <p className="h-in flex items-center gap-[10px] font-['Geist:Regular'] text-[18px] leading-8 text-[#222]">
              <img src={imgDot} alt="" className="size-3" />CEO, PELEVERSE
            </p>
            <h1 className="h-in max-w-[826px] font-display text-[44px] leading-[1] font-medium text-balance text-[#101c0e] sm:text-[60px] lg:text-[80px] lg:leading-[74px]">
              Bridging the Legacy of Governance with the Future of Gaming.
            </h1>
          </div>
          <div className="h-in flex flex-wrap items-center gap-3">
            <a data-magnetic href="#work" className="flex h-[50px] items-center justify-center gap-2 rounded-full border border-transparent bg-brand px-[18.4px] py-[10.4px] font-['Geist:Regular'] text-[16px] leading-[27px] tracking-[-0.165px] whitespace-nowrap text-[#14240c] sm:text-[18px]">
              View My Public Service Impact<img src={imgIcon} alt="" className="size-[22px]" />
            </a>
            <a data-magnetic href="#ventures" className="flex h-[50px] items-center justify-center rounded-full border border-[rgba(17,17,17,0.18)] bg-[rgba(255,252,248,0.7)] px-[18.4px] py-[10.4px] font-['Geist:Medium'] text-[15px] leading-[15px] font-medium tracking-[-0.165px] whitespace-nowrap text-ink">
              Explore Peleverse
            </a>
          </div>
        </div>
      </div>
      <a href="#journey" aria-label="Scroll to career journey" className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-ink/60 md:block">
        <ChevronDown className="size-5 animate-bounce" aria-hidden />
      </a>
    </section>
  )
}
