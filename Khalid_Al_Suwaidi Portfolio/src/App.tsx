import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { Journey } from './sections/Journey'
import { Work } from './sections/Work'
import { Ventures } from './sections/Ventures'
import { Recognition } from './sections/Recognition'
import { Insights } from './sections/Insights'
import { Cursor } from './components/Cursor'
import { CtaBand } from './sections/CtaBand'
import { Projects } from './pages/Projects'
import { ProjectDetail } from './pages/ProjectDetail'
import { VenturesPage } from './pages/VenturesPage'
import { Blog } from './pages/Blog'
import { BlogDetail } from './pages/BlogDetail'
import { Volunteer } from './pages/Volunteer'
import { Contact } from './pages/Contact'
import { About } from './pages/About'
import { Book } from './pages/Book'
import { BookingConfirmed } from './pages/BookingConfirmed'
import { ManageBooking } from './pages/ManageBooking'
import { usePath } from './lib/router'

export default function App() {
  const path = usePath()
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <Cursor />
      <Header path={path} />
      <main id="main">
        {route(path.replace(/\/$/, '') || '/')}
      </main>
      <Footer />
    </>
  )
}

/** Maps a pathname to its page; unknown paths fall back to home. */
function route(path: string) {
  const [, a, b] = path.split('/')
  if (a === 'projects') return b ? <ProjectDetail key={b} slug={b} /> : <Projects />
  if (a === 'ventures') return <VenturesPage />
  if (a === 'blog') return b ? <BlogDetail key={b} slug={b} /> : <Blog />
  if (a === 'volunteer') return <Volunteer />
  if (a === 'contact') return <Contact />
  if (a === 'about') return <About />
  if (a === 'book') return b === 'confirmed' ? <BookingConfirmed /> : b === 'manage' ? <ManageBooking /> : <Book key={location.search} />
  return <><Hero /><Journey /><Work /><Ventures /><Recognition /><Insights /><CtaBand /></>
}
