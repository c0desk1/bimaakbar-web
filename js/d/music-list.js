function loadPostsMusik() {
    console.log('🔊 loadPostsMusik dipanggil');

    var container = document.getElementById('post-list-musik');
    if (!container) {
        console.warn('Elemen #post-list-musik tidak ditemukan.');
        return;
    }

    container.innerHTML = '<p>Loading posts...</p>';

    fetch('https://opensheet.elk.sh/10fSdWnRM2rYLYfJufWl-IkBeul2CgZSoUmOaeneO8xk/musik')
        .then(function(res) {
            if (!res.ok) throw new Error('Gagal fetch Data: ' + res.status + ' ' + res.statusText);
            return res.json();
        })
        .then(function(data) {
            console.log('📦 Data musik:', data);
            if (!data || !data.length) {
                container.innerHTML = '<p>Belum ada postingan.</p>';
                return;
            }

            container.innerHTML = '';
            container.classList.add('card-grid');

            for (var i = 0; i < data.length; i++) {
                var post = data[i];

                // === [ PERBAIKAN: Parsingan hashtags fleksibel ] ===
                var hashtags = [];
                if (Array.isArray(post.hashtags)) {
                    hashtags = post.hashtags;
                } else if (typeof post.hashtags === 'string') {
                    hashtags = post.hashtags
                        .split(',')
                        .map(s => s.trim())
                        .filter(s => s !== '');
                }

                var hashtagsHTML = hashtags
                    .map(tag => '<span class="post-hashtag">#' + tag + '</span>')
                    .join(' ');

                var labelHTML = post.label ? '<span style="display:none;" class="post-label">' + post.label + '</span>' : '';

                var postEl = document.createElement('div');
                postEl.className = 'post-card';

                postEl.innerHTML = `
                    <a href="${post.url}" target="_blank" rel="noopener noreferrer">
                        <img src="${post.thumbnail}" alt="${post.title}" loading="lazy"
                            onerror="this.onerror=null;this.src='/assets/error.jpg';">
                        <h3>${post.title}</h3>
                        <p class="post-description">${post.description}</p>
                    </a>
                    <div class="post-meta">
                        <div class="post-hashtags">${labelHTML} ${hashtagsHTML}</div>
                        <div class="post-time" data-timestamp="${post.timestamp || ''}"></div>
                    </div>
                `;

                container.appendChild(postEl);

                var tags = postEl.querySelectorAll('.post-hashtag, .post-label');
                tags.forEach(function(tag) {
                    requestAnimationFrame(function() {
                        tag.classList.add('show');
                    });
                });
            }

            if (typeof updateTimes === 'function') {
                updateTimes(container);
            } else {
                console.warn('Fungsi updateTimes() tidak ditemukan.');
            }
        })
        .catch(function(error) {
            console.error('Error saat memuat post musik:', error);
            container.innerHTML = '<p style="color:red;">Gagal memuat postingan musik.</p>';
        });
}

window.loadPostsMusik = loadPostsMusik;