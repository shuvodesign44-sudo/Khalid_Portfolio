/** Stylized Khalid: white kandura + ghutra, walking cycle driven by the CSS var --step (0..1 phases via animation). */
export function Character({ className = '', walking = true }: { className?: string; walking?: boolean }) {
  return (
    <svg viewBox="0 0 60 140" className={className} aria-hidden>
      <style>{`
        .lg{transform-box:fill-box;transform-origin:50% 0;animation:${walking ? 'sw 0.9s ease-in-out infinite' : 'none'}}
        .lg2{animation-delay:-0.45s}
        .bd{animation:${walking ? 'bb 0.45s ease-in-out infinite' : 'none'}}
        @keyframes sw{0%,100%{transform:rotate(16deg)}50%{transform:rotate(-16deg)}}
        @keyframes bb{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.5px)}}
      `}</style>
      <ellipse cx="30" cy="136" rx="18" ry="3" fill="#000" opacity=".18" />
      <g className="lg"><rect x="24" y="100" width="6" height="34" rx="3" fill="#d9d2c8" /></g>
      <g className="lg lg2"><rect x="30" y="100" width="6" height="34" rx="3" fill="#ebe5dc" /></g>
      <g className="bd">
        <path d="M18 44 Q30 36 42 44 L46 112 Q30 118 14 112 Z" fill="#fff" stroke="#e4ddd2" />
        <path d="M30 46 V96" stroke="#e4ddd2" strokeWidth="1.2" />
        <circle cx="30" cy="26" r="10" fill="#b98863" />
        <path d="M18 26 Q18 12 30 12 Q42 12 42 26 L46 60 Q30 54 14 60 Z" fill="#fafafa" stroke="#e4ddd2" />
        <rect x="19" y="14" width="22" height="4" rx="2" fill="#1a1a1a" />
        <circle cx="30" cy="28" r="8" fill="#b98863" />
        <path d="M24 31 Q30 37 36 31" fill="#3a2a20" />
      </g>
    </svg>
  )
}
