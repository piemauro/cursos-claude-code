import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

function getInitial() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.getAttribute('data-theme') || 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitial)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('tema', theme) } catch {}
  }, [theme])
  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return (
    <button onClick={toggle} aria-label="Alternar tema claro/escuro"
      className="grid place-items-center w-9 h-9 rounded-lg border border-line text-fog hover:text-cloud hover:border-fog transition">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}>
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
