function loadCategoriesForIndex() {
  const categoryGrid = document.querySelector('.category-grid');
  if (!categoryGrid) return;

  categoryGrid.innerHTML = '<div class="loading-spinner">Memuat...</div>';

  const categories = [
    { name: 'musik', title: 'Musik' },
    { name: 'tutorial', title: 'Tutorial' },
    { name: 'tips-trik', title: 'Tips & Trik' },
    { name: 'game', title: 'Game' },
    { name: 'shop', title: 'Shop' }
  ];

  const promises = categories.map(async (cat) => {
    const name = cat.name.trim();
    const title = cat.title.trim();

    try {
      const res = await fetch(`https://opensheet.elk.sh/1ES0oKihVPw3LVwnFtlquFNltyIFvEImL-4gy-5fw2bA/${name}`);
      if (!res.ok) throw new Error(`Gagal fetch data kategori: ${name}`);

      const posts = await res.json();
      const latestPost = posts.length > 0 ? posts[0] : null;

      const thumbnail = latestPost?.thumbnail?.trim() || 'assets/logo.png';

      const card = document.createElement('a');
      card.className = 'category-card';
      card.href = `html/d/${name}-list.html`;
      card.innerHTML = `
        <img src="${thumbnail}" alt="${title}" loading="lazy"
             onerror="this.onerror=null;this.src='assets/logo.png';">
        <h3>${title}</h3>
      `;
      return card;
    } catch (error) {
      console.error(`Gagal load kategori: ${name}`, error);
      return null;
    }
  });

  Promise.all(promises).then((cards) => {
    categoryGrid.innerHTML = '';
    cards.forEach((card) => {
      if (card) categoryGrid.appendChild(card);
    });
  });
  const res = await fetch(url);
console.log('Status fetch:', res.status, res.statusText);

const posts = await res.json();
console.log('Data posts:', posts);

posts.forEach(post => {
  console.log('Label:', post.label, 'Thumbnail:', post.thumbnail);
});

}

window.loadCategoriesForIndex = loadCategoriesForIndex;
