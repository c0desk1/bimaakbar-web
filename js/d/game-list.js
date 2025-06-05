function createGamePostElement(post) {
    const el = document.createElement('div');
    el.className = 'post-link';

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
    time.textContent = post.timestamp || 'Baru saja';

    rightDiv.appendChild(label);
    rightDiv.appendChild(time);
    link.appendChild(rightDiv);

    el.appendChild(link);
    return el;
}

function loadPostsGame() {
    console.log('Element dipanggil');

    const container = document.getElementById('post-list-game');
    if (!container) {
        console.warn('Elemen #post-list-game tidak ditemukan.');
        return;
    }

    container.innerHTML = '<div class="loading-spinner"></div>';

    fetch('https://opensheet.elk.sh/1_vWvMJK-mzsM38aPk6fXoPM_tjG9d3ibHtUhiJf_KW0/game')
        .then(res => res.ok ? res.json() : Promise.reject('Gagal fetch data'))
        .then(data => {
            container.innerHTML = '';

            if (!data || !data.length) {
                container.innerHTML = '<p>Belum ada postingan.</p>';
                return;
            }

            if (!container.classList.contains('card-grid')) {
                container.classList.add('card-grid');
            }

            data.forEach(post => {
                const postEl = createGamePostElement(post);
                container.appendChild(postEl);
            });

            if (typeof updateTimes === 'function') {
                updateTimes();
            } else {
                console.warn('Fungsi updateTimes() tidak ditemukan.');
            }
        })
        .catch(error => {
            console.error('❌ Error saat memuat post game:', error);
            container.innerHTML = '<p style="color:red;">Gagal memuat postingan game.</p>';
        });
}

window.loadPostsGame = loadPostsGame;
