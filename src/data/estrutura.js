// Estrutura do curso — organização original em PT-BR.
// Conteúdo de cada aula é gerado como síntese ORIGINAL (ver curso.json).
export const CURSO = {
  titulo: "Claude Code na Prática",
  subtitulo: "Do setup ao SDK — direto ao ponto, com a operação no centro.",
  creditoOficial: {
    nome: "Claude Code in Action",
    autor: "Anthropic",
    url: "https://anthropic.skilljar.com/claude-code-in-action",
    nota: "Curso original e gratuito da Anthropic. Este material é uma releitura própria, em português, para estudo e aplicação prática.",
  },
  modulos: [
    {
      id: "fundamentos",
      n: 1,
      titulo: "Fundamentos",
      resumo: "O que é o Claude Code, como pensa um assistente de código e o que muda no seu fluxo.",
      icone: "Compass",
      aulas: ["boas-vindas", "assistente-de-codigo", "tour-claude-code"],
    },
    {
      id: "maos-a-obra",
      n: 2,
      titulo: "Mãos à obra",
      resumo: "Instalar, preparar o projeto, dar contexto, fazer alterações e dominar comandos, MCP e GitHub.",
      icone: "Wrench",
      aulas: ["instalacao-setup", "preparando-projeto", "dando-contexto", "fazendo-alteracoes", "controlando-contexto", "comandos-customizados", "servidores-mcp", "integracao-github"],
    },
    {
      id: "hooks-sdk",
      n: 3,
      titulo: "Hooks e o SDK",
      resumo: "Automatize e estenda o Claude Code com hooks e construa em cima dele com o SDK.",
      icone: "Plug",
      aulas: ["introducao-hooks", "definindo-hooks", "implementando-hook", "pegadinhas-hooks", "hooks-uteis", "mais-um-hook", "sdk-claude-code"],
    },
    {
      id: "encerramento",
      n: 4,
      titulo: "Encerramento",
      resumo: "O que levar daqui e como continuar evoluindo.",
      icone: "Flag",
      aulas: ["resumo-proximos-passos"],
    },
  ],
};

// mapa slug-do-site -> arquivo de pesquisa (uso interno de geração; não exibido)
export const FONTE = {
  "boas-vindas": "01-introduction",
  "assistente-de-codigo": "02-what-is-a-coding-assistant",
  "tour-claude-code": "03-claude-code-in-action",
  "instalacao-setup": "04-claude-code-setup",
  "preparando-projeto": "05-project-setup",
  "dando-contexto": "06-adding-context",
  "fazendo-alteracoes": "07-making-changes",
  "controlando-contexto": "09-controlling-context",
  "comandos-customizados": "10-custom-commands",
  "servidores-mcp": "11-mcp-servers-with-claude-code",
  "integracao-github": "12-github-integration",
  "introducao-hooks": "13-introducing-hooks",
  "definindo-hooks": "14-defining-hooks",
  "implementando-hook": "15-implementing-a-hook",
  "pegadinhas-hooks": "16-gotchas-around-hooks",
  "hooks-uteis": "17-useful-hooks",
  "mais-um-hook": "18-another-useful-hook",
  "sdk-claude-code": "19-the-claude-code-sdk",
  "resumo-proximos-passos": "21-summary-and-next-steps",
};
