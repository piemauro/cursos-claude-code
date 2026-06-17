// Serve a SPA de cursos em piemauro.com.br/cursos/* (assets em base /cursos/).
// Tira o prefixo /cursos antes de buscar no bucket de assets; faz fallback SPA p/ index.html.
export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const stripped = url.pathname.replace(/^\/cursos(\/|$)/, '/') || '/'
    const assetURL = new URL(stripped + url.search, url.origin)

    let res = await env.ASSETS.fetch(new Request(assetURL, request))
    if (res.status === 404) {
      // rota da SPA (ex: /cursos/claude-code) -> entrega o index
      const idx = await env.ASSETS.fetch(new URL('/index.html', url.origin))
      res = new Response(idx.body, {
        status: 200,
        headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-cache' },
      })
    }
    return res
  },
}
