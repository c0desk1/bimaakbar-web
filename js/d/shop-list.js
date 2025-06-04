function loadPostsShop() {
  const container = document.getElementById('post-list-shop');
  if (!container) {
    console.warn('Elemen #post-list-shop tidak ditemukan');
    return;
  }

  container.innerHTML = '<p>Loading produk toko...</p>';

  fetch('https://opensheet.elk.sh/1B2qNWH-cyDuVYJ2m1mLITKJvU7bPmYQYVt1g4Sxh19A/shop')
    .then(res => {
      if (!res.ok) throw new Error('Gagal fetch shop: ' + res.status);
      return res.json();
    })
    .then(data => {
      console.log('Data fetch shop:', data);
      if (!data || !data.length) {
        container.innerHTML = '<p>Belum ada produk di toko.</p>';
        return;
      }

      const filtered = data.filter(item => (item.label || '').toLowerCase() === 'shop');
      console.log('Filtered shop data:', filtered);
      if (!filtered.length) {
        container.innerHTML = '<p>Tidak ada produk dengan label "shop".</p>';
        return;
      }

      container.innerHTML = '';
      container.classList.add('card-grid');

      filtered.forEach(product => {
        console.log('Render product:', product);
        // lanjut seperti kode kamu
        const hashtags = (product.hashtags || '').split(',').map(tag => tag.trim()).filter(Boolean);
        const hashtagsHTML = hashtags.map(tag => `<span class="post-hashtag">#${tag}</span>`).join(' ');

        const productEl = document.createElement('div');
        productEl.className = 'post-card';

        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';

        const img = document.createElement('img');
        img.src = product.thumbnail;
        img.alt = product.title;
        img.loading = 'lazy';
        img.onerror = function () {
          this.onerror = null;
          this.src = '/assets/logo.png';
        };
        img.onload = function () {
          spinner.remove();
        };

        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'thumbnail-wrapper';
        imgWrapper.appendChild(spinner);
        imgWrapper.appendChild(img);

        const link = document.createElement('a');
        link.href = product.url || '#';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.appendChild(imgWrapper);

        const title = document.createElement('h3');
        title.textContent = product.title;

        const desc = document.createElement('p');
        desc.className = 'post-description';
        desc.textContent = product.description;

        const price = document.createElement('p');
        price.className = 'product-price';
        price.textContent = `Harga: ${product.price}`;

        const meta = document.createElement('div');
        meta.className = 'post-meta';

        const tags = document.createElement('div');
        tags.className = 'post-hashtags';
        tags.innerHTML = hashtagsHTML;

        const time = document.createElement('div');
        time.className = 'post-time';
        time.setAttribute('data-timestamp', product.timestamp || '');

        meta.appendChild(tags);
        meta.appendChild(time);

        productEl.appendChild(link);
        productEl.appendChild(title);
        productEl.appendChild(desc);
        productEl.appendChild(price);
        productEl.appendChild(meta);

        container.appendChild(productEl);

        productEl.querySelectorAll('.post-hashtag').forEach(tag => {
          requestAnimationFrame(() => tag.classList.add('show'));
        });
      });

      if (typeof updateTimes === 'function') {
        updateTimes();
      } else {
        console.warn('updateTimes() tidak ditemukan');
      }
    })
    .catch(err => {
      console.error('Gagal memuat produk toko:', err);
      container.innerHTML = '<p style="color:red;">Gagal memuat data toko.</p>';
    });
}
window.loadPostsShop = loadPostsShop;