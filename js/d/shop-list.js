// Pastikan kode timeSince dan updateTimes Anda sudah dimuat

// --- Fungsi baru untuk membuat elemen produk toko ---
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

// Fungsi loadPostsShop() dan fungsi timeSince/updateTimes lainnya tetap sama
// seperti yang sudah saya berikan sebelumnya.
// Hanya fungsi createShopPostElement() di atas yang mengalami perubahan.
