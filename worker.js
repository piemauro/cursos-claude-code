// Serve a SPA num subpath (ex: /cursos/* ou /cursosv2/*). Tira o 1º segmento
// antes de buscar no bucket de assets; fallback SPA p/ index.html.
export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const stripped = url.pathname.replace(/^\/[^/]+/, '') || '/'
    const assetURL = new URL((stripped || '/') + url.search, url.origin)

    let res = await env.ASSETS.fetch(new Request(assetURL, request))
    if (res.status === 404) {
      const idx = await env.ASSETS.fetch(new URL('/index.html', url.origin))
      res = new Response(idx.body, {
        status: 200,
        headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-cache' },
      })
    }
    return res
  },
}
