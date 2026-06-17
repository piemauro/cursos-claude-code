import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react'
import { CURSO } from '../data/estrutura.js'
import { Reveal, PageWrap, Badge } from '../components/Bits.jsx'

export default function Sobre() {
  const o = CURSO.creditoOficial
  return (
    <PageWrap>
      <section className="mx-auto max-w-3xl px-5 pt-16 pb-20">
        <Reveal>
          <Badge>Sobre</Badge>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">Por que este curso existe</h1>
          <p className="mt-5 text-lg text-fog leading-relaxed">
            A maioria do conteúdo de IA fica preso no palco — promessa bonita, zero operação. Este curso é o oposto:
            uma trilha curta e objetiva pra você sair usando o Claude Code de verdade no seu dia a dia de código.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <h2 className="text-xl font-bold">Como estudar</h2>
          <p className="mt-3 text-fog leading-relaxed">
            Siga a trilha na ordem ou pule pro módulo que te interessa. Cada aula tem conceitos-chave, passo a passo,
            um exemplo de terminal e os erros comuns que economizam seu tempo. Leitura rápida, aplicação imediata.
          </p>
          <Link to="/aula/boas-vindas" className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand text-ink font-semibold hover:brightness-110 transition">
            Começar do zero <ArrowRight size={18} />
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="card p-6 flex gap-4">
            <ShieldCheck size={22} className="text-brand shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold">Crédito e originalidade</h3>
              <p className="mt-2 text-sm text-fog leading-relaxed">
                {o.nota} O material oficial, completo e gratuito, é da <span className="text-cloud">{o.autor}</span>:{' '}
                <a href={o.url} target="_blank" rel="noreferrer" className="text-brand hover:underline inline-flex items-center gap-0.5">{o.nome} <ExternalLink size={11} /></a>.
                Recomendo fortemente fazer o curso oficial também.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          <div className="card p-6">
            <h3 className="font-semibold">Quem fez</h3>
            <p className="mt-2 text-sm text-fog leading-relaxed">
              Pietro Mauro — consultor de IA, CTO e fundador. Trabalho com IA que entra na operação e gera resultado,
              não que fica no slide. Mais em{' '}
              <a href="https://piemauro.com.br" target="_blank" rel="noreferrer" className="text-brand hover:underline">piemauro.com.br</a>.
            </p>
          </div>
        </Reveal>
      </section>
    </PageWrap>
  )
}
