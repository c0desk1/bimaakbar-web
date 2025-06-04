function loadCategoryLabels() {
  const container = document.getElementById('category-labels');
  if (!container) {
    console.warn('Elemen #category-labels tidak ditemukan.');
    return;
  }

  const labels = [
    { name: 'Musik', sheet: 'musik', url: 'musik-list.html' },
    { name: 'Game', sheet: 'game', url: 'game-list.html' },
    { name: 'Tutorial', sheet: 'tutorial', url: 'tutorial-list.html' },
    { name: 'Tips', sheet: 'tips', url: 'tips-list.html' },
    { name: 'Shop', sheet: 'shop', url: 'shop-list.html' },
  ];

  labels.forEach(label => {
    fetch(`https://opensheet.elk.sh/10fSdWnRM2rYLYfJufWl-IkBeul2CgZSoUmOaeneO8xk/${label.sheet}`)
      .then(res => res.json())
      .then(data => {
        const post = data[0]; // Ambil postingan terbaru
        const thumb = post?.thumbnail || '/assets/error.jpg';

        const card = document.createElement('a');
        card.href = label.url;
        card.className = 'category-card';
        card.style.backgroundImage = `url('${thumb}')`;

        card.innerHTML = `
          <div class="category-content">
            <h3>${label.name}</h3>
          </div>
        `;

        container.appendChild(card);
      })
      .catch(err => {
        console.error(`Gagal mengambil thumbnail untuk ${label.name}`, err);
      });
  });
}

window.loadCategoryLabels = loadCategoryLabels;