function createShopPostElement(product) {
    const el = document.createElement('div');
    el.className = 'post-grid';

    const link = document.createElement('a');
    link.href = product.url || '#';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'post-card';

    // === Thumbnail ===
    const thumbnailDiv = document.createElement('div');
    thumbnailDiv.className = 'post-thumbnail';

    const img = document.createElement('img');
    img.src = product.thumbnail || '/assets/error.jpg';
    img.alt = product.title || '';
    img.loading = 'lazy';
    img.onerror = () => (img.src = '/assets/error.jpg');
    img.style.width = "100%";
    img.style.height = "180px";
    img.style.objectFit = "cover";
    img.style.display = "block";
    img.style.borderRadius = "8px";

    thumbnailDiv.appendChild(img);
    link.appendChild(thumbnailDiv);

    // === Konten Utama ===
    const contentDiv = document.createElement('div');
    contentDiv.className = 'post-content';
    contentDiv.style.flex = '1';

    const title = document.createElement('h3');
    title.className = 'post-title';
    title.textContent = product.title || 'Tanpa Judul';

    const desc = document.createElement('p');
    desc.className = 'post-description';
    desc.textContent = product.description || '';

    const price = document.createElement('p');
    price.className = 'post-price';
    price.textContent = `Harga: ${product.price || 'N/A'}`;

    // === Hashtags ===
    const hashtagsDiv = document.createElement('div');
    hashtagsDiv.className = 'post-hashtags';

    // FIX: Langsung proses string hashtags yang dipisahkan koma
    const hashtagsString = product.hashtags || ''; // Dapatkan string hashtags
    const tags = hashtagsString
        .split(',') // Pisahkan berdasarkan koma
        .map(tag => tag.trim()) // Hapus spasi di awal/akhir setiap tag
        .filter(tag => tag); // Hapus tag yang kosong setelah trim

    tags.forEach(tagText => {
        const span = document.createElement('span');
        span.className = 'post-hashtag';
        span.textContent = `#${tagText}`;
        hashtagsDiv.appendChild(span);
        // Jika Anda punya animasi hashtag, bisa di sini:
        // requestAnimationFrame(() => {
        //     span.classList.add('show');
        // });
    });


    contentDiv.appendChild(hashtagsDiv);
    contentDiv.appendChild(title);
    contentDiv.appendChild(desc);
    contentDiv.appendChild(price);
    link.appendChild(contentDiv);

    // === Meta Info ===
    const rightDiv = document.createElement('div');
    rightDiv.className = 'post-meta';

    const label = document.createElement('div');
    label.className = 'post-label';
    if (product.label && product.label.toLowerCase() === 'shop') {
        label.textContent = product.label;
    } else {
        label.style.display = 'none';
    }


    const time = document.createElement('div');
    time.className = 'post-time';
    time.setAttribute('data-timestamp', product.timestamp || '');
    time.innerHTML = `<i class="fa fa-clock-o"></i> ${timeSince(product.timestamp)}`;

    rightDiv.appendChild(label);
    rightDiv.appendChild(time);
    link.appendChild(rightDiv);

    el.appendChild(link);
    return el;
}

// --- Fungsi loadPostsShop yang telah direstrukturisasi ---
function loadPostsShop() {
    console.log('Fungsi loadPostsShop() dipanggil.');

    const container = document.getElementById('post-list-shop');
    if (!container) {
        console.warn('Elemen #post-list-shop tidak ditemukan. Pastikan ada div dengan id="post-list-shop" di HTML Anda.');
        return;
    }

    container.innerHTML = '<div class="loading-spinner"></div>'; // Tampilkan spinner loading

    fetch('https://opensheet.elk.sh/1B2qNWH-cyDuVYJ2m1mLITKJvU7bPmYQYVt1g4Sxh19A/shop')
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(`Gagal fetch data: ${res.status} ${res.statusText} - ${text}`); });
            }
            return res.json();
        })
        .then(data => {
            container.innerHTML = ''; // Hapus spinner loading setelah data diterima

            if (!data || !data.length) {
                container.innerHTML = '<p>Belum ada produk di toko.</p>';
                return;
            }

            // Filter berdasarkan label "shop" (jika data dari opensheet sudah difilter di sisi sheet, ini bisa dihilangkan)
            const filtered = data.filter(item => (item.label || '').toLowerCase() === 'shop');
            if (!filtered.length) {
                container.innerHTML = '<p>Tidak ada produk dengan label "shop".</p>';
                return;
            }

            // --- Urutkan data berdasarkan timestamp (terbaru ke terlama) ---
            filtered.sort((a, b) => {
                const timeA = new Date(a.timestamp).getTime();
                const timeB = new Date(b.timestamp).getTime();
                // Tangani kasus timestamp tidak valid/kosong: tempatkan di akhir
                if (isNaN(timeA) && isNaN(timeB)) return 0;
                if (isNaN(timeA)) return 1;
                if (isNaN(timeB)) return -1;
                return timeB - timeA; // Urutkan menurun (terbaru di atas)
            });
            // -----------------------------------------------------------------------------

            if (!container.classList.contains('card-grid')) {
                container.classList.add('card-grid');
            }

            filtered.forEach(product => {
                const productEl = createShopPostElement(product);
                container.appendChild(productEl);
            });

            // ✅ Panggil updateTimes setelah semua elemen dirender
            if (typeof updateTimes === 'function') {
                updateTimes();
            } else {
                console.warn('⚠️ Fungsi updateTimes() tidak ditemukan.');
            }
        })
        .catch(error => {
            console.error('❌ Error saat memuat produk toko:', error);
            container.innerHTML = '<p style="color:red; text-align: center;">Gagal memuat produk toko. Silakan coba lagi nanti.</p>';
        });
}

window.loadPostsShop = loadPostsShop;
