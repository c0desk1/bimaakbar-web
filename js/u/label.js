function loadCategoryLabels() {
  const container = document.getElementById('category-labels');
  if (!container) {
    console.warn('Elemen #category-labels tidak ditemukan.');
    return;
  }
  container.innerHTML = ''; // Kosongkan container dulu

  const labels = [
    { name: 'Musik', sheet: 'musik', url: 'html/d/musik.html' },
    { name: 'Game', sheet: 'game', url: 'html/d/game.html' },
    { name: 'Tutorial', sheet: 'tutorial', url: 'html/d/tutorial.html' },
    { name: 'Tips', sheet: 'tips', url: 'html/d/tips.html' },
    { name: 'Shop', sheet: 'shop', url: 'html/d/shop.html' },
  ];

  const sheetId = '10fSdWnRM2rYLYfJufWl-IkBeul2CgZSoUmOaeneO8xk';

  const fetches = labels.map(label =>
    fetch(`https://opensheet.elk.sh/${sheetId}/${label.sheet}`)
      .then(res => {
        if (!res.ok) throw new Error(`Fetch ${label.sheet} gagal: ${res.status}`);
        return res.json();
      })
      .then(data => {
        let latestPost = null;
        if (Array.isArray(data) && data.length) {
          latestPost = data.reduce((prev, curr) => {
            const prevTime = Date.parse(prev.timestamp) || 0;
            const currTime = Date.parse(curr.timestamp) || 0;
            return currTime > prevTime ? curr : prev;
          }, data[0]);
        }
        return {
          label,
          latestPost,
        };
      })
      .catch(err => {
        console.error(`Gagal fetch sheet ${label.sheet}`, err);
        return {
          label,
          latestPost: null,
        };
      })
  );

  Promise.all(fetches).then(results => {
    results.forEach(({ label, latestPost }) => {
      const thumb = latestPost?.thumbnail || '/assets/error.jpg';

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
    });
  });
}

window.loadCategoryLabels = loadCategoryLabels;