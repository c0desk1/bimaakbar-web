function initScrollProgressBar(progressBarId) {
  var progressBar = document.getElementById(progressBarId || "scrollProgress");
  if (!progressBar) return;

  function updateProgressBar() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  }

  window.addEventListener("scroll", updateProgressBar);
  window.addEventListener("resize", updateProgressBar);
  updateProgressBar();
}
document.addEventListener('DOMContentLoaded', async function() {
    await includeHTML();

    console.log('Semua komponen HTML sudah dimuat');

    if (typeof updatePageTitle === 'function') updatePageTitle();
    if (typeof updatePostTitle === 'function') updatePostTitle();
    if (typeof initHeaderEvents === 'function') initHeaderEvents();
    if (typeof initHeaderLogo === 'function') initHeaderLogo();
    if (typeof renderAffiliateItems === 'function') renderAffiliateItems();
    if (typeof loadLatestPopularPost === 'function') loadLatestPopularPost();
    if (typeof updateStats === 'function') updateStats();
    if (typeof updateTimes === 'function') updateTimes();

    const path = window.location.pathname.toLowerCase();
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
            console.log(`ðŸ—¿Memuat konten: ${page.keyword}`);
            page.func();
        }
    }

    var articles = [
        { title: 'ambient', description: 'Belajar dasar JS', url: '/js' },
        { title: 'CSS Grid Guide', description: 'Membuat layout grid', url: '/css-grid' },
        { title: 'Cara SEO Blog', description: 'Optimasi blog agar ranking', url: '/seo-blog' },
    ];

    SearchModule.init({ data: articles });
    initScrollProgressBar();
    
    console.log('ðŸ—¿Halaman siap!');
});
