import { Link } from 'react-router-dom'
import { CURSO } from '../data/estrutura.js'

export default function Footer() {
  const o = CURSO.creditoOficial
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto max-w-6xl px-5 py-12 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="font-semibold mb-2">Claude Code na Prática</div>
          <p className="text-fog leading-relaxed">{CURSO.subtitulo}</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Navegar</div>
          <ul className="space-y-1.5 text-fog">
            <li><Link to="/" className="hover:text-cloud">Início</Link></li>
            <li><Link to="/aula/boas-vindas" className="hover:text-cloud">Começar do zero</Link></li>
            <li><Link to="/sobre" className="hover:text-cloud">Sobre o curso</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Crédito</div>
          <p className="text-fog leading-relaxed">
            Releitura própria em português. Conteúdo original e gratuito por <span className="text-cloud">{o.autor}</span>:{' '}
            <a href={o.url} target="_blank" rel="noreferrer" className="text-brand hover:underline">{o.nome} ↗</a>
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
