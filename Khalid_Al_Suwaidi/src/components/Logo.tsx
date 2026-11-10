/** Handwritten signature mark: black on the light header, brand green on the dark footer. */
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="/#home" className="flex items-center" aria-label="Khalid AlSuwaidi, home">
      <img
        src={dark ? '/assets/logo-signature-green.png' : '/assets/logo-signature.png'}
        alt="Khalid AlSuwaidi"
        width={dark ? 4124 : 4123}
        height={2389}
        className={dark ? 'h-16 w-auto' : 'h-12 w-auto'}
      />
    </a>
  )
}
