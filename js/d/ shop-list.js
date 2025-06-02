function loadPostsShop() {
  var container = document.getElementById('post-list-shop');
  if (!container) return;

  container.innerHTML = '<p>Loading produk toko...</p>';
  fetch('https://opensheet.elk.sh/1B2qNWH-cyDuVYJ2m1mLITKJvU7bPmYQYVt1g4Sxh19A/shop-list')
    .then(function(res) {
      if (!res.ok) throw new Error('Gagal fetch shop');
      return res.json();
    })
    .then(function(data) {
      if (!data.products || !data.products.length) {
        container.innerHTML = '<p>Belum ada produk di toko.</p>';
        return;
      }

      // Filter berdasarkan label 'shop' (atau sesuai kebutuhan)
      const filteredProducts = data.products.filter(product => product.label && product.label.toLowerCase() === 'shop');

      if (!filteredProducts.length) {
        container.innerHTML = '<p>Tidak ada produk dengan label "shop".</p>';
        return;
      }

      container.innerHTML = '';
      container.className += ' card-grid';

      filteredProducts.forEach(product => {
        var hashtags = Array.isArray(product.hashtags) ? product.hashtags : [];
        var hashtagsHTML = hashtags.map(tag => `<span class="post-hashtag">#${tag}</span>`).join(' ');

        var productEl = document.createElement('div');
        productEl.className = 'post-card';
        productEl.innerHTML =
          `<a href="${product.link}" target="_blank" rel="noopener noreferrer">
            <img src="${product.thumbnail}" alt="${product.title}" loading="lazy" onerror="this.onerror=null;this.src='/assets/default-thumb.jpg';">
            <h3>${product.title}</h3>
            <p class="post-description">${product.description}</p>
            <p class="product-price">Harga: ${product.price}</p>
          </a>
          <div class="post-meta">
            <div class="post-hashtags">${hashtagsHTML}</div>
            <div class="post-time" data-timestamp="${product.timestamp || ''}"></div>
          </div>`;

        container.appendChild(productEl);

        // Animasi show untuk hashtags
        var tags = productEl.querySelectorAll('.post-hashtag');
        tags.forEach(tag => {
          requestAnimationFrame(() => tag.classList.add('show'));
        });
      });
    })
    .catch(function(err) {
      console.error('Gagal memuat produk toko:', err);
      container.innerHTML = '<p style="color:red;">Gagal memuat data toko.</p>';
    });
}

// Ekspor ke global
window.loadPostsShop = loadPostsShop;