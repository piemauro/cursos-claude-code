import { motion } from 'framer-motion'
import { Compass, Wrench, Plug, Flag, Terminal } from 'lucide-react'

export const ICONS = { Compass, Wrench, Plug, Flag, Terminal }

export function Reveal({ children, delay = 0, y = 16, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function PageWrap({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export function Badge({ children, tone = 'brand' }) {
  const tones = {
    brand: 'bg-brand/12 text-brand border-brand/25',
    fog: 'bg-ink-3 text-fog border-line',
    amber: 'bg-amber/12 text-amber border-amber/25',
  }
  return <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${tones[tone]}`}>{children}</span>
}

export function CodeBlock({ lines = [] }) {
  if (!lines.length) return null
  return (
    <div className="rounded-xl border border-line bg-ink overflow-hidden my-4">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-line bg-ink-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-fog font-mono">terminal</span>
      </div>
      <pre className="px-4 py-3.5 text-sm font-mono leading-relaxed overflow-x-auto">
        {lines.map((l, i) => {
          const cmd = l.replace(/^&gt;\s?/, '› ').replace(/^>\s?/, '› ')
          const isPrompt = /^›/.test(cmd)
          return (
            <div key={i} className={isPrompt ? 'text-brand-2' : 'text-cloud'}>
              {!isPrompt && <span className="text-fog select-none">$ </span>}
              {cmd}
            </div>
          )
        })}
      </pre>
    </div>
  )
}
