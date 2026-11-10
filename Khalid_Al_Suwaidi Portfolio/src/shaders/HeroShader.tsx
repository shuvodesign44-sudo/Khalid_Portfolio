import { Shader, LinearGradient, Aurora, FilmGrain } from 'shaders/react'

/** WebGPU atmospheric sunset sky. A CSS gradient sits beneath as a fallback. */
export function HeroShader() {
  return (
    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,#2a2346_0%,#a0526a_38%,#f0a35e_62%,#f7d79a_100%)]">
      <Shader className="absolute inset-0 h-full w-full">
        <LinearGradient colorA="#2b2448" colorB="#f6b46a" angle={180} />
        <Aurora colorA="#ff9a5a" colorB="#ffd38a" colorC="#c25b7a" intensity={0.55} speed={0.25} height={0.6} curtainCount={3} opacity={0.7} />
        <FilmGrain strength={0.06} animated />
      </Shader>
    </div>
  )
}
