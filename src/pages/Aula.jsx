import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock, Lightbulb, AlertTriangle, ListChecks, BookOpen, Quote, ExternalLink } from 'lucide-react'
import { getAula, getVizinhas } from '../lib/curso.js'
import { CURSO } from '../data/estrutura.js'
import { Reveal, PageWrap, Badge, CodeBlock } from '../components/Bits.jsx'

function Section({ icon: Icon, title, children, tone = 'brand' }) {
  const c = { brand: 'text-brand', amber: 'text-amber', fog: 'text-fog' }[tone]
  return (
    <Reveal className="mt-10">
      <h2 className="flex items-center gap-2 text-xl font-bold"><Icon size={19} className={c} /> {title}</h2>
      <div className="mt-4">{children}</div>
    </Reveal>
  )
}

export default function Aula() {
  const { slug } = useParams()
  const a = getAula(slug)
  const { anterior, proxima, indice, total } = getVizinhas(slug)
  if (!a) return <PageWrap><div className="mx-auto max-w-3xl px-5 py-24 text-center text-fog">Aula não encontrada. <Link to="/" className="text-brand">Início</Link></div></PageWrap>
  const o = CURSO.creditoOficial
  const pct = total ? Math.round(((indice + 1) / total) * 100) : 0

  return (
    <PageWrap>
      <article className="mx-auto max-w-3xl px-5 pt-12 pb-10">
        <div className="flex items-center justify-between text-sm">
          <Link to="/" className="inline-flex items-center gap-1.5 text-fog hover:text-cloud"><ArrowLeft size={15} /> Início</Link>
          <span className="text-fog font-mono text-xs">{indice + 1}/{total}</span>
        </div>
        <div className="mt-3 h-1 rounded-full bg-ink-3 overflow-hidden"><div className="h-full bg-brand" style={{ width: `${pct}%` }} /></div>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="fog">{a.modulo}</Badge>
            {a.duracao_leitura && <Badge><Clock size={11} /> {a.duracao_leitura}</Badge>}
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight leading-tight">{a.titulo}</h1>
          <p className="mt-4 text-lg text-fog leading-relaxed">{a.resumo}</p>
        </header>

        {a.takeaway && (
          <Reveal className="mt-8">
            <div className="card border-l-2 border-l-brand p-5 flex gap-3 bg-dots">
              <Quote size={18} className="text-brand shrink-0 mt-0.5" />
              <p className="text-cloud font-medium">{a.takeaway}</p>
            </div>
          </Reveal>
        )}

        {a.conceitos?.length > 0 && (
          <Section icon={BookOpen} title="Conceitos-chave">
            <div className="grid gap-3 sm:grid-cols-2">
              {a.conceitos.map((c, i) => (
                <div key={i} className="card p-4">
                  <div className="font-semibold text-brand-2">{c.termo}</div>
                  <p className="mt-1 text-sm text-fog leading-relaxed">{c.definicao}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {a.passos?.length > 0 && (
          <Section icon={ListChecks} title="Na prática">
            <ol className="space-y-2.5">
              {a.passos.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid place-items-center w-6 h-6 rounded-full bg-brand/12 border border-brand/25 text-brand text-xs font-mono shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-cloud leading-relaxed">{p}</span>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {a.exemplo && (a.exemplo.contexto || a.exemplo.comandos?.length) && (
          <Section icon={Quote} title="Exemplo">
            {a.exemplo.contexto && <p className="text-cloud leading-relaxed">{a.exemplo.contexto}</p>}
            <CodeBlock lines={a.exemplo.comandos || []} />
            {a.exemplo.explicacao && <p className="text-fog leading-relaxed text-[0.95rem]">{a.exemplo.explicacao}</p>}
          </Section>
        )}

        {a.dicas?.length > 0 && (
          <Section icon={Lightbulb} title="Dicas">
            <ul className="space-y-2.5">
              {a.dicas.map((d, i) => (
                <li key={i} className="flex gap-3"><Lightbulb size={15} className="text-amber shrink-0 mt-1" /><span className="text-cloud leading-relaxed">{d}</span></li>
              ))}
            </ul>
          </Section>
        )}

        {a.erros_comuns?.length > 0 && (
          <Section icon={AlertTriangle} title="Erros comuns" tone="amber">
            <ul className="space-y-2.5">
              {a.erros_comuns.map((e, i) => (
                <li key={i} className="flex gap-3"><AlertTriangle size={15} className="text-amber shrink-0 mt-1" /><span className="text-fog leading-relaxed">{e}</span></li>
              ))}
            </ul>
          </Section>
        )}

        <Reveal className="mt-10">
          <p className="text-xs text-fog">
            Releitura própria. Aula correspondente no curso oficial gratuito{' '}
            <a href={o.url} target="_blank" rel="noreferrer" className="text-brand hover:underline inline-flex items-center gap-0.5">{o.nome} <ExternalLink size={11} /></a> ({o.autor}).
          </p>
        </Reveal>

        {/* nav */}
        <nav className="mt-12 grid gap-3 sm:grid-cols-2">
          {anterior ? (
            <Link to={`/aula/${anterior.slug}`} className="card card-hover p-4 group">
              <span className="text-xs text-fog flex items-center gap-1"><ArrowLeft size={12} /> Anterior</span>
              <div className="mt-1 font-medium group-hover:text-brand transition">{anterior.titulo}</div>
            </Link>
          ) : <span />}
          {proxima ? (
            <Link to={`/aula/${proxima.slug}`} className="card card-hover p-4 text-right group">
              <span className="text-xs text-fog flex items-center gap-1 justify-end">Próxima <ArrowRight size={12} /></span>
              <div className="mt-1 font-medium group-hover:text-brand transition">{proxima.titulo}</div>
            </Link>
          ) : (
            <Link to="/sobre" className="card card-hover p-4 text-right group">
              <span className="text-xs text-fog flex items-center gap-1 justify-end">Fim da trilha <ArrowRight size={12} /></span>
              <div className="mt-1 font-medium group-hover:text-brand transition">Sobre o curso</div>
            </Link>
          )}
        </nav>
      </article>
    </PageWrap>
  )
}
