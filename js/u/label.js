async function loadCategoryLabels() {
  const container = document.getElementById('category-labels');
  if (!container) {
    console.warn('Elemen #category-labels tidak ditemukan.');
    return;
  }
  container.innerHTML = ''; // kosongkan dulu

  // URL sheet kategori yang berisi kolom name, title, sheetId, sheet, url
  const categorySheetUrl = 'https://opensheet.elk.sh/1ES0oKihVPw3LVwnFtlquFNltyIFvEImL-4gy-5fw2bA/label';

  try {
    const res = await fetch(categorySheetUrl);
    if (!res.ok) throw new Error(`Fetch kategori gagal: ${res.status}`);
    const categories = await res.json();

    // Ambil tiap kategori, fetch postingan terbaru dari sheet-nya masing-masing
    const fetches = categories.map(async cat => {
      try {
        const postRes = await fetch(`https://opensheet.elk.sh/${cat.sheetId}/${cat.sheet}`);
        if (!postRes.ok) throw new Error(`Fetch sheet ${cat.sheet} gagal: ${postRes.status}`);
        const posts = await postRes.json();

        // Cari post terbaru berdasarkan timestamp
        let latestPost = null;
        if (Array.isArray(posts) && posts.length) {
          latestPost = posts.reduce((prev, curr) => {
            const prevTime = Date.parse(prev.timestamp) || 0;
            const currTime = Date.parse(curr.timestamp) || 0;
            return currTime > prevTime ? curr : prev;
          }, posts[0]);
        }

        return {
          category: cat,
          latestPost,
        };
      } catch (e) {
        console.error(e);
        return {
          category: cat,
          latestPost: null,
        };
      }
    });

    const results = await Promise.all(fetches);

    results.forEach(({ category, latestPost }) => {
      const thumb = latestPost?.thumbnail || '/assets/error.jpg';

      const card = document.createElement('a');
      card.href = category.url;
      card.className = 'category-card';
      card.style.backgroundImage = `url('${thumb}')`;

      card.innerHTML = `
        <div class="category-content">
          <h3>${category.title}</h3>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error('Gagal memuat kategori:', err);
    container.innerHTML = '<p style="color:red;">Gagal memuat kategori.</p>';
  }
}

window.loadCategoryLabels = loadCategoryLabels;