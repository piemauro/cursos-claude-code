import { motion } from 'framer-motion'
import { accentOf } from './Bits.jsx'

/* Biblioteca de cenas animadas que abrem cada aula (no lugar do vídeo).
   Todas são SVG + Framer Motion, leves e em loop. Recebem labels e accent. */

const loopT = (i) => ({ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 })

function SceneLoop({ labels = [], c }) {
  const pts = [{ x: 200, y: 36 }, { x: 332, y: 130 }, { x: 282, y: 280 }, { x: 118, y: 280 }, { x: 68, y: 130 }].slice(0, Math.max(3, Math.min(5, labels.length || 4)))
  return (
    <g>
      <motion.circle cx="200" cy="160" r="96" fill="none" stroke={c.stroke} strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 6"
        animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '200px 160px' }} />
      <motion.circle cx="200" cy="64" r="6" fill={c.fill}
        animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '200px 160px' }} />
      {pts.map((p, i) => (
        <g key={i}>
          <motion.circle cx={p.x} cy={p.y} r="9" fill={c.fill} animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }} transition={loopT(i)} />
          <text x={p.x} y={p.y + (p.y < 160 ? -16 : 26)} textAnchor="middle" fontSize="13" fill="currentColor" fontWeight="600">{labels[i]}</text>
        </g>
      ))}
    </g>
  )
}

function SceneConnect({ labels = [], c }) {
  const sats = [{ x: 70, y: 70 }, { x: 330, y: 80 }, { x: 60, y: 250 }, { x: 340, y: 250 }, { x: 200, y: 40 }].slice(0, Math.max(3, Math.min(5, labels.length || 4)))
  return (
    <g>
      {sats.map((s, i) => (
        <g key={i}>
          <line x1="200" y1="160" x2={s.x} y2={s.y} stroke={c.stroke} strokeOpacity="0.3" strokeWidth="1.5" />
          <motion.circle r="4" fill={c.fill} animate={{ cx: [200, s.x], cy: [160, s.y], opacity: [0, 1, 0] }} transition={loopT(i)} />
          <circle cx={s.x} cy={s.y} r="22" fill="var(--surface)" stroke={c.stroke} strokeOpacity="0.5" />
          <text x={s.x} y={s.y + 4} textAnchor="middle" fontSize="11" fill="currentColor">{(labels[i] || '').slice(0, 10)}</text>
        </g>
      ))}
      <motion.circle cx="200" cy="160" r="30" fill={c.fill} fillOpacity="0.15" stroke={c.stroke}
        animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 2.2, repeat: Infinity }} />
      <circle cx="200" cy="160" r="13" fill={c.fill} />
    </g>
  )
}

function ScenePipeline({ labels = [], c }) {
  const stages = (labels.length ? labels : ['entrada', 'regra', 'ação', 'saída']).slice(0, 4)
  const xs = stages.map((_, i) => 70 + i * (260 / (stages.length - 1 || 1)))
  return (
    <g>
      <line x1="60" y1="160" x2="340" y2="160" stroke={c.stroke} strokeOpacity="0.3" strokeWidth="2" />
      <motion.circle r="7" fill={c.fill} cy="160"
        animate={{ cx: [60, 340], opacity: [0, 1, 1, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
      {stages.map((s, i) => (
        <g key={i}>
          <motion.rect x={xs[i] - 26} y="138" width="52" height="44" rx="9" fill="var(--surface)" stroke={c.stroke} strokeOpacity="0.5"
            animate={{ stroke: [c.stroke, c.fill, c.stroke] }} transition={loopT(i)} />
          <text x={xs[i]} y="164" textAnchor="middle" fontSize="11" fill="currentColor">{(s || '').slice(0, 8)}</text>
        </g>
      ))}
    </g>
  )
}

function SceneTerminal({ labels = [], c }) {
  const cmd = (labels[0] || 'claude').slice(0, 22)
  return (
    <g>
      <rect x="60" y="80" width="280" height="160" rx="12" fill="#0a0a0b" stroke={c.stroke} strokeOpacity="0.5" />
      <circle cx="80" cy="100" r="4" fill="#ff5f57" /><circle cx="94" cy="100" r="4" fill="#febc2e" /><circle cx="108" cy="100" r="4" fill="#28c840" />
      <text x="78" y="140" fontSize="14" fontFamily="monospace" fill={c.fill}>$ {cmd}</text>
      <motion.rect x={78 + (cmd.length + 2) * 8.2} y="129" width="8" height="15" fill={c.fill}
        animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
      {[170, 190, 210].map((y, i) => (
        <motion.rect key={i} x="78" y={y} height="6" rx="3" fill={c.stroke} fillOpacity="0.4"
          animate={{ width: [0, [180, 120, 150][i]] }} transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', delay: 0.6 + i * 0.4 }} />
      ))}
    </g>
  )
}

function SceneLayers({ labels = [], c }) {
  const ls = (labels.length ? labels : ['base', 'contexto', 'regras', 'resultado']).slice(0, 4)
  return (
    <g>
      {ls.map((l, i) => (
        <g key={i}>
          <motion.rect x={120} y={210 - i * 38} width="160" height="30" rx="7" fill="var(--surface)" stroke={c.stroke} strokeOpacity="0.5"
            initial={{ opacity: 0, y: 230 - i * 38 }}
            animate={{ opacity: [0, 1, 1], x: [120, 120] }} transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.4 }} />
          <text x="200" y={230 - i * 38} textAnchor="middle" fontSize="12" fill="currentColor">{(l || '').slice(0, 16)}</text>
        </g>
      ))}
    </g>
  )
}

function SceneDelegate({ labels = [], c }) {
  return (
    <g>
      <rect x="40" y="130" width="90" height="60" rx="10" fill="var(--surface)" stroke={c.stroke} strokeOpacity="0.5" />
      <text x="85" y="165" textAnchor="middle" fontSize="13" fill="currentColor">{(labels[0] || 'você').slice(0, 9)}</text>
      <rect x="270" y="130" width="90" height="60" rx="10" fill="var(--surface)" stroke={c.stroke} strokeOpacity="0.6" />
      <text x="315" y="165" textAnchor="middle" fontSize="13" fill={c.fill}>{(labels[1] || 'Claude').slice(0, 9)}</text>
      <motion.g animate={{ x: [0, 180, 180], opacity: [1, 1, 0] }} transition={{ duration: 2.8, repeat: Infinity, times: [0, 0.5, 1] }}>
        <rect x="135" y="146" width="28" height="28" rx="5" fill={c.fill} fillOpacity="0.85" />
      </motion.g>
      <motion.g animate={{ x: [0, -180, -180], opacity: [0, 1, 1] }} transition={{ duration: 2.8, repeat: Infinity, delay: 1.4, times: [0, 0.5, 1] }}>
        <rect x="235" y="146" width="28" height="28" rx="5" fill="none" stroke={c.fill} />
        <path d="M242 160 l5 5 l9 -11" stroke={c.fill} strokeWidth="2" fill="none" />
      </motion.g>
    </g>
  )
}

function SceneSpark({ labels = [], c }) {
  return (
    <g>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2
        return <motion.circle key={i} r="4" fill={c.fill}
          animate={{ cx: [200, 200 + Math.cos(a) * 110], cy: [160, 160 + Math.sin(a) * 110], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.18 }} />
      })}
      <motion.circle cx="200" cy="160" r="40" fill={c.fill} fillOpacity="0.12"
        animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      <circle cx="200" cy="160" r="20" fill={c.fill} />
      <text x="200" y="230" textAnchor="middle" fontSize="13" fill="currentColor" fontWeight="600">{(labels[0] || '').slice(0, 22)}</text>
    </g>
  )
}

function SceneNetwork({ labels = [], c }) {
  const nodes = []
  for (let r = 0; r < 3; r++) for (let col = 0; col < 4; col++) nodes.push({ x: 110 + col * 60, y: 100 + r * 55 })
  return (
    <g>
      {nodes.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r="7" fill={c.fill}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }} transition={{ duration: 2.4, repeat: Infinity, delay: (i % 5) * 0.3 }} />
      ))}
      <text x="200" y="250" textAnchor="middle" fontSize="12" fill="currentColor">{(labels[0] || '').slice(0, 24)}</text>
    </g>
  )
}

const SCENES = { loop: SceneLoop, connect: SceneConnect, pipeline: ScenePipeline, terminal: SceneTerminal, layers: SceneLayers, delegate: SceneDelegate, spark: SceneSpark, network: SceneNetwork }

export default function AnimatedHero({ scene = 'spark', labels = [], legenda, accent = 'brand' }) {
  const ac = accentOf(accent)
  const c = { fill: `var(--color-${accent === 'brand' ? 'brand' : accent === 'blue' ? 'brand-2' : accent === 'violet' ? 'brand-3' : 'amber'})`, stroke: `var(--color-${accent === 'brand' ? 'brand' : accent === 'blue' ? 'brand-2' : accent === 'violet' ? 'brand-3' : 'amber'})` }
  const Scene = SCENES[scene] || SceneSpark
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
      className="card overflow-hidden bg-dots relative">
      <svg viewBox="0 0 400 320" className="w-full text-cloud" style={{ maxHeight: 300 }} role="img" aria-label={legenda || 'animação da aula'}>
        <Scene labels={labels} c={c} />
      </svg>
      {legenda && (
        <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-ink to-transparent">
          <p className={`text-sm ${ac.text} font-medium`}>{legenda}</p>
        </div>
      )}
    </motion.div>
  )
}
