import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, RotateCw, ChevronLeft, ChevronRight, Shuffle, Eye } from 'lucide-react'

// Flashcards derivados dos conceitos da aula (frente = termo, verso = definição).
export default function Flashcards({ conceitos = [] }) {
  const [ordem, setOrdem] = useState(conceitos.map((_, i) => i))
  const [i, setI] = useState(0)
  const [virou, setVirou] = useState(false)
  if (!conceitos.length) return null

  const card = conceitos[ordem[i]]
  const go = (d) => { setVirou(false); setI((p) => (p + d + ordem.length) % ordem.length) }
  const shuffle = () => {
    const o = [...ordem]
    for (let k = o.length - 1; k > 0; k--) { const j = (k * 7 + 3) % (k + 1); [o[k], o[j]] = [o[j], o[k]] }
    setOrdem(o); setI(0); setVirou(false)
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3 text-sm text-fog">
        <span className="inline-flex items-center gap-2"><Layers size={15} className="text-brand-3" /> Flashcard {i + 1}/{ordem.length}</span>
        <button onClick={shuffle} className="inline-flex items-center gap-1.5 hover:text-cloud transition"><Shuffle size={13} /> embaralhar</button>
      </div>

      <div className="relative" style={{ perspective: '1400px' }}>
        <motion.button
          onClick={() => setVirou((v) => !v)}
          className="w-full text-left"
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${ordem[i]}-${virou}`}
              initial={{ rotateY: virou ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: virou ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
              className={`card min-h-[180px] p-7 flex flex-col justify-center ${virou ? 'bg-ink-2 border-brand/30' : 'bg-dots'}`}
            >
              <span className={`text-xs uppercase tracking-wide mb-2 ${virou ? 'text-brand' : 'text-fog'}`}>
                {virou ? 'definição' : 'conceito'}
              </span>
              <p className={virou ? 'text-cloud leading-relaxed' : 'text-2xl font-bold text-heading'}>
                {virou ? card.definicao : card.termo}
              </p>
              {!virou && (
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-fog"><Eye size={12} /> toque pra revelar</span>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button onClick={() => go(-1)} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-line text-fog hover:text-cloud hover:border-fog transition text-sm"><ChevronLeft size={16} /> anterior</button>
        <button onClick={() => setVirou((v) => !v)} className="inline-flex items-center gap-1.5 text-sm text-brand hover:brightness-110"><RotateCw size={14} /> virar</button>
        <button onClick={() => go(1)} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-line text-fog hover:text-cloud hover:border-fog transition text-sm">próximo <ChevronRight size={16} /></button>
      </div>
    </div>
  )
}
