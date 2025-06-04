const categories = [
  { name: "musik", title: "Musik" },
  { name: "tutorial", title: "Tutorial" },
  { name: "tips", title: "Tips & Trik" },
  { name: "game", title: "Game" },
  { name: "shop", title: "Shop" }
];

function loadCategoriesForIndex() {
  const categoryGrid = document.querySelector('.category-grid');
  if (!categoryGrid) return;

  categoryGrid.innerHTML = `<div class="loading-spinner">Loading...</div>`;

  Promise.all(categories.map(async (cat) => {
    try {
      const res = await fetch(`https://opensheet.elk.sh/1ES0oKihVPw3LVwnFtlquFNltyIFvEImL-4gy-5fw2bA/label`);
      if (!res.ok) throw new Error(`Gagal fetch data kategori ${cat.name}`);
      const json = await res.json();
      const latestPost = json.posts?.[0];

      const card = document.createElement('a');
      card.className = 'category-card';
      card.href = `html/d/${cat.name}-list.html`;
      card.innerHTML = `
        <img src="${latestPost?.thumbnail || 'assets/error.jpg'}" 
             alt="${latestPost?.title || cat.title}" 
             loading="lazy" 
             onerror="this.onerror=null;this.src='assets/error.jpg';">
        <h3>${cat.title}</h3>
      `;
      return card;
    } catch (err) {
      console.error(`Gagal load kategori: ${cat.name}-list`, err);
      return null;
    }
  })).then(cards => {
    categoryGrid.innerHTML = '';
    cards.filter(Boolean).forEach(card => categoryGrid.appendChild(card));
  });
}

// Simpan ke window agar bisa dipanggil dari file lain
window.loadCategoriesForIndex = loadCategoriesForIndex;