import { useParams, Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Clock } from 'lucide-react'
import { getModulo } from '../lib/curso.js'
import { Reveal, PageWrap, Badge, ICONS } from '../components/Bits.jsx'

export default function Modulo() {
  const { id } = useParams()
  const m = getModulo(id)
  if (!m) return <PageWrap><div className="mx-auto max-w-3xl px-5 py-24 text-center text-fog">Módulo não encontrado. <Link to="/" className="text-brand">Voltar</Link></div></PageWrap>
  const Icon = ICONS[m.icone] || ICONS.Terminal
  return (
    <PageWrap>
      <section className="mx-auto max-w-4xl px-5 pt-14 pb-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-fog hover:text-cloud"><ArrowLeft size={15} /> Início</Link>
        <div className="mt-6 flex items-center gap-4">
          <span className="grid place-items-center w-12 h-12 rounded-xl bg-brand/12 border border-brand/25 text-brand"><Icon size={22} /></span>
          <div>
            <Badge tone="fog">Módulo {m.n}</Badge>
            <h1 className="mt-1.5 text-3xl font-bold tracking-tight">{m.titulo}</h1>
          </div>
        </div>
        <p className="mt-4 text-fog text-lg leading-relaxed">{m.resumo}</p>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-16">
        <div className="grid gap-3">
          {m.aulas.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.04}>
              <Link to={`/aula/${a.slug}`} className="card card-hover flex items-center gap-4 p-5">
                <span className="grid place-items-center w-9 h-9 rounded-lg bg-ink border border-line text-fog font-mono text-sm shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold truncate">{a.titulo}</h3>
                  <p className="text-sm text-fog line-clamp-1">{a.resumo}</p>
                </div>
                {a.duracao_leitura && <span className="hidden sm:inline-flex items-center gap-1 text-xs text-fog shrink-0"><Clock size={12} />{a.duracao_leitura}</span>}
                <ArrowRight size={16} className="text-brand shrink-0" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </PageWrap>
  )
}
