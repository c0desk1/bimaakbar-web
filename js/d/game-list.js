function createGamePostElement(post) {
    var link = document.createElement('a');
        link.href = post.url || post.link || '#';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'post-card';

        // Thumbnail
        var img = document.createElement('img');
        img.src = post.thumbnail || '/assets/error.jpg';
        img.alt = post.title || '';
        img.loading = 'lazy';
        img.onerror = function() {
            img.src = '/assets/error.jpg';
        };
        link.appendChild(img); // langsung di <a> agar tampil di atas

        // Konten utama
        var contentDiv = document.createElement('div');
        contentDiv.className = 'post-content';

        // Baris 1: Title (kiri) + Time (kanan)
        var titleRow = document.createElement('div');
        titleRow.className = 'post-title-row';

        var title = document.createElement('div');
        title.className = 'post-title';
        title.textContent = post.title || 'Tanpa Judul';
        titleRow.appendChild(title);

        var timeDiv = document.createElement('div');
        timeDiv.className = 'post-time';
        timeDiv.innerHTML = `<i class="fa fa-clock-o"></i> ${formatTime(post.timestamp)}`;
        titleRow.appendChild(timeDiv);

        contentDiv.appendChild(titleRow);

        // Baris 2: Deskripsi
        var desc = document.createElement('div');
        desc.className = 'post-description';
        desc.textContent = post.description || '';
        contentDiv.appendChild(desc);

        // Baris 3: Label (kiri) + Hashtag (kanan)
        var metaRow = document.createElement('div');
        metaRow.className = 'post-meta-row';

        var label = document.createElement('div');
        label.className = 'post-label';
        label.textContent = post.label || post.category || 'Tanpa Label';
        metaRow.appendChild(label);

        var hashtagsDiv = document.createElement('div');
        hashtagsDiv.className = 'post-hashtags';
        var hashtags = (post.hashtags || '').split(',').map(t => t.trim()).filter(Boolean);
        hashtagsDiv.textContent = hashtags.map(t => `#${t}`).join(' ');
        metaRow.appendChild(hashtagsDiv);

        contentDiv.appendChild(metaRow);

        link.appendChild(contentDiv);

        return link;
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
