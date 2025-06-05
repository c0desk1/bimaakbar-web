// time.js (Pastikan file ini atau kode ini dimuat sebelum kode di bawah)

function timeSince(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now - past) / 1000);

    if (isNaN(seconds)) return ''; // Tanggal tidak valid
    if (seconds < 60) return 'Baru saja';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' menit lalu';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' jam lalu';
    if (seconds < 604800) return Math.floor(seconds / 86400) + ' hari lalu';

    return past.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

function updateTimes(scope = document) {
    const timeElements = scope.querySelectorAll('.post-time');
    timeElements.forEach(el => {
        // Ambil timestamp dari atribut data-timestamp
        const ts = el.getAttribute('data-timestamp');
        if (ts) {
            el.innerHTML = `<i class="fa fa-clock-o"></i> ${timeSince(ts)}`;
        }
    });
}

// Buat global (penting agar fungsi ini bisa diakses dari mana saja)
window.timeSince = timeSince;
window.updateTimes = updateTimes;

// --- Kode utama Anda ---

function createGamePostElement(post) {
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
    // Simpan timestamp asli di atribut data-timestamp
    time.setAttribute('data-timestamp', post.timestamp);
    // Tampilkan waktu awal menggunakan timeSince
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

    container.innerHTML = '<div class="loading-spinner"></div>'; // Tampilkan spinner loading

    fetch('https://opensheet.elk.sh/1_vWvMJK-mzsM38aPk6fXoPM_tjG9d3ibHtUhiJf_KW0/game')
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(`Gagal fetch data: ${res.status} ${res.statusText} - ${text}`); });
            }
            return res.json();
        })
        .then(data => {
            container.innerHTML = ''; // Hapus spinner loading setelah data diterima

            if (!data || !data.length) {
                container.innerHTML = '<p>Belum ada postingan game.</p>';
                return;
            }

            if (!container.classList.contains('card-grid')) {
                container.classList.add('card-grid');
            }

            data.forEach(post => {
                const postEl = createGamePostElement(post);
                container.appendChild(postEl);
            });

            // Panggil updateTimes setelah semua postingan dimuat
            // Ini akan memperbarui tampilan waktu ke format "X menit lalu", dll.
            updateTimes();
        })
        .catch(error => {
            console.error('❌ Error saat memuat post game:', error);
            container.innerHTML = '<p style="color:red; text-align: center;">Gagal memuat postingan game. Silakan coba lagi nanti.</p>';
        });
}

// Pastikan fungsi ini tersedia secara global jika Anda memanggilnya dari HTML
window.loadPostsGame = loadPostsGame;

// Panggil loadPostsGame ketika DOM sudah sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadPostsGame();
    // Anda bisa memanggil updateTimes secara berkala jika ingin tampilan "X menit lalu" terus diperbarui
    // setInterval(updateTimes, 60 * 1000); // Perbarui setiap menit
});
