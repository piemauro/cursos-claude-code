import { motion } from 'framer-motion'

// Fundo aurora animado (só no skin v2) — blobs coloridos derivando atrás do vidro.
const BLOBS = [
  { c: 'var(--brand)',   x: ['-10%', '20%', '-10%'],  y: ['-5%', '30%', '-5%'],  d: 26 },
  { c: 'var(--brand-2)', x: ['70%', '40%', '70%'],    y: ['-10%', '20%', '-10%'], d: 32 },
  { c: 'var(--brand-3)', x: ['10%', '50%', '10%'],    y: ['55%', '30%', '55%'],   d: 30 },
  { c: 'var(--amber)',   x: ['60%', '75%', '60%'],    y: ['50%', '65%', '50%'],   d: 36 },
]

export default function Aurora() {
  return (
    <div className="v2-aurora" aria-hidden="true">
      {BLOBS.map((b, i) => (
        <motion.span key={i}
          style={{ background: b.c, left: 0, top: 0 }}
          animate={{ x: b.x, y: b.y }}
          transition={{ duration: b.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
