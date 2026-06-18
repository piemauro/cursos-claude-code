import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock, Lightbulb, AlertTriangle, ListChecks, BookOpen, Quote, ExternalLink, Layers, HelpCircle } from 'lucide-react'
import { getCurso, getAula, getVizinhas, getQuiz, getHero, OFICIAL } from '../lib/cursos.js'
import { Reveal, PageWrap, Badge, CodeBlock, accentOf } from '../components/Bits.jsx'
import Flashcards from '../components/Flashcards.jsx'
import Quiz from '../components/Quiz.jsx'
import AnimatedHero from '../components/AnimatedHero.jsx'
import LessonSidebar from '../components/LessonSidebar.jsx'

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
  const { cursoSlug, aulaSlug } = useParams()
  const curso = getCurso(cursoSlug)
  const a = getAula(cursoSlug, aulaSlug)
  const { anterior, proxima, indice, total } = getVizinhas(cursoSlug, aulaSlug)
  const quiz = getQuiz(cursoSlug, aulaSlug)
  const hero = getHero(cursoSlug, aulaSlug, a)
  if (!curso || !a) return <PageWrap><div className="mx-auto max-w-3xl px-5 py-24 text-center text-fog">Aula não encontrada. <Link to="/" className="text-brand">Início</Link></div></PageWrap>
  const ac = accentOf(curso.accent)
  const pct = total ? Math.round(((indice + 1) / total) * 100) : 0

  return (
    <PageWrap>
      <div className="mx-auto max-w-7xl px-5 xl:grid xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-12 xl:items-start">
        <aside className="hidden xl:block pt-12"><LessonSidebar cursoSlug={cursoSlug} aulaSlug={aulaSlug} /></aside>
      <article className="max-w-3xl w-full mx-auto pt-12 pb-10">
        <div className="flex items-center justify-between text-sm xl:hidden">
          <Link to={`/${cursoSlug}`} className="inline-flex items-center gap-1.5 text-fog hover:text-cloud"><ArrowLeft size={15} /> {curso.titulo}</Link>
          <span className="text-fog font-mono text-xs">{indice + 1}/{total}</span>
        </div>
        <div className="mt-3 h-1 rounded-full bg-ink-3 overflow-hidden xl:hidden"><div className={`h-full ${ac.dot}`} style={{ width: `${pct}%` }} /></div>

        <header className="mt-8 xl:mt-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="fog">{curso.titulo}</Badge>
            {a.duracao_leitura && <Badge><Clock size={11} /> {a.duracao_leitura}</Badge>}
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.08]">{a.titulo}</h1>
          {a.resumo && <p className="mt-5 text-lg lg:text-xl text-fog leading-relaxed max-w-2xl">{a.resumo}</p>}
        </header>

        <div className="mt-6">
          <AnimatedHero scene={hero.scene} labels={hero.labels} legenda={hero.legenda} accent={curso.accent} />
        </div>

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

        {a.conceitos?.length > 0 && (
          <Section icon={Layers} title="Flashcards">
            <p className="text-sm text-fog -mt-1 mb-1">Revise os conceitos. Toque pra virar a carta.</p>
            <Flashcards conceitos={a.conceitos} />
          </Section>
        )}

        {quiz?.length > 0 && (
          <Section icon={HelpCircle} title="Valide o que você aprendeu">
            <p className="text-sm text-fog -mt-1 mb-3">Mini-quiz rápido — sem consultar. Veja se fixou.</p>
            <Quiz quiz={quiz} />
          </Section>
        )}

        <Reveal className="mt-10">
          <p className="text-xs text-fog">
            Releitura própria. Curso oficial gratuito{' '}
            <a href={`${OFICIAL.base}/${curso.oficial}`} target="_blank" rel="noreferrer" className="text-brand hover:underline inline-flex items-center gap-0.5">na Anthropic <ExternalLink size={11} /></a>.
          </p>
        </Reveal>

        <nav className="mt-12 grid gap-3 sm:grid-cols-2">
          {anterior ? (
            <Link to={`/${cursoSlug}/${anterior.slug}`} className="card card-hover p-4 group">
              <span className="text-xs text-fog flex items-center gap-1"><ArrowLeft size={12} /> Anterior</span>
              <div className="mt-1 font-medium group-hover:text-brand transition">{anterior.titulo}</div>
            </Link>
          ) : <span />}
          {proxima ? (
            <Link to={`/${cursoSlug}/${proxima.slug}`} className="card card-hover p-4 text-right group">
              <span className="text-xs text-fog flex items-center gap-1 justify-end">Próxima <ArrowRight size={12} /></span>
              <div className="mt-1 font-medium group-hover:text-brand transition">{proxima.titulo}</div>
            </Link>
          ) : (
            <Link to={`/${cursoSlug}`} className="card card-hover p-4 text-right group">
              <span className="text-xs text-fog flex items-center gap-1 justify-end">Fim do curso <ArrowRight size={12} /></span>
              <div className="mt-1 font-medium group-hover:text-brand transition">Voltar ao índice</div>
            </Link>
          )}
        </nav>
      </article>
      </div>
    </PageWrap>
  )
}
