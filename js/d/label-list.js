async function loadCategoriesForIndex() {
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

  try {
    // Fetch data label hanya 1x
    const res = await fetch('https://opensheet.elk.sh/1ES0oKihVPw3LVwnFtlquFNltyIFvEImL-4gy-5fw2bA/label');
    if (!res.ok) throw new Error('Gagal fetch data kategori');
    const posts = await res.json();

    categoryGrid.innerHTML = '';

    categories.forEach(({ name, title }) => {
      const filteredPosts = posts.filter(post => post.label?.toLowerCase() === name);
      const latestPost = filteredPosts[0] || null;
      const thumbnail = latestPost?.thumbnail?.trim() || 'assets/logo.png';

      const card = document.createElement('a');
      card.className = 'category-card';
      card.href = `html/d/${name}-list.html`;
      card.innerHTML = `
        <img src="${thumbnail}" alt="${title}" loading="lazy" onerror="this.onerror=null;this.src='assets/logo.png';">
        <h3>${title}</h3>
      `;

      categoryGrid.appendChild(card);
    });

  } catch (error) {
    console.error('Error loadCategoriesForIndex:', error);
    categoryGrid.innerHTML = '<p>Gagal memuat kategori.</p>';
  }
}
