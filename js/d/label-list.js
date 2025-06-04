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
    const { name, title } = cat;

    try {
      const res = await fetch(`https://opensheet.elk.sh/1ES0oKihVPw3LVwnFtlquFNltyIFvEImL-4gy-5fw2bA/label`);
      if (!res.ok) throw new Error(`Gagal fetch data kategori: ${name}`);

      const posts = await res.json();

      // Filter berdasarkan label kategori
      const filteredPosts = posts.filter(post => post.label?.toLowerCase() === name);
      const latestPost = filteredPosts[0] || null;

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
  const cards = await Promise.all(promises);
console.log('Cards dibuat:', cards);
categoryGrid.innerHTML = '';
cards.forEach((card) => {
  if (card) {
    console.log('Tambah card:', card);
    categoryGrid.appendChild(card);
  }
});


  Promise.all(promises).then((cards) => {
    categoryGrid.innerHTML = '';
    cards.forEach((card) => {
      if (card) categoryGrid.appendChild(card);
    });
  });
}
