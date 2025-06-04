function loadPostsShop() {
  const container = document.getElementById('post-list-shop');
  if (!container) return;

  container.innerHTML = '<p>Loading produk toko...</p>';

  fetch('https://opensheet.elk.sh/1B2qNWH-cyDuVYJ2m1mLITKJvU7bPmYQYVt1g4Sxh19A/shop')
    .then(res => {
      if (!res.ok) throw new Error('Gagal fetch shop: ' + res.status);
      return res.json();
    })
    .then(data => {
      if (!data || !data.length) {
        container.innerHTML = '<p>Belum ada produk di toko.</p>';
        return;
      }

      const filtered = data.filter(item => (item.label || '').toLowerCase() === 'shop');
      if (!filtered.length) {
        container.innerHTML = '<p>Tidak ada produk dengan label "shop".</p>';
        return;
      }

      container.innerHTML = '';
      container.classList.add('card-grid');

      filtered.forEach(product => {
        const hashtags = (product.hashtags || '').split(',').map(tag => tag.trim()).filter(Boolean);
        const hashtagsHTML = hashtags.map(tag => `<span class="post-hashtag">#${tag}</span>`).join(' ');

        const productEl = document.createElement('div');
        productEl.className = 'post-card';

        const img = document.createElement('img');
        img.src = product.thumbnail;
        img.alt = product.title;
        img.loading = 'lazy';
        img.onerror = function () {
          this.onerror = null;
          this.src = '/assets/logo.png';
        };

        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';

        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'thumbnail-wrapper';
        imgWrapper.appendChild(spinner);
        imgWrapper.appendChild(img);

        // Hapus spinner setelah gambar selesai dimuat
        img.onload = function () {
          spinner.remove();
        };

        productEl.innerHTML = `
          <a href="${product.url}" target="_blank" rel="noopener noreferrer"></a>
          <h3>${product.title}</h3>
          <p class="post-description">${product.description}</p>
          <p class="product-price">Harga: ${product.price}</p>
          <div class="post-meta">
            <div class="post-hashtags">${hashtagsHTML}</div>
            <div class="post-time" data-timestamp="${product.timestamp || ''}"></div>
          </div>
        `;

        const link = productEl.querySelector('a');
        link.prepend(imgWrapper); // Masukkan gambar di atas h3

        container.appendChild(productEl);

        // Animasi hashtag
        productEl.querySelectorAll('.post-hashtag').forEach(tag => {
          requestAnimationFrame(() => tag.classList.add('show'));
        });
      });
    })
    .catch(err => {
      console.error('Gagal memuat produk toko:', err);
      container.innerHTML = '<p style="color:red;">Gagal memuat data toko.</p>';
    });
}

window.loadPostsShop = loadPostsShop;