/* Renderiza linha do tempo e carta, e conecta mapa <-> linha do tempo. */
(() => {
  document.documentElement.classList.add('js');
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  const date = d => fmt.format(new Date(d + 'T12:00:00')); // meio-dia evita erro de fuso
  const photo = (src, alt) => `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async">`;

  const list = [...MEMORIES].sort((a, b) => a.date.localeCompare(b.date));
  const items = list.map((m, i) => ({ m, n: i + 1 }));
  const mapped = list.filter(m => m.latitude != null && m.longitude != null);
  let current = null;

  // Foto ausente? Mostra um espaço reservado em vez de imagem quebrada
  document.addEventListener('error', e => {
    if (e.target.tagName !== 'IMG') return;
    const ph = document.createElement('div');
    ph.className = 'ph';
    ph.textContent = 'sua foto aqui';
    e.target.replaceWith(ph);
  }, true);

  // ---- Linha do tempo
  $('#timeline').innerHTML = list.map(m => `
    <li class="mem rv" id="m${esc(m.id)}">
      <time datetime="${esc(m.date)}">${date(m.date)}</time>
      <div class="strip">${m.photos.map(p => `<figure class="polaroid">${photo(p, m.title)}</figure>`).join('')}</div>
      <h3>${esc(m.title)}${m.demo ? ' <small class="demo">exemplo fictício</small>' : ''}</h3>
      <p class="loc">${esc(m.location)}</p>
      <p>${esc(m.description)}</p>
      ${m.latitude != null ? `<button class="btn sm" type="button" data-map="${esc(m.id)}">Ver no mapa</button>` : ''}
    </li>`).join('');

  // ---- Cartão do marcador
  const popup = m => `<div class="pop">
    ${m.photos[0] ? photo(m.photos[0], m.title) : ''}
    <strong>${esc(m.title)}</strong>
    <span>${date(m.date)} · ${esc(m.location)}</span>
    <p>${esc(m.description)}</p>
    <button class="link" type="button" data-tl="${esc(m.id)}">Ver na linha do tempo</button>
    <a href="https://www.openstreetmap.org/?mlat=${m.latitude}&amp;mlon=${m.longitude}#map=15/${m.latitude}/${m.longitude}" target="_blank" rel="noopener">Abrir localização</a>
  </div>`;

  // ---- Integração: uma única função de seleção
  function select(id, scrollTo) {
    current = String(id);
    document.querySelectorAll('.mem').forEach(el => el.classList.toggle('on', el.id === 'm' + current));
    MapView.focus(id);
    const i = mapped.findIndex(m => String(m.id) === current);
    $('#count').textContent = i < 0 ? '' : `${i + 1} de ${mapped.length}`;
    if (scrollTo === 'map') $('#mapa').scrollIntoView({ behavior: 'smooth' });
    if (scrollTo === 'timeline') $('#m' + current).scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-map],[data-tl]');
    if (!b) return;
    b.dataset.map ? select(b.dataset.map, 'map') : select(b.dataset.tl, 'timeline');
  });

  const step = d => {
    const idx = mapped.findIndex(m => String(m.id) === current);
    const i = idx < 0 ? (d > 0 ? -1 : 0) : idx;
    select(mapped[(i + d + mapped.length) % mapped.length].id);
  };
  $('#prev').onclick = () => step(-1);
  $('#next').onclick = () => step(1);

  MapView.init(items, id => select(id), popup);
  if (!mapped.length) {
    $('.hint').textContent = 'Adicione latitude e longitude em js/memories.js para ver os lugares aqui.';
    $('.mapnav').hidden = true;
  }

  // O OpenStreetMap bloqueia mapas sem Referer, o que acontece ao abrir o arquivo direto (file://)
  if (location.protocol === 'file:' || /^(localhost|127\.)/.test(location.hostname)) {
    $('.hint').textContent = 'Teste local: o OpenStreetMap pode bloquear o mapa aqui. Publicado no GitHub Pages, ele carrega normalmente.';
  }

  // ---- Carta final
  const c = SITE.letter;
  const letter = $('#letter');
  letter.style.setProperty('--n', c.paragraphs.length);
  letter.innerHTML = `<h2>${esc(c.title)}</h2>
    <figure class="polaroid">${photo(c.photo, 'Nós dois')}</figure>
    ${c.paragraphs.map((p, i) => `<p class="ln" style="--i:${i}">${esc(p)}</p>`).join('')}
    <p class="sign">${esc(c.signature)}</p>
    <div class="seal" aria-hidden="true">2025</div>`;

  // ---- Revelação suave ao rolar
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));
})();
