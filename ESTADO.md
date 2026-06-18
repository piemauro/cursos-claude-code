# ESTADO — Cursos Pietro (handoff p/ retomar)

> Última atualização: 2026-06-18. Site de cursos do Pietro Mauro, conteúdo **original** (síntese própria, voz anti-hype) com crédito aos cursos oficiais **gratuitos da Anthropic**. Duas versões no ar.

## 🌐 No ar
| URL | Worker (Cloudflare) | Route | Assets | Skin |
|---|---|---|---|---|
| **piemauro.com.br/cursos/** | `cursos-piemauro` | `piemauro.com.br/cursos*` | `dist/` | v1 sólido (Apple light) |
| **piemauro.com.br/cursosv2/** | `cursos-piemauro-v2` | `piemauro.com.br/cursosv2*` | `dist-v2/` | v2 liquid glass |
| piemauro.github.io/cursos-claude-code | GitHub Pages (standalone, HashRouter) | — | gh-pages branch | **desatualizado** (1ª versão; pode ignorar/remover) |

- Site principal piemauro.com.br **não é tocado** — os Workers só interceptam `/cursos*` e `/cursosv2*`.
- Cloudflare: conta **WS ST Host** `e67da4ee2cc32a63bb3cbcec214e8f8a` · zona piemauro.com.br `bbf3d7980b24081135b1e19d18b5dce4`.

## 📦 Repositórios
- **piemauro/cursos-claude-code** (público) — fonte oficial (git) do app do site.
- **piemauro/cursos-anthropic** (privado) — arquivo completo: `engine/` + `cursos/` (6 cursos baixados) + `site/` (cópia do app) + docs (`HISTORICO.md`, este `ESTADO.md`).

## 🧱 Stack
React 18 · Vite 6 · Tailwind 4 (`@tailwindcss/vite`) · Framer Motion 11 · React Router 6 (`BrowserRouter`, `basename = import.meta.env.BASE_URL`). Deploy via Cloudflare Workers + Static Assets (`env.ASSETS`).

## 🏗️ Build & Deploy
```bash
cd ~/projetos/cursos-claude-code   # (no Mac primário; no sshpiemac fica em site/)
npm install

# v1 (/cursos/)
npm run build                                   # -> dist/
# v2 (/cursosv2/, liquid glass)
BASE_PATH=/cursosv2/ OUT_DIR=dist-v2 VITE_SKIN=v2 npm run build   # -> dist-v2/

# deploy (precisa do token Cloudflare no env)
export CLOUDFLARE_API_TOKEN=...   # permissões: Workers Scripts (Edit) + Workers Routes (Edit) na zona
export CLOUDFLARE_ACCOUNT_ID=e67da4ee2cc32a63bb3cbcec214e8f8a
npx wrangler deploy                       # v1
npx wrangler deploy -c wrangler.v2.toml   # v2
```
- `vite.config.js` lê `BASE_PATH` (default `/cursos/`) e `OUT_DIR` (default `dist`).
- `main.jsx` adiciona `class="v2"` no `<html>` quando `VITE_SKIN=v2`.
- `worker.js` é genérico: tira o 1º segmento do path e faz fallback SPA pro `index.html`. Serve tanto `/cursos/*` quanto `/cursosv2/*`.
- ⚠️ Os tokens Cloudflare usados no chat eram **temporários** — gere um novo quando for deployar (e **rotacione** os antigos por segurança).

## 🗂️ Estrutura do app (`src/`)
```
data/
  catalogo.js     # registro dos 6 cursos (slug, título, accent, ícone, lessons[])
  estrutura.js    # módulos do curso claude-code
  curso.json      # 19 aulas do Claude Code (conteúdo original)
  cursos/*.json   # 5 cursos (66 aulas) — claude-101, claude-code-101, claude-platform-101,
                  #   introduction-to-claude-cowork, ai-fluency-framework-foundations
  quizzes.json    # 85 mini-quizzes (3 questões cada = 255) — chave "curso/slug"
  hero.json       # 23 overrides de cena animada (resto usa heurística por título)
lib/cursos.js     # loaders: getCatalogo, getCurso, getAula, getVizinhas, getQuiz, getHero
components/
  Nav, Footer, ThemeToggle, ScrollProgress
  Bits.jsx        # Reveal, PageWrap, Badge, CodeBlock, Counter, ICONS, ACCENT/accentOf
  AnimatedHero.jsx# 8 cenas SVG+Framer (loop/connect/pipeline/terminal/layers/delegate/spark/network) + chips
  Flashcards.jsx  # flip 3D dos conceitos
  Quiz.jsx        # MCQ com feedback animado + placar
  LessonSidebar.jsx# nav lateral da aula (telas grandes)
  Aurora.jsx      # fundo aurora animado (só v2)
pages/
  Home.jsx        # hub (lista os 6 cursos)
  Curso.jsx       # landing do curso (lista aulas, agrupadas em módulos se houver)
  Aula.jsx        # aula: sidebar + hero animado + conteúdo + flashcards + quiz
  Sobre.jsx
styles/index.css  # tema claro(default)/escuro via tokens semânticos + seção "SKIN V2" (liquid glass)
worker.js · wrangler.toml (v1) · wrangler.v2.toml (v2)
```

## 🎨 Tema & v2 Liquid Glass
- Tokens semânticos em runtime: `:root` = **claro nativo** (default), `html[data-theme="dark"]` = escuro. Toggle persiste em `localStorage('tema')`; script inline no `index.html` evita flash.
- **v2** = porte web do `liquid_glass_renderer` (Flutter, lab em `sshpiemac:~/Developer/liquid_glass_renderer_lab` — pacote **não suporta web/Impeller**, por isso é porte CSS). Efeito: `backdrop-filter: blur+saturate` + borda especular (lightAngle) + tint (glassColor) + sombra de espessura + **Aurora** animada atrás (refração precisa de cor). Tudo na seção `SKIN V2` do `index.css`, ativada por `html.v2`.

## ✅ Feito
- 6 cursos baixados (uso pessoal/estudo) — ver `cursos/` no repo privado.
- Site multi-curso: 85 aulas de **conteúdo original**, 255 questões de quiz, flashcards, 85 aberturas animadas.
- Tema claro/escuro, sidebar de aula (telas grandes), responsivo, deploy v1 + v2 no domínio.

## ⏳ Pendências / próximos
- **62 heros** ainda usam cena heurística (rate-limit transitório derrubou os agentes); re-rodar pra refinar cena+rótulos. Workflow: gerar `{scene,labels,legenda}` por aula a partir de `data/*` e mesclar em `hero.json`.
- **Painel de crítica de UI** (3 agentes: contraste/a11y, hierarquia/layout, motion) → lista priorizada de ajustes.
- Decidir **v1 vs v2** (ou híbrido: glass na nav/cards, leitura sólida).
- Bundle ~940KB (1 chunk) — considerar code-split por rota.
- Opcional: progresso por curso persistido, busca entre cursos, sidebar também no Home/Curso, certificado/checklist.
- GitHub Pages standalone (gh-pages) está velho — atualizar ou remover.

## 🔐 Segurança
Rotacionar/revogar os tokens Cloudflare + chaves R2 que passaram pelo chat.
