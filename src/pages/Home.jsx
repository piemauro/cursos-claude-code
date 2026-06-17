import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, BookOpen, Layers } from 'lucide-react'
import { getCatalogo, totals } from '../lib/cursos.js'
import { Reveal, PageWrap, Badge, ICONS, accentOf } from '../components/Bits.jsx'

export default function Home() {
  const cursos = getCatalogo()
  const t = totals()
  const destaque = cursos.find((c) => c.destaque) || cursos[0]
  return (
    <PageWrap>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-14 md:pt-28 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge><Sparkles size={12} /> Cursos gratuitos · em português</Badge>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Aprenda <span className="gradient-text">IA aplicada</span><br />que opera resultado.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-fog leading-relaxed">
              Uma trilha de cursos práticos e objetivos sobre Claude — do primeiro chat ao código, à API e à fluência em IA.
              Sem hype: o que a ferramenta faz de verdade e como botar pra operar.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to={`/${destaque.slug}`} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand text-ink font-semibold hover:brightness-110 transition">
                Começar por {destaque.titulo} <ArrowRight size={18} />
              </Link>
              <a href="#cursos" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-line text-cloud hover:border-fog transition">Ver todos os cursos</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-fog">
              <span className="inline-flex items-center gap-2"><BookOpen size={15} className="text-brand" /> {t.cursos} cursos</span>
              <span className="inline-flex items-center gap-2"><Layers size={15} className="text-brand" /> {t.aulas} aulas objetivas</span>
              <span className="inline-flex items-center gap-2"><Sparkles size={15} className="text-brand" /> 100% gratuito</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CURSOS */}
      <section id="cursos" className="mx-auto max-w-6xl px-5 py-12">
        <Reveal><h2 className="text-2xl md:text-3xl font-bold tracking-tight">A trilha de cursos</h2>
          <p className="text-fog mt-2">Comece por onde fizer sentido pro seu momento.</p></Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cursos.map((c, i) => {
            const Icon = ICONS[c.icone] || ICONS.Sparkles
            const ac = accentOf(c.accent)
            return (
              <Reveal key={c.slug} delay={i * 0.05}>
                <Link to={`/${c.slug}`} className="card card-hover block p-6 h-full relative">
                  {c.destaque && <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wide text-brand">Destaque</span>}
                  <span className={`grid place-items-center w-11 h-11 rounded-xl ${ac.bg} border ${ac.border} ${ac.text}`}><Icon size={20} /></span>
                  <h3 className="mt-4 text-lg font-semibold">{c.titulo}</h3>
                  <p className="mt-1.5 text-sm text-fog leading-relaxed">{c.subtitulo}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-fog">{c.nivel} · {c.totalAulas} aulas</span>
                    <span className={`inline-flex items-center gap-1 ${ac.text}`}>abrir <ArrowRight size={14} /></span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Reveal>
          <div className="card p-8 md:p-12 bg-dots text-center">
            <h2 className="text-2xl md:text-3xl font-bold">IA que entra na operação, não fica no palco.</h2>
            <p className="mt-3 text-fog max-w-lg mx-auto">Cada aula é curta, direta e aplicável já no próximo trabalho. Escolha um curso e vá no seu ritmo.</p>
            <Link to={`/${destaque.slug}`} className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand text-ink font-semibold hover:brightness-110 transition">
              Começar agora <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </PageWrap>
  )
}
