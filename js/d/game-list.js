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
