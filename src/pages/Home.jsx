import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Layers, Sparkles } from 'lucide-react'
import { getModulos, totals } from '../lib/curso.js'
import { CURSO } from '../data/estrutura.js'
import { Reveal, PageWrap, Badge, ICONS } from '../components/Bits.jsx'

export default function Home() {
  const modulos = getModulos()
  const t = totals()
  return (
    <PageWrap>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-16 md:pt-28 md:pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge><Sparkles size={12} /> Curso gratuito · em português</Badge>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Domine o <span className="gradient-text">Claude Code</span><br />do setup ao SDK.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-fog leading-relaxed">
              {CURSO.subtitulo} Sem hype: o que a ferramenta faz de verdade, como encaixar no seu fluxo e botar pra operar.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/aula/boas-vindas" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand text-ink font-semibold hover:brightness-110 transition">
                Começar agora <ArrowRight size={18} />
              </Link>
              <a href="#modulos" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-line text-cloud hover:border-fog transition">
                Ver os módulos
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-fog">
              <span className="inline-flex items-center gap-2"><Layers size={15} className="text-brand" /> {t.modulos} módulos</span>
              <span className="inline-flex items-center gap-2"><Clock size={15} className="text-brand" /> {t.aulas} aulas objetivas</span>
              <span className="inline-flex items-center gap-2"><Sparkles size={15} className="text-brand" /> prático, direto ao ponto</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section id="modulos" className="mx-auto max-w-6xl px-5 py-12">
        <Reveal><h2 className="text-2xl md:text-3xl font-bold tracking-tight">A trilha</h2>
          <p className="text-fog mt-2">Quatro etapas, do conceito à automação.</p></Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {modulos.map((m, i) => {
            const Icon = ICONS[m.icone] || ICONS.Terminal
            return (
              <Reveal key={m.id} delay={i * 0.06}>
                <Link to={`/modulo/${m.id}`} className="card card-hover block p-6 h-full">
                  <div className="flex items-start justify-between">
                    <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand/12 border border-brand/25 text-brand"><Icon size={20} /></span>
                    <span className="text-xs text-fog font-mono">módulo {m.n}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{m.titulo}</h3>
                  <p className="mt-1.5 text-sm text-fog leading-relaxed">{m.resumo}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-fog">{m.aulas.length} aulas</span>
                    <span className="inline-flex items-center gap-1 text-brand">abrir <ArrowRight size={14} /></span>
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
            <h2 className="text-2xl md:text-3xl font-bold">Pronto pra tirar do palco e botar na operação?</h2>
            <p className="mt-3 text-fog max-w-lg mx-auto">Comece pela primeira aula e vá no seu ritmo. Cada aula é curta, objetiva e aplicável já no próximo commit.</p>
            <Link to="/aula/boas-vindas" className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand text-ink font-semibold hover:brightness-110 transition">
              Começar do zero <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </PageWrap>
  )
}
