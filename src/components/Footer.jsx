import { Link } from 'react-router-dom'
import { OFICIAL } from '../data/catalogo.js'

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto max-w-6xl px-5 py-12 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="font-semibold mb-2">Cursos · Pietro Mauro</div>
          <p className="text-fog leading-relaxed">IA aplicada que opera resultado. Cursos práticos e objetivos sobre Claude, em português.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Navegar</div>
          <ul className="space-y-1.5 text-fog">
            <li><Link to="/" className="hover:text-cloud">Todos os cursos</Link></li>
            <li><Link to="/claude-code" className="hover:text-cloud">Claude Code na Prática</Link></li>
            <li><Link to="/sobre" className="hover:text-cloud">Sobre</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Crédito</div>
          <p className="text-fog leading-relaxed">
            {OFICIAL.nota}{' '}
            <a href={OFICIAL.base} target="_blank" rel="noreferrer" className="text-brand hover:underline">Cursos oficiais da Anthropic ↗</a>
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-fog">
          <span>© {new Date().getFullYear()} Pietro Mauro · IA que opera resultado</span>
          <a href="https://piemauro.com.br" target="_blank" rel="noreferrer" className="hover:text-cloud">piemauro.com.br</a>
        </div>
      </div>
    </footer>
  )
}
