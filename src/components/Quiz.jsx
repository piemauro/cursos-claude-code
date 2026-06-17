import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, RotateCcw, Trophy, HelpCircle } from 'lucide-react'

// Mini-quiz de validação. Uma pergunta por vez, feedback animado, placar no fim.
export default function Quiz({ quiz = [] }) {
  const [idx, setIdx] = useState(0)
  const [escolha, setEscolha] = useState(null)
  const [acertos, setAcertos] = useState(0)
  const [fim, setFim] = useState(false)
  if (!quiz.length) return null

  const q = quiz[idx]
  const respondido = escolha !== null

  const escolher = (i) => {
    if (respondido) return
    setEscolha(i)
    if (i === q.correta) setAcertos((a) => a + 1)
  }
  const proxima = () => {
    if (idx + 1 >= quiz.length) { setFim(true); return }
    setIdx((p) => p + 1); setEscolha(null)
  }
  const reiniciar = () => { setIdx(0); setEscolha(null); setAcertos(0); setFim(false) }

  if (fim) {
    const pct = Math.round((acertos / quiz.length) * 100)
    const bom = pct >= 67
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card p-7 text-center bg-dots">
        <motion.div initial={{ rotate: -20, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
          className={`mx-auto grid place-items-center w-14 h-14 rounded-2xl ${bom ? 'bg-brand/15 text-brand' : 'bg-amber/15 text-amber'}`}>
          <Trophy size={26} />
        </motion.div>
        <h3 className="mt-4 text-2xl font-bold">{acertos}/{quiz.length} <span className="text-fog text-lg font-normal">· {pct}%</span></h3>
        <p className="mt-1 text-fog">{bom ? 'Mandou bem — conteúdo fixado. Bora pra próxima.' : 'Vale reler a aula e tentar de novo — o objetivo é fixar.'}</p>
        <button onClick={reiniciar} className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-line text-cloud hover:border-fog transition text-sm"><RotateCcw size={15} /> refazer</button>
      </motion.div>
    )
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between text-sm text-fog mb-1">
        <span className="inline-flex items-center gap-2"><HelpCircle size={15} className="text-brand" /> Pergunta {idx + 1}/{quiz.length}</span>
        <span>{acertos} acerto{acertos !== 1 ? 's' : ''}</span>
      </div>
      <div className="h-1 rounded-full bg-ink overflow-hidden mb-4">
        <motion.div className="h-full bg-brand" animate={{ width: `${((idx + (respondido ? 1 : 0)) / quiz.length) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
          <p className="font-semibold text-lg leading-snug">{q.pergunta}</p>
          <div className="mt-4 grid gap-2.5">
            {q.opcoes.map((op, i) => {
              const correta = i === q.correta
              const escolhida = i === escolha
              let cls = 'border-line hover:border-fog'
              let icon = null
              if (respondido) {
                if (correta) { cls = 'border-brand/60 bg-brand/10'; icon = <Check size={16} className="text-brand" /> }
                else if (escolhida) { cls = 'border-red-500/60 bg-red-500/10'; icon = <X size={16} className="text-red-400" /> }
                else cls = 'border-line opacity-60'
              }
              return (
                <motion.button key={i} onClick={() => escolher(i)} disabled={respondido}
                  whileTap={!respondido ? { scale: 0.99 } : {}}
                  animate={respondido && escolhida && !correta ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`flex items-center justify-between gap-3 text-left px-4 py-3 rounded-xl border transition ${cls} ${!respondido ? 'cursor-pointer' : 'cursor-default'}`}>
                  <span className="text-cloud text-[0.95rem]">{op}</span>
                  {icon}
                </motion.button>
              )
            })}
          </div>

          <AnimatePresence>
            {respondido && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
                <p className="mt-4 text-sm text-fog leading-relaxed border-l-2 border-l-brand/50 pl-3">{q.explicacao}</p>
                <button onClick={proxima} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand text-ink font-semibold text-sm hover:brightness-110 transition">
                  {idx + 1 >= quiz.length ? 'Ver resultado' : 'Próxima'} →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
