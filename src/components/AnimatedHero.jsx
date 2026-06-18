import { motion } from 'framer-motion'
import { accentOf } from './Bits.jsx'

/* Aberturas de aula: arte de movimento abstrata (SVG + Framer), com glow suave.
   Os rótulos aparecem como chips animados ABAIXO — nunca dentro das formas. */

const EASE = [0.22, 1, 0.36, 1]
const CX = 240, CY = 110

// núcleo luminoso reutilizável
function Core({ a, r = 16 }) {
  return (
    <>
      <motion.circle cx={CX} cy={CY} r={r * 2.6} fill={a} filter="url(#soft)" opacity="0.18"
        animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: `${CX}px ${CY}px` }} />
      <circle cx={CX} cy={CY} r={r} fill={a} />
      <circle cx={CX} cy={CY} r={r} fill="#fff" opacity="0.18" />
    </>
  )
}

function SceneLoop({ a }) {
  return (
    <g>
      <circle cx={CX} cy={CY} r="74" fill="none" stroke={a} strokeOpacity="0.22" strokeWidth="1.5" />
      {[0, 1, 2].map((i) => {
        const ang = (i / 3) * Math.PI * 2 - Math.PI / 2
        return <motion.circle key={i} cx={CX + Math.cos(ang) * 74} cy={CY + Math.sin(ang) * 74} r="6" fill={a}
          animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }} />
      })}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 7, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <circle cx={CX} cy={CY - 74} r="7" fill={a} filter="url(#soft)" />
        <circle cx={CX} cy={CY - 74} r="4" fill="#fff" opacity="0.9" />
      </motion.g>
      <Core a={a} r="13" />
    </g>
  )
}

function SceneConnect({ a }) {
  const sats = [{ x: 70, y: 48 }, { x: 410, y: 56 }, { x: 64, y: 172 }, { x: 416, y: 168 }]
  return (
    <g>
      {sats.map((s, i) => (
        <g key={i}>
          <line x1={CX} y1={CY} x2={s.x} y2={s.y} stroke={a} strokeOpacity="0.18" strokeWidth="1.5" />
          <motion.circle r="3.5" fill={a} filter="url(#soft)"
            animate={{ cx: [CX, s.x], cy: [CY, s.y], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.45, ease: 'easeInOut' }} />
          <motion.circle cx={s.x} cy={s.y} r="6" fill={a} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.45 }} />
        </g>
      ))}
      <Core a={a} r="15" />
    </g>
  )
}

function ScenePipeline({ a }) {
  return (
    <g>
      <rect x="60" y={CY - 2} width="360" height="4" rx="2" fill={a} opacity="0.18" />
      {[150, 240, 330].map((x, i) => (
        <motion.circle key={i} cx={x} cy={CY} r="5" fill={a} animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }} />
      ))}
      <motion.g animate={{ x: [-180, 180] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx={CX} cy={CY} r="8" fill={a} filter="url(#soft)" />
        <circle cx={CX} cy={CY} r="4.5" fill="#fff" opacity="0.85" />
      </motion.g>
    </g>
  )
}

function SceneTerminal({ a }) {
  return (
    <g>
      <rect x="96" y="44" width="288" height="132" rx="14" fill="#0c0c0e" stroke={a} strokeOpacity="0.35" />
      <circle cx="116" cy="64" r="3.5" fill="#ff5f57" /><circle cx="128" cy="64" r="3.5" fill="#febc2e" /><circle cx="140" cy="64" r="3.5" fill="#28c840" />
      <text x="116" y="104" fontSize="13" fontFamily="monospace" fill={a}>$</text>
      <motion.rect x="130" y="94" height="13" rx="2" fill={a} fillOpacity="0.7"
        animate={{ width: [0, 120, 120, 0] }} transition={{ duration: 3.4, repeat: Infinity, times: [0, 0.4, 0.85, 1], ease: 'easeInOut' }} />
      {[126, 144, 162].map((y, i) => (
        <motion.rect key={i} x="116" y={y} height="5" rx="2.5" fill="#fff" fillOpacity="0.16"
          animate={{ width: [0, [200, 150, 180][i]] }} transition={{ duration: 1.4, repeat: Infinity, repeatType: 'reverse', delay: 1 + i * 0.3, ease: 'easeInOut' }} />
      ))}
    </g>
  )
}

function SceneLayers({ a }) {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <motion.rect key={i} x={CX - 90} width="180" height="20" rx="6" fill={a} fillOpacity={0.15 + i * 0.18} stroke={a} strokeOpacity="0.4"
          initial={{ opacity: 0 }}
          animate={{ y: [CY + 60 - i * 26, CY + 52 - i * 26], opacity: [0, 1, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.35, ease: EASE }} />
      ))}
    </g>
  )
}

function SceneDelegate({ a }) {
  return (
    <g>
      <rect x="64" y={CY - 26} width="86" height="52" rx="12" fill={a} fillOpacity="0.1" stroke={a} strokeOpacity="0.4" />
      <rect x="330" y={CY - 26} width="86" height="52" rx="12" fill={a} fillOpacity="0.16" stroke={a} strokeOpacity="0.6" />
      <motion.g animate={{ x: [0, 264, 264], opacity: [1, 1, 0] }} transition={{ duration: 2.8, repeat: Infinity, times: [0, 0.55, 1], ease: 'easeInOut' }}>
        <rect x="120" y={CY - 13} width="26" height="26" rx="7" fill={a} filter="url(#soft)" />
      </motion.g>
      <motion.g animate={{ x: [0, -264, -264], opacity: [0, 1, 1] }} transition={{ duration: 2.8, repeat: Infinity, delay: 1.4, times: [0, 0.55, 1], ease: 'easeInOut' }}>
        <circle cx="360" cy={CY} r="13" fill="none" stroke={a} strokeWidth="2" />
        <path d={`M353 ${CY} l5 5 l9 -11`} stroke={a} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </g>
  )
}

function SceneSpark({ a }) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <motion.circle key={i} cx={CX} cy={CY} r="20" fill="none" stroke={a} strokeWidth="1.5"
          animate={{ scale: [1, 3.4], opacity: [0.5, 0] }} transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.85, ease: 'easeOut' }} style={{ transformOrigin: `${CX}px ${CY}px` }} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => {
        const ang = (i / 8) * Math.PI * 2
        return <motion.circle key={i} r="2.5" fill={a}
          animate={{ cx: [CX, CX + Math.cos(ang) * 92], cy: [CY, CY + Math.sin(ang) * 92], opacity: [0.9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.12, ease: 'easeOut' }} />
      })}
      <Core a={a} r="17" />
    </g>
  )
}

function SceneNetwork({ a }) {
  const ns = [{ x: 120, y: 60 }, { x: 240, y: 44 }, { x: 360, y: 64 }, { x: 96, y: 150 }, { x: 200, y: 160 }, { x: 320, y: 156 }, { x: 410, y: 130 }]
  const edges = [[0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [5, 6], [2, 6], [1, 4]]
  return (
    <g>
      {edges.map(([p, q], i) => (
        <line key={i} x1={ns[p].x} y1={ns[p].y} x2={ns[q].x} y2={ns[q].y} stroke={a} strokeOpacity="0.16" strokeWidth="1.2" />
      ))}
      {ns.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r="6" fill={a}
          animate={{ scale: [1, 1.6, 1], opacity: [0.35, 1, 0.35] }} transition={{ duration: 2.6, repeat: Infinity, delay: (i % 4) * 0.5, ease: 'easeInOut' }} />
      ))}
    </g>
  )
}

const SCENES = { loop: SceneLoop, connect: SceneConnect, pipeline: ScenePipeline, terminal: SceneTerminal, layers: SceneLayers, delegate: SceneDelegate, spark: SceneSpark, network: SceneNetwork }
const accentVar = (accent) => `var(--color-${accent === 'blue' ? 'brand-2' : accent === 'violet' ? 'brand-3' : accent === 'amber' ? 'amber' : 'brand'})`

export default function AnimatedHero({ scene = 'spark', labels = [], legenda, accent = 'brand' }) {
  const ac = accentOf(accent)
  const a = accentVar(accent)
  const Scene = SCENES[scene] || SceneSpark
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="card overflow-hidden bg-dots">
      <div className="w-full aspect-[24/11]">
        <svg viewBox="0 0 480 220" preserveAspectRatio="xMidYMid meet" className="w-full h-full block text-cloud" role="img" aria-label={legenda || 'animação da aula'}>
          <defs>
            <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          <Scene a={a} />
        </svg>
      </div>

      {labels?.length > 0 && (
        <div className="flex flex-wrap gap-2 px-5 pt-1 pb-3 justify-center">
          {labels.slice(0, 4).map((l, i) => (
            <motion.span key={i}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.4, ease: EASE }}
              className={`text-xs font-medium px-3 py-1 rounded-full border ${ac.border} ${ac.bg} ${ac.text}`}>
              {l}
            </motion.span>
          ))}
        </div>
      )}

      {legenda && (
        <p className="px-5 pb-4 -mt-1 text-sm text-fog text-center">{legenda}</p>
      )}
    </motion.div>
  )
}
