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
    // MODIFIKASI: Atur ukuran dan object-fit
    img.style.width = "100%";
    img.style.height = "180px";
    img.style.objectFit = "cover";
    img.style.display = "block";
    img.style.borderRadius = "8px";

    thumbnailDiv.appendChild(img);
    link.appendChild(thumbnailDiv);

    // ...lanjutkan konten seperti sebelumnya...

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
