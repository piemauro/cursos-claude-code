import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Terminal, Menu, X } from 'lucide-react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { const f = () => setScrolled(window.scrollY > 12); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f) }, [])
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? 'bg-ink/85 backdrop-blur-md border-b border-line' : 'bg-transparent'}`}>
      <nav className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-brand/15 border border-brand/30 text-brand group-hover:bg-brand/25 transition">
            <Terminal size={17} />
          </span>
          <span className="font-semibold tracking-tight">Claude Code <span className="text-fog font-normal">na Prática</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm">
          <Link to="/" className="text-fog hover:text-cloud transition">Início</Link>
          <Link to="/aula/boas-vindas" className="text-fog hover:text-cloud transition">Começar</Link>
          <Link to="/sobre" className="text-fog hover:text-cloud transition">Sobre</Link>
          <a href="https://piemauro.com.br" target="_blank" rel="noreferrer" className="px-3.5 py-1.5 rounded-lg bg-cloud text-ink font-medium hover:bg-white transition">piemauro.com.br</a>
        </div>
        <button className="md:hidden text-cloud" onClick={() => setOpen(!open)} aria-label="menu">{open ? <X /> : <Menu />}</button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-line bg-ink/95 backdrop-blur px-5 py-4 flex flex-col gap-3 text-sm">
          <Link to="/" className="text-fog">Início</Link>
          <Link to="/aula/boas-vindas" className="text-fog">Começar</Link>
          <Link to="/sobre" className="text-fog">Sobre</Link>
          <a href="https://piemauro.com.br" target="_blank" rel="noreferrer" className="text-brand">piemauro.com.br ↗</a>
        </div>
      )}
    </header>
  )
}
