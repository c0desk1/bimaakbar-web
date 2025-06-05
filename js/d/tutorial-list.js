function loadPostsTutorial() {
    console.log('Element dipanggil');

    const container = document.getElementById('post-list-tutorial');
    if (!container) {
        console.warn('Elemen #post-list-tutorial tidak ditemukan.');
        return;
    }
    container.innerHTML = '<p>Loading posts...</p>';
        fetch('https://opensheet.elk.sh/10mlJVNqfUinj7gWlZ3_VcItX4EyBrRpWs3isOKXK5_M/tutorial')
        .then(res => {
            if (!res.ok) throw new Error('Gagal fetch Data: ' + res.status + ' ' + res.statusText);
            return res.json();
        })
        .then(data => {
            console.log('Data tutorial:', data);
            if (!data || !data.length) {
                container.innerHTML = '<p>Belum ada postingan.</p>';
                return;
            }

            container.innerHTML = '';
            if (!container.classList.contains('card-grid')) {
                container.classList.add('card-grid');
            }

            data.forEach(post => {
                const hashtags = Array.isArray(post.hashtags)
                    ? post.hashtags
                    : (post.hashtags || '').split(',').map(tag => tag.trim()).filter(Boolean);
                const hashtagsHTML = hashtags.map(tag => `<span class="post-hashtag">#${tag}</span>`).join(' ');
                const labelHTML = post.label ? `<span style="display:none;" class="post-label">${post.label}</span>` : '';
                const postEl = document.createElement('div');
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
                    </div>`;
                container.appendChild(postEl);
                postEl.querySelectorAll('.post-hashtag, .post-label').forEach(tag => {
                    requestAnimationFrame(() => tag.classList.add('show'));
                });
            });

            if (typeof updateTimes === 'function') {
                updateTimes();
            } else {
                console.warn('Fungsi updateTimes() tidak ditemukan.');
            }
        })
        .catch(error => {
            console.error('❌ Error saat memuat postingan:', error);
            container.innerHTML = '<p style="color:red;">Gagal memuat postingan.</p>';
        });
}

window.loadPostsTutorial = loadPostsTutorial;