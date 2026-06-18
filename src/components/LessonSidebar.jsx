import { Link } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { getCurso, getVizinhas } from '../lib/cursos.js'
import { ICONS, accentOf } from './Bits.jsx'

// Navegação lateral da aula (telas grandes): lista as aulas do curso, destaca a atual.
export default function LessonSidebar({ cursoSlug, aulaSlug }) {
  const c = getCurso(cursoSlug)
  if (!c) return null
  const { indice, total } = getVizinhas(cursoSlug, aulaSlug)
  const Icon = ICONS[c.icone] || ICONS.Sparkles
  const ac = accentOf(c.accent)
  const pct = total ? Math.round(((indice + 1) / total) * 100) : 0
  let n = 0
  return (
    <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-fog hover:text-cloud mb-4"><ArrowLeft size={13} /> Todos os cursos</Link>
      <Link to={`/${c.slug}`} className="flex items-center gap-2.5 mb-4 group">
        <span className={`grid place-items-center w-8 h-8 rounded-lg ${ac.bg} border ${ac.border} ${ac.text} shrink-0`}><Icon size={16} /></span>
        <span className="font-semibold text-sm leading-tight group-hover:text-cloud">{c.titulo}</span>
      </Link>
      <div className="flex items-center gap-2 mb-4 text-xs text-fog">
        <div className="flex-1 h-1 rounded-full bg-ink-3 overflow-hidden"><div className={`h-full ${ac.dot}`} style={{ width: `${pct}%` }} /></div>
        <span>{indice + 1}/{total}</span>
      </div>
      <nav className="space-y-0.5">
        {c.secoes.map((sec, si) => (
          <div key={si} className="mb-2">
            {sec.titulo && <div className="text-[10px] uppercase tracking-wide text-fog px-2 mt-3 mb-1">{sec.titulo}</div>}
            {sec.aulas.map((a) => {
              n += 1
              const atual = a.slug === aulaSlug
              const feita = (n - 1) < indice
              return (
                <Link key={a.slug} to={`/${c.slug}/${a.slug}`}
                  className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition ${atual ? `${ac.bg} ${ac.text} font-medium` : 'text-fog hover:text-cloud hover:bg-ink-3/60'}`}>
                  <span className={`grid place-items-center w-4 h-4 rounded-full text-[9px] font-mono shrink-0 ${atual ? ac.dot + ' text-ink' : feita ? 'text-brand' : 'border border-line'}`}>
                    {feita ? <Check size={9} /> : ''}
                  </span>
                  <span className="truncate leading-tight">{a.titulo}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
    </div>
  )
}
