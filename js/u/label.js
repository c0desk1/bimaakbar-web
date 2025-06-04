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

  fetch(`https://opensheet.elk.sh/1ES0oKihVPw3LVwnFtlquFNltyIFvEImL-4gy-5fw2bA/label`)
    .then(res => res.json())
    .then(json => {
      categoryGrid.innerHTML = ''; // kosongkan dulu

      categories.forEach(cat => {
        const filtered = json.filter(item => item.label === cat.name);
        const latestPost = filtered[0];

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
        categoryGrid.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Gagal load kategori dari sheet:", err);
      categoryGrid.innerHTML = '<p style="color:red;">Gagal memuat kategori.</p>';
    });
}

window.loadCategoriesForIndex = loadCategoriesForIndex;