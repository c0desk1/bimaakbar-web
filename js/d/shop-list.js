function loadPostsShop() {
  console.log('🔍 loadPostsShop dipanggil');
  
  const container = document.getElementById('post-list-shop');
  if (!container) {
    console.warn('Elemen #post-list-shop tidak ditemukan.');
    return;
  }

  container.innerHTML = '<p>Loading produk toko...</p>';

  fetch('https://opensheet.elk.sh/1B2qNWH-cyDuVYJ2m1mLITKJvU7bPmYQYVt1g4Sxh19A/shop')
    .then(function(res) {
      if (!res.ok) throw new Error('Gagal fetch data: ' + res.status + ' ' + res.statusText);
      return res.json();
    })

    .then(function(data) {
      console.log('🛒 Data produk toko:', data);

      if (!data || !data.length) {
        container.innerHTML = '<p>Belum ada produk di toko.</p>';
        return;
      }

      // Filter hanya produk dengan label 'shop' (opsional, bisa dihilangkan)
      const filtered = data.filter(item => (item.label || '').toLowerCase() === 'shop');
      if (!filtered.length) {
        container.innerHTML = '<p>Tidak ada produk dengan label "shop".</p>';
        return;
      }

      container.innerHTML = '';
      if (!container.classList.contains('card-grid')) {
        container.classList.add('card-grid');
      }

      for (let i = 0; i < filtered.length; i++) {
        const product = filtered[i];

        const hashtags = Array.isArray(product.hashtags)
          ? product.hashtags
          : (product.hashtags || '').split(',').map(tag => tag.trim()).filter(Boolean);

        const hashtagsHTML = hashtags.map(tag => `<span class="post-hashtag">#${tag}</span>`).join(' ');
        const labelHTML = product.label ? `<span class="post-label">#${product.label}</span>` : '';

        const productEl = document.createElement('div');
        productEl.className = 'post-card';

        productEl.innerHTML =
          '<a href="' + (product.url || '#') + '" target="_blank" rel="noopener noreferrer">' +
            '<img src="' + product.thumbnail + '" alt="' + product.title + '" loading="lazy" ' +
              'onerror="this.onerror=null;this.src=\'/assets/logo.png\';">' +
            '<h3>' + product.title + '</h3>' +
            '<p class="post-description">' + product.description + '</p>' +
            '<p class="product-price">Harga: ' + product.price + '</p>' +
          '</a>' +
          '<div class="post-meta">' +
            '<div class="post-hashtags">' + labelHTML + ' ' + hashtagsHTML + '</div>' +
            '<div class="post-time" data-timestamp="' + (product.timestamp || '') + '"></div>' +
          '</div>';

        container.appendChild(productEl);

        // Animasi hashtag/label
        const tags = productEl.querySelectorAll('.post-hashtag, .post-label');
        for (let k = 0; k < tags.length; k++) {
          requestAnimationFrame(() => {
            tags[k].classList.add('show');
          });
        }
      }

      // Update waktu posting
      if (typeof updateTimes === 'function') {
        updateTimes();
      } else {
        console.warn('Fungsi updateTimes() tidak ditemukan.');
      }
    })

    .catch(function(error) {
      console.error('Error saat memuat produk toko:', error);
      container.innerHTML = '<p style="color:red;">Gagal memuat data toko.</p>';
    });
}

window.loadPostsShop = loadPostsShop;