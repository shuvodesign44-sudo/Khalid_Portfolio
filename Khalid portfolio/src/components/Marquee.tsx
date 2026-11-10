const words = ['Gaming', 'Governance', 'Innovation', 'Leadership', 'Public Service', 'Technology', 'Youth Empowerment', 'Digital Transformation', 'Policy', 'Social Impact', 'Progress']
export function Marquee() {
  const row = words.flatMap((w) => [w, '✦'])
  return (
    <div aria-hidden className="overflow-hidden border-y border-ink/10 py-4 md:py-5">
      <style>{`@keyframes mq{to{transform:translateX(-50%)}}`}</style>
      <div className="flex w-max gap-8 font-display text-3xl font-medium tracking-tight whitespace-nowrap md:gap-10 md:text-5xl md:leading-none [animation:mq_50s_linear_infinite] motion-reduce:[animation:none]">
        {[...row, ...row].map((w, i) => <span key={i} className={w === '✦' ? 'text-brand' : ''}>{w}</span>)}
      </div>
    </div>
  )
}
