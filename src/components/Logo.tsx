type LogoProps = {
  dark?: boolean
  signature?: boolean
}

export function Logo({ dark = false, signature = false }: LogoProps) {
  if (signature) {
    return (
      <a href="#home" className="shrink-0" aria-label="Khalid AlSuwaidi, home">
        <img
          src={dark ? '/assets/khalid-signature-brand.png' : '/assets/khalid-signature.png'}
          alt="Khalid AlSuwaidi"
          className="h-12 w-auto sm:h-14"
        />
      </a>
    )
  }

  return (
    <a href="#home" className="flex items-center gap-3" aria-label="Khalid AlSuwaidi, home">
      <span className={`grid size-10 shrink-0 place-items-center rounded-full font-display text-[14px] leading-5 ${dark ? 'bg-sand text-ink' : 'bg-ink text-sand'}`}>KA</span>
      <span className="flex flex-col">
        <span className={`font-display text-[14px] leading-5 tracking-[0.35px] whitespace-nowrap ${dark ? 'text-sand' : 'text-ink'}`}>KHALID ALSUWAIDI</span>
        <span className={`text-[12px] leading-4 whitespace-nowrap ${dark ? 'text-white/50' : 'text-muted'}`}>Government | Innovation | Leadership</span>
      </span>
    </a>
  )
}
