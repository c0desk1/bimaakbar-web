function loadCategoryLabels() {
  const container = document.getElementById('category-labels');
  if (!container) {
    console.warn('Elemen #category-labels tidak ditemukan.');
    return;
  }

  const labels = [
    { name: 'Musik', sheet: 'musik', url: 'html/d/musik.html' },
    { name: 'Game', sheet: 'game', url: 'html/d/game.html' },
    { name: 'Tutorial', sheet: 'tutorial', url: 'html/d/tutorial.html' },
    { name: 'Tips', sheet: 'tips', url: 'html/d/tips.html' },
    { name: 'Shop', sheet: 'shop', url: 'html/d/shop.html' },
  ];

  const sheetId = '10fSdWnRM2rYLYfJufWl-IkBeul2CgZSoUmOaeneO8xk';

  labels.forEach(label => {
    fetch(`https://opensheet.elk.sh/${sheetId}/${label.sheet}`)
      .then(res => res.json())
      .then(data => {
        if (!data || data.length === 0) {
          console.warn(`Sheet ${label.sheet} kosong, gunakan fallback thumbnail`);
          appendCategoryCard(label, '/assets/error.jpg');
          return;
        }

        // Cari postingan dengan timestamp terbesar
        let latestPost = data.reduce((prev, curr) => {
          const prevTime = Number(prev.timestamp) || 0;
          const currTime = Number(curr.timestamp) || 0;
          return currTime > prevTime ? curr : prev;
        }, data[0]);

        const thumb = latestPost.thumbnail || '/assets/error.jpg';

        appendCategoryCard(label, thumb);
      })
      .catch(err => {
        console.error(`Gagal mengambil thumbnail untuk ${label.name}`, err);
        appendCategoryCard(label, '/assets/error.jpg');
      });
  });

  function appendCategoryCard(label, thumb) {
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
  }
}
window.loadCategoryLabels = loadCategoryLabels;