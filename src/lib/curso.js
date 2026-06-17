import { CURSO } from '../data/estrutura.js'
import aulas from '../data/curso.json'

// índice slug -> aula (conteúdo original)
const BY_SLUG = Object.fromEntries(aulas.map((a) => [a.slug, a]))

export function getCurso() {
  return CURSO
}

export function getModulos() {
  return CURSO.modulos.map((m) => ({
    ...m,
    aulas: m.aulas.map((slug) => BY_SLUG[slug]).filter(Boolean),
  }))
}

export function getModulo(id) {
  const m = CURSO.modulos.find((x) => x.id === id)
  if (!m) return null
  return { ...m, aulas: m.aulas.map((slug) => BY_SLUG[slug]).filter(Boolean) }
}

export function getAula(slug) {
  return BY_SLUG[slug] || null
}

// lista linear de todas as aulas na ordem dos módulos
export function getAulasLineares() {
  const list = []
  CURSO.modulos.forEach((m) => {
    m.aulas.forEach((slug) => {
      const a = BY_SLUG[slug]
      if (a) list.push({ ...a, moduloId: m.id, moduloTitulo: m.titulo })
    })
  })
  return list
}

export function getVizinhas(slug) {
  const lin = getAulasLineares()
  const i = lin.findIndex((a) => a.slug === slug)
  return { anterior: i > 0 ? lin[i - 1] : null, proxima: i < lin.length - 1 ? lin[i + 1] : null, indice: i, total: lin.length }
}

export function totals() {
  const lin = getAulasLineares()
  return { aulas: lin.length, modulos: CURSO.modulos.length }
}
