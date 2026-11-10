import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { Journey } from './sections/Journey'
import { Work } from './sections/Work'
import { Ventures } from './sections/Ventures'
import { Recognition } from './sections/Recognition'
import { Insights } from './sections/Insights'
import { Cursor } from './components/Cursor'
import { Marquee } from './components/Marquee'
import { CtaBand } from './sections/CtaBand'

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <Cursor />
      <Header />
      <main id="main">
        <Hero /><Marquee /><Journey /><Work /><Ventures /><Recognition /><Insights /><CtaBand />
      </main>
      <Footer />
    </>
  )
}
