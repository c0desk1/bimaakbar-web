function createGamePostElement(post) {
    const el = document.createElement('div');
    el.className = 'post-grid';

    const link = document.createElement('a');
    link.href = post.url || '#';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'post-card-category';

    // === Thumbnail ===
    const thumbnailDiv = document.createElement('div');
    thumbnailDiv.className = 'post-thumbnail-category';

    const img = document.createElement('img');
    img.src = post.thumbnail || '/assets/error.jpg';
    img.alt = post.title || '';
    img.loading = 'lazy';
    img.onerror = () => (img.src = '/assets/error.jpg');

    thumbnailDiv.appendChild(img);
    link.appendChild(thumbnailDiv);

    // === Konten Utama ===
    const contentDiv = document.createElement('div');
    contentDiv.className = 'post-content-category';
    contentDiv.style.flex = '1';

    const title = document.createElement('h3');
    title.className = 'post-title-category';
    title.textContent = post.title || 'Tanpa Judul';

    const desc = document.createElement('p');
    desc.className = 'post-description-category';
    desc.textContent = post.description || '';

    // === Hashtags ===
    const hashtagsDiv = document.createElement('div');
    hashtagsDiv.className = 'post-hashtags-category';
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
    rightDiv.className = 'post-meta-category';

    const label = document.createElement('div');
    label.className = 'post-label-category';
    label.textContent = post.label || '';

    const time = document.createElement('div');
    time.className = 'post-time-category';
    time.setAttribute('data-timestamp', post.timestamp);
    time.innerHTML = `<i class="fa fa-clock-o"></i> ${timeSince(post.timestamp)}`;

    rightDiv.appendChild(label);
    rightDiv.appendChild(time);
    link.appendChild(rightDiv);

    el.appendChild(link);
    return el;
}

function loadPostsGame() {
    console.log('Fungsi loadPostsGame() dipanggil.');

    const container = document.getElementById('post-list-game');
    if (!container) {
        console.warn('Elemen #post-list-game tidak ditemukan. Pastikan ada div dengan id="post-list-game" di HTML Anda.');
        return;
    }

    container.innerHTML = '<div class="loading-spinner"></div>';

    fetch('https://opensheet.elk.sh/1_vWvMJK-mzsM38aPk6fXoPM_tjG9d3ibHtUhiJf_KW0/game')
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(`Gagal fetch data: ${res.status} ${res.statusText} - ${text}`); });
            }
            return res.json();
        })
        .then(data => {
            container.innerHTML = '';

            if (!data || !data.length) {
                container.innerHTML = '<p>Belum ada postingan game.</p>';
                return;
            }

            // Urutkan data berdasarkan timestamp
            data.sort((a, b) => {
                const timeA = new Date(a.timestamp).getTime();
                const timeB = new Date(b.timestamp).getTime();
                return timeB - timeA;
            });

            if (!container.classList.contains('card-grid')) {
                container.classList.add('card-grid');
            }

            data.forEach(post => {
                const postEl = createGamePostElement(post);
                container.appendChild(postEl);
            });

            updateTimes();
        })
        .catch(error => {
            console.error('❌ Error saat memuat post game:', error);
            container.innerHTML = '<p style="color:red; text-align: center;">Gagal memuat postingan game. Silakan coba lagi nanti.</p>';
        });
}
window.loadPostsGame = loadPostsGame;
