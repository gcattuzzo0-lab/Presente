/* =====================================================================
   ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR.
   Linha do tempo e mapa leem esta mesma lista.

   Para adicionar uma lembrança, copie um bloco { ... } e preencha:
   - id: número único
   - date: "AAAA-MM-DD"
   - latitude / longitude: números (ex.: -29.1234) ou null (sem marcador)
   - photos: caminhos das fotos em assets/photos/ (pode ser mais de uma)
   - demo: apague esta linha ao colocar conteúdo real
   ===================================================================== */

window.SITE = {
  letter: {
    title: "FELIZ NATAL MEU AMORtesteteste",
    photo: "assets/photos/carta.jpg",
    paragraphs: [
      "Não sou muito bom em escrever, mas quero que você saiba que sou muito feliz e grato por ter te conhecido.",
      "Eu amo cada momento que passamos juntos e quero passar muito tempo ao seu lado, te fazendo feliz, construindo nossa vida juntos e criando muitas memorias com você."
    ],
    signature: "Com muito amor, seu namorado"
  }
};

window.MEMORIES = [
  {
    id: 1,
    title: "Nossa primeira viagem",
    date: "2025-06-15",
    location: "Gramado, RS",
    latitude: null,   // preencha com a coordenada real para aparecer no mapa
    longitude: null,
    description: "Uma das primeiras viagens que fizemos juntos. Um dia especial que merece ficar guardado para sempre.",
    photos: ["assets/photos/memoria-01.jpg"],
    demo: true
  },
  {
    id: 2,
    title: "Momento demonstrativo B",
    date: "2025-08-02",
    location: "Local fictício B",
    latitude: -30.0,  // coordenada de exemplo, não é um lugar real
    longitude: -51.0,
    description: "Texto de exemplo. Aqui entra a história real deste dia.",
    photos: ["assets/photos/memoria-02.jpg", "assets/photos/memoria-02b.jpg"],
    demo: true
  },
  {
    id: 3,
    title: "Momento demonstrativo C",
    date: "2025-09-20",
    location: "Local fictício C",
    latitude: -29.5,  // coordenada de exemplo
    longitude: -50.5,
    description: "Texto de exemplo. Conte o que aconteceu, o que vocês comeram, o que riram.",
    photos: ["assets/photos/memoria-03.jpg"],
    demo: true
  },
  {
    id: 4,
    title: "Momento demonstrativo D",
    date: "2025-11-08",
    location: "Local fictício D",
    latitude: -29.0,  // coordenada de exemplo
    longitude: -52.0,
    description: "Texto de exemplo. Cada lembrança pode ter uma ou várias fotos.",
    photos: ["assets/photos/memoria-04.jpg"],
    demo: true
  }
];
