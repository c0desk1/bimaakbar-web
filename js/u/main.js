document.addEventListener('DOMContentLoaded', async function() {
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

    // Pemetaan halaman ke fungsi (tanpa loadCategoriesForIndex)
    const pageMap = [
        { keyword: '/', func: typeof loadCategoryLabels === 'function' ? loadCategoryLabels : null },
        { keyword: 'musik', func: typeof loadPostsMusik === 'function' ? loadPostsMusik : null },
        { keyword: 'tutorial', func: typeof loadPostsTutorial === 'function' ? loadPostsTutorial : null },
        { keyword: 'tips', func: typeof loadPostsTips === 'function' ? loadPostsTips : null },
        { keyword: 'game', func: typeof loadPostsGame === 'function' ? loadPostsGame : null },
        { keyword: 'shop', func: typeof loadPostsShop === 'function' ? loadPostsShop : null }
    ];

    for (const page of pageMap) {
        const isHome = path === '/' || path.includes('index');
        const isMatched = page.keyword === '/' ? isHome : path.includes(page.keyword);
        if (isMatched && typeof page.func === 'function') {
            console.log(`🔎 Memuat konten: ${page.keyword}`);
            page.func(); // <- Ini harus terpanggil
        }
    }

    console.log('âœ… Halaman siap!');
});
