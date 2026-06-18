import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Aurora from './components/Aurora.jsx'

const V2 = import.meta.env.VITE_SKIN === 'v2'
import Home from './pages/Home.jsx'
import Curso from './pages/Curso.jsx'
import Aula from './pages/Aula.jsx'
import Sobre from './pages/Sobre.jsx'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col bg-ink bg-grid">
      {V2 && <Aurora />}
      <ScrollProgress />
      <Nav />
      <ScrollTop />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/:cursoSlug" element={<Curso />} />
            <Route path="/:cursoSlug/:aulaSlug" element={<Aula />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
