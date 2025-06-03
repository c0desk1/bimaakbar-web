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

            container.innerHTML = 'html/l/latest.html';
            container.classList.add('card-grid');

            sorted.forEach(post => {
                // Membuat container untuk masing-masing postingan
                const el = document.createElement('div');
                el.className = 'post-card';

                // Buat elemen link untuk postingan
                const link = document.createElement('a');
                link.href = post.url || post.link;
                el.appendChild(link);

                // Buat elemen image secara dinamis tanpa inline onerror
                const img = document.createElement('img');
                img.src = post.thumbnail;
                img.alt = post.title;
                img.loading = 'lazy';

                // Event listener untuk error pada image, gunakan fallback URL dari Google
                function handleImageError() {
                    img.removeEventListener('error', handleImageError); // Hindari loop error
                    img.src = 'https://lh3.googleusercontent.com/a/ACg8ocIqhNUvjLocKzLpoo7S9YyKLkDMw4sa01d1OR_IxbVHNbQCS2Y=s288-c-no';
                }
                img.addEventListener('error', handleImageError);
                link.appendChild(img);

                // Buat elemen heading untuk judul postingan
                const heading = document.createElement('h3');
                heading.textContent = post.title;
                link.appendChild(heading);

                // Buat elemen paragraf untuk deskripsi
                const description = document.createElement('p');
                description.className = 'post-description';
                description.textContent = post.description;
                link.appendChild(description);

                // Buat container untuk metadata posting seperti hashtags, label, dan timestamp
                const metaDiv = document.createElement('div');
                metaDiv.className = 'post-meta';
                el.appendChild(metaDiv);

                // Buat elemen untuk label dan hashtags
                const hashtagsDiv = document.createElement('div');
                hashtagsDiv.className = 'post-hashtags';
                const labelHTML = post.label ? `<span class="post-label">#${post.label}</span>` : '';
                const hashtagsHTML = Array.isArray(post.hashtags) ?
                    post.hashtags.map(tag => `<span class="post-hashtag">#${tag}</span>`).join(' ') :
                    '';
                hashtagsDiv.innerHTML = labelHTML + ' ' + hashtagsHTML;
                metaDiv.appendChild(hashtagsDiv);

                // Buat elemen untuk waktu posting (timestamp)
                const timeDiv = document.createElement('div');
                timeDiv.className = 'post-time';
                timeDiv.setAttribute('data-timestamp', post.timestamp || '');
                metaDiv.appendChild(timeDiv);

                container.appendChild(el);

                // Tambahkan animasi untuk label dan hashtags menggunakan requestAnimationFrame
                const tags = el.querySelectorAll('.post-hashtag, .post-label');
                tags.forEach(tag => {
                    requestAnimationFrame(() => {
                        tag.classList.add('show');
                    });
                });
            });

            // Pastikan fungsi ini sudah didefinisikan agar mengupdate waktu posting
            updateTimes(container);
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
                .slice(0, 6); // Tampilkan 6 postingan terpopuler

            container.innerHTML = 'htmls/l/popular.html';
            container.classList.add('card-grid');

            popular.forEach(post => {

                // Buat container postingan
                const el = document.createElement('div');
                el.className = 'post-card';

                // Buat elemen link
                const link = document.createElement('a');
                link.href = post.url || post.link;
                el.appendChild(link);

                // Buat elemen image tanpa inline onerror untuk memenuhi CSP
                const img = document.createElement('img');
                img.src = post.thumbnail;
                img.alt = post.title;
                img.loading = 'lazy';

                // Event listener untuk menangani error pada image
                function handleImageError() {
                    img.removeEventListener('error', handleImageError);
                    img.src = 'https://lh3.googleusercontent.com/a/ACg8ocIqhNUvjLocKzLpoo7S9YyKLkDMw4sa01d1OR_IxbVHNbQCS2Y=s288-c-no';
                }
                img.addEventListener('error', handleImageError);
                link.appendChild(img);

                // Buat elemen judul postingan
                const heading = document.createElement('h3');
                heading.textContent = post.title;
                link.appendChild(heading);

                // Buat elemen deskripsi postingan
                const description = document.createElement('p');
                description.className = 'post-description';
                description.textContent = post.description;
                link.appendChild(description);

                // Container metadata untuk label, hashtags, dan jumlah views
                const metaDiv = document.createElement('div');
                metaDiv.className = 'post-meta';
                el.appendChild(metaDiv);

                // Elemen untuk label dan hashtags
                const hashtagsDiv = document.createElement('div');
                hashtagsDiv.className = 'post-hashtags';
                const labelHTML = post.label ? `<span class="post-label">#${post.label}</span>` : '';
                const hashtagsHTML = Array.isArray(post.hashtags) ?
                    post.hashtags.map(tag => `<span class="post-hashtag">#${tag}</span>`).join(' ') :
                    '';
                hashtagsDiv.innerHTML = labelHTML + ' ' + hashtagsHTML;
                metaDiv.appendChild(hashtagsDiv);

                // Elemen untuk menampilkan jumlah views (populer)
                const viewsDiv = document.createElement('div');
                viewsDiv.className = 'post-views';
                viewsDiv.textContent = `${post.views} views`;
                metaDiv.appendChild(viewsDiv);

                container.appendChild(el);

                // Tambahkan animasi untuk label dan hashtags menggunakan requestAnimationFrame
                const tags = el.querySelectorAll('.post-hashtag, .post-label');
                tags.forEach(tag => {
                    requestAnimationFrame(() => {
                        tag.classList.add('show');
                    });
                });
            });
        })
        .catch(err => {
            console.error('Gagal memuat popular posts:', err);
            container.innerHTML = '<p style="color:red;">Gagal memuat postingan populer.</p>';
        });
}

window.loadPopularPosts = loadPopularPosts;
window.loadLatestPosts = loadLatestPosts;
