function loadLatestPosts() {
    const container = document.getElementById('latest-posts');
    if (!container) return;

    container.innerHTML = '<p>Loading...</p>';

    fetch('p/dummy.json')
        .then(res => {
            if (!res.ok) throw new Error('Gagal fetch .json');
            return res.json();
        })
        .then(data => {
            const posts = data.posts || [];
            // Urutkan posting berdasarkan timestamp dan ambil 6 postingan terbaru
            const sorted = posts
                .filter(p => p.timestamp)
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .slice(0, 6);

            container.innerHTML = '';
            container.classList.add('card-grid');

            sorted.forEach(post => {
                const el = document.createElement('div');
                el.className = 'post-card';

                const link = document.createElement('a');
                link.href = post.url || post.link;
                el.appendChild(link);

                const img = document.createElement('img');
                img.src = post.thumbnail;
                img.alt = post.title;
                img.loading = 'lazy';

                function handleImageError() {
                    img.removeEventListener('error', handleImageError);
                    img.src = 'https://lh3.googleusercontent.com/a/ACg8ocIqhNUvjLocKzLpoo7S9YyKLkDMw4sa01d1OR_IxbVHNbQCS2Y=s288-c-no';
                }
                img.addEventListener('error', handleImageError);
                link.appendChild(img);

                const heading = document.createElement('h3');
                heading.textContent = post.title;
                link.appendChild(heading);

                const description = document.createElement('p');
                description.className = 'post-description';
                description.textContent = post.description;
                link.appendChild(description);

                const metaDiv = document.createElement('div');
                metaDiv.className = 'post-meta';
                el.appendChild(metaDiv);

                const hashtagsDiv = document.createElement('div');
                hashtagsDiv.className = 'post-hashtags';
                const labelHTML = post.label ? `<span class="post-label">#${post.label}</span>` : '';
                const hashtagsHTML = Array.isArray(post.hashtags) ?
                    post.hashtags.map(tag => `<span class="post-hashtag">#${tag}</span>`).join(' ') :
                    '';
                hashtagsDiv.innerHTML = labelHTML + ' ' + hashtagsHTML;
                metaDiv.appendChild(hashtagsDiv);

                const timeDiv = document.createElement('div');
                timeDiv.className = 'post-time';
                timeDiv.setAttribute('data-timestamp', post.timestamp || '');
                metaDiv.appendChild(timeDiv);

                container.appendChild(el);

                // Animasi label dan hashtag
                const tags = el.querySelectorAll('.post-hashtag, .post-label');
                tags.forEach(tag => {
                    requestAnimationFrame(() => {
                        tag.classList.add('show');
                    });
                });
            });

            if (typeof updateTimes === 'function') {
                updateTimes(container);
            }
            // Update waktu posting
            if (typeof updateTimes === 'function') {
                updateTimes();
            } else {
                console.warn('Fungsi updateTimes() tidak ditemukan.');
            }
        })
        .catch(err => {
            console.error('Gagal memuat latest posts:', err);
            container.innerHTML = '<p style="color:red;">Gagal memuat postingan terbaru.</p>';
        });
}

function loadPopularPosts() {
    const container = document.getElementById('popular-posts');
    if (!container) return;

    container.innerHTML = '<p>Loading...</p>';

    fetch('p/dummy.json')
        .then(res => {
            if (!res.ok) throw new Error('Gagal fetch .json');
            return res.json();
        })
        .then(data => {
            const posts = data.posts || [];
            // Filter posting dengan properti views dan urutkan secara menurun (populer)
            const popular = posts
                .filter(p => p.views)
                .sort((a, b) => b.views - a.views)
                .slice(0, 6);

            container.innerHTML = '';
            container.classList.add('card-grid');

            popular.forEach(post => {
                const el = document.createElement('div');
                el.className = 'post-card';

                const link = document.createElement('a');
                link.href = post.url || post.link;
                el.appendChild(link);

                const img = document.createElement('img');
                img.src = post.thumbnail;
                img.alt = post.title;
                img.loading = 'lazy';

                function handleImageError() {
                    img.removeEventListener('error', handleImageError);
                    img.src = 'https://lh3.googleusercontent.com/a/ACg8ocIqhNUvjLocKzLpoo7S9YyKLkDMw4sa01d1OR_IxbVHNbQCS2Y=s288-c-no';
                }
                img.addEventListener('error', handleImageError);
                link.appendChild(img);

                const heading = document.createElement('h3');
                heading.textContent = post.title;
                link.appendChild(heading);

                const description = document.createElement('p');
                description.className = 'post-description';
                description.textContent = post.description;
                link.appendChild(description);

                const metaDiv = document.createElement('div');
                metaDiv.className = 'post-meta';
                el.appendChild(metaDiv);

                const hashtagsDiv = document.createElement('div');
                hashtagsDiv.className = 'post-hashtags';
                const labelHTML = post.label ? `<span class="post-label">#${post.label}</span>` : '';
                const hashtagsHTML = Array.isArray(post.hashtags) ?
                    post.hashtags.map(tag => `<span class="post-hashtag">#${tag}</span>`).join(' ') :
                    '';
                hashtagsDiv.innerHTML = labelHTML + ' ' + hashtagsHTML;
                metaDiv.appendChild(hashtagsDiv);

                const viewsDiv = document.createElement('div');
                viewsDiv.className = 'post-views';
                viewsDiv.textContent = `${post.views} views`;
                metaDiv.appendChild(viewsDiv);

                container.appendChild(el);

                const tags = el.querySelectorAll('.post-hashtag, .post-label');
                tags.forEach(tag => {
                    requestAnimationFrame(() => {
                        tag.classList.add('show');
                    });
                });
            });
            // Update waktu posting
            if (typeof updateTimes === 'function') {
                updateTimes();
            } else {
                console.warn('Fungsi updateTimes() tidak ditemukan.');
            }
        })
        .catch(err => {
            console.error('Gagal memuat popular posts:', err);
            container.innerHTML = '<p style="color:red;">Gagal memuat postingan populer.</p>';
        });
}

// Ekspos fungsi agar bisa dipanggil di main.js
window.loadPopularPosts = loadPopularPosts;
window.loadLatestPosts = loadLatestPosts;
