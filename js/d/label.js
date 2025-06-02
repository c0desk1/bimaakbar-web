function loadCategoriesForIndex() {
  const categoryGrid = document.querySelector('.category-grid');
  if (!categoryGrid) return;

  categoryGrid.innerHTML = '<div class="loading-spinner">Memuat...</div>';

  const promises = categories.map(async (cat) => {
    try {
      const res = await fetch(`https://opensheet.elk.sh/1ES0oKihVPw3LVwnFtlquFNltyIFvEImL-4gy-5fw2bA/${cat.name}`);
      if (!res.ok) throw new Error(`Gagal fetch data kategori: ${cat.name}`);

      const posts = await res.json();
      const latestPost = posts.length > 0 ? posts[0] : null;

      // Ambil thumbnail dari post terbaru, jika tidak ada pakai default
      const thumbnail = latestPost?.thumbnail?.trim() || 'assets/default-thumb.jpg';

      const card = document.createElement('a');
      card.className = 'category-card';
      card.href = `html/d/${cat.name}.html`;
      card.innerHTML = `
        <img src="${thumbnail}" alt="${cat.title}" loading="lazy"
             onerror="this.onerror=null;this.src='assets/default-thumb.jpg';">
        <h3>${cat.title}</h3>
      `;
      return card;
    } catch (error) {
      console.error(`Gagal load kategori: ${cat.name}`, error);
      return null;
    }
  });

  Promise.all(promises).then((cards) => {
    categoryGrid.innerHTML = '';
    cards.forEach((card) => {
      if (card) categoryGrid.appendChild(card);
    });
  });
}

window.loadCategoriesForIndex = loadCategoriesForIndex;