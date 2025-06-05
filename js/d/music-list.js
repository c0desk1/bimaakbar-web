function createmusikPostElement(post) {
    const el = document.createElement('div');
    el.className = 'post-grid';

    const link = document.createElement('a');
    link.href = post.url || '#';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'post-card';

    // === Thumbnail ===
    const thumbnailDiv = document.createElement('div');
    thumbnailDiv.className = 'post-thumbnail';

    const img = document.createElement('img');
    img.src = post.thumbnail || '/assets/error.jpg';
    img.alt = post.title || '';
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
    title.textContent = post.title || 'Tanpa Judul';

    const desc = document.createElement('p');
    desc.className = 'post-description';
    desc.textContent = post.description || '';

    // === Hashtags ===
    const hashtagsDiv = document.createElement('div');
    hashtagsDiv.className = 'post-hashtags';
    const hashtags = (post.hashtags || '')
        .split(',')
        .map(tag => tag.trim())
        .filter((tag, index, self) => tag && self.indexOf(tag) === index)
        .map(tag => `#${tag}`)
        .join(' ');

    hashtagsDiv.textContent = hashtags;

    contentDiv.appendChild(hashtagsDiv);
    contentDiv.appendChild(title);
    contentDiv.appendChild(desc);
    link.appendChild(contentDiv);

    // === Meta Info ===
    const rightDiv = document.createElement('div');
    rightDiv.className = 'post-meta';

    const label = document.createElement('div');
    label.className = 'post-label';
    label.textContent = post.label || '';

    const time = document.createElement('div');
    time.className = 'post-time';
    time.setAttribute('data-timestamp', post.timestamp);
    time.innerHTML = `<i class="fa fa-clock-o"></i> ${timeSince(post.timestamp)}`;

    rightDiv.appendChild(label);
    rightDiv.appendChild(time);
    link.appendChild(rightDiv);

    el.appendChild(link);
    return el;
}

function loadPostsMusik() {
    console.log('Fungsi loadPostsMusik() dipanggil.');

    const container = document.getElementById('post-list-musik');
    if (!container) {
        console.warn('Elemen #post-list-musik tidak ditemukan. Pastikan ada div dengan id="post-list-musik" di HTML Anda.');
        return;
    }

    container.innerHTML = '<div class="loading-spinner"></div>';

    fetch('https://opensheet.elk.sh/10fSdWnRM2rYLYfJufWl-IkBeul2CgZSoUmOaeneO8xk/musik')
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(`Gagal fetch data: ${res.status} ${res.statusText} - ${text}`); });
            }
            return res.json();
        })
        .then(data => {
            container.innerHTML = '';

            if (!data || !data.length) {
                container.innerHTML = '<p>Belum ada postingan musik.</p>';
                return;
            }

            // --- Bagian PENTING: Urutkan data berdasarkan timestamp (terbaru ke terlama) ---
            data.sort((a, b) => {
                const timeA = new Date(a.timestamp).getTime();
                const timeB = new Date(b.timestamp).getTime();
                return timeB - timeA; // Urutkan menurun (terbaru di atas)
            });
            // -----------------------------------------------------------------------------

            if (!container.classList.contains('card-grid')) {
                container.classList.add('card-grid');
            }

            data.forEach(post => {
                const postEl = createmusikPostElement(post);
                container.appendChild(postEl);
            });

            updateTimes();
        })
        .catch(error => {
            console.error('❌ Error saat memuat post musik:', error);
            container.innerHTML = '<p style="color:red; text-align: center;">Gagal memuat postingan musik. Silakan coba lagi nanti.</p>';
        });
}

window.loadPostsMusik = loadPostsMusik;