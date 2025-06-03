document.addEventListener('DOMContentLoaded', async function () {
  await includeHTML();

  console.log('Semua komponen HTML sudah dimuat');

  // Fungsi global
  if (typeof updatePageTitle === 'function') updatePageTitle();
  if (typeof updatePostTitle === 'function') updatePostTitle();
  if (typeof initHeaderEvents === 'function') initHeaderEvents();
  if (typeof initHeaderLogo === 'function') initHeaderLogo();
  if (typeof renderAffiliateItems === 'function') renderAffiliateItems();
  if (typeof loadLatestPosts === 'function') loadLatestPosts();
  if (typeof loadPopularPosts === 'function') loadPopularPosts();
  if (typeof updateStats === 'function') updateStats();

  // Event listener untuk search (jika ada)
  const input = document.querySelector('.search-input-group input[type="text"]');
  if (input && typeof handleSearchInput === 'function') {
    input.addEventListener('input', handleSearchInput);
  }

  // Deteksi halaman dari URL
  const path = window.location.pathname.toLowerCase();

  // Pemetaan halaman ke fungsi
  const pageMap = [
    { keyword: 'index', func: loadCategoriesForIndex },
    { keyword: 'musik', func: loadPostsMusik },
    { keyword: 'tutorial', func: loadPostsTutorial },
    { keyword: 'tips', func: loadPostsTips },
    { keyword: 'trik', func: loadPostsTips },
    { keyword: 'game', func: loadPostsGame },
    { keyword: 'shop', func: loadPostsShop }
  ];

  // Jalankan fungsi berdasarkan keyword path
  for (const page of pageMap) {
  // Tambahkan pengecekan jika home ('/') dan keyword 'index'
  if ((path === '/' && page.keyword === 'index') || path.includes(page.keyword)) {
    console.log(`ðŸ”„ Memuat konten: ${page.keyword}`);
    page.func();
  }
}

  console.log('âœ… Halaman siap!');
});