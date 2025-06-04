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
  if (typeof loadCategoryLabels === 'function') loadCategoryLabels();

  // Event listener untuk search (jika ada)
  const input = document.querySelector('.search-input-group input[type="text"]');
  if (input && typeof handleSearchInput === 'function') {
    input.addEventListener('input', handleSearchInput);
  }

  // Deteksi halaman dari URL
  const path = window.location.pathname.toLowerCase();

  // Pemetaan halaman ke fungsi (tanpa loadCategoriesForIndex)
  const pageMap = [
    { keyword: 'musik', func: loadPostsMusik },
    { keyword: 'tutorial', func: loadPostsTutorial },
    { keyword: 'tips', func: loadPostsTips },
    { keyword: 'game', func: loadPostsGame },
    { keyword: 'shop', func: loadPostsShop }
  ];

  for (const page of pageMap) {
    const isMatched = path.includes(page.keyword);
    if (isMatched && typeof page.func === 'function') {
      console.log(`🎯 Memuat konten: ${page.keyword}`);
      page.func();
    }
  }

  console.log('✅ Halaman siap!');
});