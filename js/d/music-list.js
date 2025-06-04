function loadPostsMusik() {
    console.log('🔍 loadPostsMusik dipanggil');

    const container = document.getElementById('post-list-musik');
    if (!container) {
        console.warn('Elemen #post-list-musik tidak ditemukan.');
        return;
    }

    container.innerHTML = '<p>Loading posts...</p>';

    fetch('https://opensheet.elk.sh/10fSdWnRM2rYLYfJufWl-IkBeul2CgZSoUmOaeneO8xk/musik')
        .then(res => {
            if (!res.ok) throw new Error('Gagal fetch Data: ' + res.status + ' ' + res.statusText);
            return res.json();
        })
        .then(data => {
            console.log('🎶 Data musik:', data);

            if (!data || !data.length) {
                container.innerHTML = '<p>Belum ada postingan.</p>';
                return;
            }

            container.innerHTML = '';
            container.classList.add('card-grid');

            data.forEach(post => {
                const postEl = document.createElement('div');
                postEl.className = 'post-card';

                postEl.innerHTML = `
                    <a href="${post.url || '#'}" target="_blank" rel="noopener noreferrer">
                        <img src="${post.thumbnail}" alt="${post.title}" loading="lazy"
                             onerror="this.onerror=null;this.src='/assets/error.jpg';">
                        <h3>${post.title}</h3>
                        <p class="post-description">${post.description}</p>
                    </a>
                    <div class="post-meta">
                        <div class="post-time" data-timestamp="${post.timestamp || ''}"></div>
                    </div>
                `;

                container.appendChild(postEl);
            });

            // Panggil updateTimes setelah elemen sudah dimasukkan ke DOM
            if (typeof updateTimes === 'function') {
                updateTimes();
            } else {
                console.warn('Fungsi updateTimes() tidak ditemukan.');
            }
        })
        .catch(error => {
            console.error('Error saat memuat post musik:', error);
            container.innerHTML = '<p style="color:red;">Gagal memuat postingan musik.</p>';
        });
}

window.loadPostsMusik = loadPostsMusik;