# Nossa história

Álbum digital em HTML, CSS e JavaScript puros. Mapa com Leaflet e OpenStreetMap. Sem chave de API e sem custo.

## Como personalizar
1. Coloque as fotos em `assets/photos/`. Reduza cada uma para cerca de 1600 px de largura (200 a 400 KB). `capa.jpg` é a foto de abertura e `carta.jpg` a da carta final.
2. Edite **só** `js/memories.js`: lembranças (10 a 20, ou quantas quiser) e texto da carta.
3. Apague `demo: true` de cada lembrança real. Isso remove a etiqueta "exemplo fictício".
4. Para o marcador aparecer no mapa, preencha `latitude` e `longitude`. No site do OpenStreetMap, clique com o botão direito no lugar e escolha "Mostrar endereço". Sem coordenadas, a lembrança aparece só na linha do tempo.

## Testar no computador
O visual, a linha do tempo e a carta funcionam abrindo o `index.html` ou com `python3 -m http.server` (http://localhost:8000).

**O mapa pode aparecer com tiles "403 Access blocked" nesses testes locais.** O OpenStreetMap exige que o navegador envie o endereço do site (Referer), e isso não acontece em arquivo aberto direto, e às vezes nem em localhost. Não é defeito do site. O teste confiável do mapa é no endereço publicado do GitHub Pages.

## Publicar no GitHub Pages
1. Crie um repositório público no GitHub e envie todos os arquivos desta pasta (incluindo `vendor/`).
2. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Em alguns minutos o endereço aparece: `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## QR Code
Gere um QR Code **estático** com esse endereço (qualquer gerador gratuito que não use links temporários). Teste a leitura no Android e no iPhone antes de imprimir. Não renomeie o repositório depois de imprimir, porque o endereço mudaria.

## Atribuição e uso dos mapas
A atribuição ao OpenStreetMap já aparece no mapa e deve ser mantida. Os tiles públicos do OSM servem bem para um site pessoal de baixo tráfego.
