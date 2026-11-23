/* Mapa Leaflet + tiles do OpenStreetMap (atribuição obrigatória incluída).
   Não conhece o conteúdo das lembranças: recebe tudo pronto do app.js. */
const MapView = (() => {
  let map;
  const pins = {};

  // Marcador delicado: gota em vermelho queimado com o número da lembrança
  const icon = n => L.divIcon({
    className: 'pin',
    html: `<span><b>${n}</b></span>`,
    iconSize: [32, 32], iconAnchor: [15, 36], popupAnchor: [0, -34]
  });

  function init(items, onPick, popupHtml) {
    map = L.map('map', { scrollWheelZoom: false }).setView([-14.2, -51.9], 4);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      referrerPolicy: 'strict-origin-when-cross-origin', // exigido pela política de tiles do OSM
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const pts = [];
    items.forEach(({ m, n }) => {
      if (m.latitude == null || m.longitude == null) return; // sem coordenada, sem marcador
      const ll = [m.latitude, m.longitude];
      pts.push(ll);
      pins[m.id] = L.marker(ll, { icon: icon(n), title: m.title })
        .addTo(map)
        .bindPopup(popupHtml(m), { maxWidth: 240, autoPanPadding: [16, 16] })
        .on('click', () => onPick(m.id));
    });
    if (pts.length > 1) map.fitBounds(pts, { padding: [40, 40] });
    else if (pts.length) map.setView(pts[0], 12);
  }

  // Destaca o marcador, centraliza e abre o cartão
  function focus(id) {
    const p = pins[id];
    if (!p) return;
    Object.values(pins).forEach(x => x.getElement()?.classList.remove('on'));
    p.getElement()?.classList.add('on');
    map.setView(p.getLatLng(), Math.max(map.getZoom(), 11), { animate: true });
    p.openPopup();
  }

  return { init, focus };
})();
