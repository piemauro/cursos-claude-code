// Catálogo de cursos — hub multi-curso. Conteúdo original (síntese própria), crédito ao oficial gratuito da Anthropic.
import cursoCodeAulas from './curso.json'                       // Claude Code na Prática (com módulos)
import { CURSO as CODE_ESTRUTURA } from './estrutura.js'
import c101 from './cursos/claude-101.json'
import cc101 from './cursos/claude-code-101.json'
import cp101 from './cursos/claude-platform-101.json'
import cowork from './cursos/introduction-to-claude-cowork.json'
import aifluency from './cursos/ai-fluency-framework-foundations.json'

export const OFICIAL = {
  base: 'https://anthropic.skilljar.com',
  nota: 'Releitura própria, em português, para estudo e aplicação prática. Os cursos originais, completos e gratuitos, são da Anthropic.',
}

// Cada curso: meta + lessons[] (cada lesson = conteúdo original estruturado).
export const CATALOGO = [
  {
    slug: 'claude-code',
    titulo: 'Claude Code na Prática',
    subtitulo: 'Do setup ao SDK — o agente de código no seu terminal.',
    nivel: 'Intermediário',
    icone: 'Terminal',
    accent: 'brand',
    oficial: 'claude-code-in-action',
    destaque: true,
    modulos: CODE_ESTRUTURA.modulos,   // tem módulos
    lessons: cursoCodeAulas,
  },
  {
    slug: 'claude-101',
    titulo: 'Claude 101',
    subtitulo: 'Domine o Claude no dia a dia: projetos, artifacts, skills e mais.',
    nivel: 'Iniciante',
    icone: 'Sparkles',
    accent: 'blue',
    oficial: 'claude-101',
    lessons: c101,
  },
  {
    slug: 'claude-code-101',
    titulo: 'Claude Code 101',
    subtitulo: 'Os fundamentos do agente de código: do primeiro prompt aos hooks.',
    nivel: 'Iniciante',
    icone: 'Code',
    accent: 'brand',
    oficial: 'claude-code-101',
    lessons: cc101,
  },
  {
    slug: 'claude-platform-101',
    titulo: 'Claude Platform 101',
    subtitulo: 'A plataforma de desenvolvedor: API, tool use, agentes gerenciados.',
    nivel: 'Intermediário',
    icone: 'Boxes',
    accent: 'violet',
    oficial: 'claude-platform-101',
    lessons: cp101,
  },
  {
    slug: 'claude-cowork',
    titulo: 'Claude Cowork',
    subtitulo: 'Delegue trabalho de verdade: tarefas, contexto, skills e plugins.',
    nivel: 'Iniciante',
    icone: 'Users',
    accent: 'amber',
    oficial: 'introduction-to-claude-cowork',
    lessons: cowork,
  },
  {
    slug: 'ai-fluency',
    titulo: 'Fluência em IA — Framework 4D',
    subtitulo: 'Delegation, Description, Discernment, Diligence: trabalhar bem com IA.',
    nivel: 'Iniciante',
    icone: 'Compass',
    accent: 'blue',
    oficial: 'ai-fluency-framework-foundations',
    lessons: aifluency,
  },
]
