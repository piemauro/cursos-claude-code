import { useParams, Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Clock, ExternalLink } from 'lucide-react'
import { getCurso, OFICIAL } from '../lib/cursos.js'
import { Reveal, PageWrap, Badge, ICONS, accentOf } from '../components/Bits.jsx'

export default function Curso() {
  const { cursoSlug } = useParams()
  const c = getCurso(cursoSlug)
  if (!c) return <PageWrap><div className="mx-auto max-w-3xl px-5 py-24 text-center text-fog">Curso não encontrado. <Link to="/" className="text-brand">Início</Link></div></PageWrap>
  const Icon = ICONS[c.icone] || ICONS.Sparkles
  const ac = accentOf(c.accent)
  let n = 0
  return (
    <PageWrap>
      <section className="mx-auto max-w-4xl px-5 pt-14 pb-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-fog hover:text-cloud"><ArrowLeft size={15} /> Todos os cursos</Link>
        <div className="mt-6 flex items-center gap-4">
          <span className={`grid place-items-center w-12 h-12 rounded-xl ${ac.bg} border ${ac.border} ${ac.text}`}><Icon size={22} /></span>
          <div>
            <Badge tone="fog">{c.nivel} · {c.lessons.length} aulas</Badge>
            <h1 className="mt-1.5 text-3xl font-bold tracking-tight">{c.titulo}</h1>
          </div>
        </div>
        <p className="mt-4 text-fog text-lg leading-relaxed">{c.subtitulo}</p>
        <p className="mt-3 text-xs text-fog">
          Releitura própria · curso oficial gratuito:{' '}
          <a href={`${OFICIAL.base}/${c.oficial}`} target="_blank" rel="noreferrer" className="text-brand hover:underline inline-flex items-center gap-0.5">Anthropic <ExternalLink size={11} /></a>
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-16 space-y-8">
        {c.secoes.map((sec, si) => (
          <div key={si}>
            {sec.titulo && (
              <Reveal><h2 className="text-sm uppercase tracking-wide text-fog mb-3 flex items-center gap-2"><span className={`w-1.5 h-1.5 rounded-full ${ac.dot}`} />{sec.titulo}</h2></Reveal>
            )}
            <div className="grid gap-3">
              {sec.aulas.map((a) => {
                n += 1
                return (
                  <Reveal key={a.slug} delay={0.02}>
                    <Link to={`/${c.slug}/${a.slug}`} className="card card-hover flex items-center gap-4 p-5">
                      <span className="grid place-items-center w-9 h-9 rounded-lg bg-ink border border-line text-fog font-mono text-sm shrink-0">{String(n).padStart(2, '0')}</span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold truncate">{a.titulo}</h3>
                        <p className="text-sm text-fog line-clamp-1">{a.resumo}</p>
                      </div>
                      {a.duracao_leitura && <span className="hidden sm:inline-flex items-center gap-1 text-xs text-fog shrink-0"><Clock size={12} />{a.duracao_leitura}</span>}
                      <ArrowRight size={16} className={`${ac.text} shrink-0`} />
                    </Link>
                  </Reveal>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </PageWrap>
  )
}
