import { CATALOGO, OFICIAL } from '../data/catalogo.js'
import QUIZZES from '../data/quizzes.json'
import HEROS from '../data/hero.json'

const BY_SLUG = Object.fromEntries(CATALOGO.map((c) => [c.slug, c]))

// Heurística: escolhe a cena animada a partir do título (fallback quando não há override de agente).
function cenaHeuristica(titulo = '') {
  const t = titulo.toLowerCase()
  if (/hook/.test(t)) return 'pipeline'
  if (/mcp|conect|tool|integ|plugin|ferrament|github|chrome|365/.test(t)) return 'connect'
  if (/context|claude\.md|mem[óo]r|projeto|camada/.test(t)) return 'layers'
  if (/instal|setup|prompt|primeir|comando|terminal|api/.test(t)) return 'terminal'
  if (/loop|agent|como funciona|workflow|explorar|racioc|thinking/.test(t)) return 'loop'
  if (/deleg|cowork|tarefa|colabora/.test(t)) return 'delegate'
  if (/skill|time|compartilh|fun[çc][ãa]o|caso|rede|enterprise|search/.test(t)) return 'network'
  return 'spark'
}

export function getHero(cursoSlug, aulaSlug, aula) {
  const ov = HEROS[`${cursoSlug}/${aulaSlug}`]
  if (ov) return ov
  const labels = (aula?.conceitos || []).slice(0, 4).map((c) => c.termo)
  return { scene: cenaHeuristica(aula?.titulo), labels, legenda: aula?.takeaway || aula?.resumo || '' }
}

export { OFICIAL }

export function getQuiz(cursoSlug, aulaSlug) {
  return QUIZZES[`${cursoSlug}/${aulaSlug}`] || null
}

export function getCatalogo() {
  return CATALOGO.map((c) => ({
    slug: c.slug, titulo: c.titulo, subtitulo: c.subtitulo, nivel: c.nivel,
    icone: c.icone, accent: c.accent, destaque: !!c.destaque,
    totalAulas: c.lessons.length,
  }))
}

export function getCurso(slug) {
  const c = BY_SLUG[slug]
  if (!c) return null
  // ordena lessons; se houver módulos (claude-code), agrupa
  const bySlug = Object.fromEntries(c.lessons.map((l) => [l.slug, l]))
  let secoes
  if (c.modulos) {
    secoes = c.modulos.map((m) => ({
      titulo: m.titulo, resumo: m.resumo,
      aulas: m.aulas.map((s) => bySlug[s]).filter(Boolean),
    })).filter((s) => s.aulas.length)
  } else {
    secoes = [{ titulo: null, aulas: c.lessons }]
  }
  return { ...c, secoes }
}

export function getAula(cursoSlug, aulaSlug) {
  const c = BY_SLUG[cursoSlug]
  if (!c) return null
  return c.lessons.find((l) => l.slug === aulaSlug) || null
}

export function getVizinhas(cursoSlug, aulaSlug) {
  const c = BY_SLUG[cursoSlug]
  if (!c) return { anterior: null, proxima: null, indice: 0, total: 0 }
  const i = c.lessons.findIndex((l) => l.slug === aulaSlug)
  return {
    anterior: i > 0 ? c.lessons[i - 1] : null,
    proxima: i < c.lessons.length - 1 ? c.lessons[i + 1] : null,
    indice: i, total: c.lessons.length,
  }
}

export function totals() {
  return {
    cursos: CATALOGO.length,
    aulas: CATALOGO.reduce((n, c) => n + c.lessons.length, 0),
  }
}
