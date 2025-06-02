function loadLatestPosts() {
  const container = document.getElementById('latest-posts');
  if (!container) return;

  container.innerHTML = '<p>Loading...</p>';

  fetch('d/all-posts.json')
    .then(res => {
      if (!res.ok) throw new Error('Gagal fetch all-posts.json');
      return res.json();
    })
    .then(data => {
      const posts = data.posts || [];
      const sorted = posts
        .filter(p => p.timestamp)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 6); // Tampilkan 6 terbaru

      container.innerHTML = '';
      container.classList.add('card-grid');

      sorted.forEach(post => {
        const hashtags = Array.isArray(post.hashtags) ? post.hashtags : [];
        const hashtagsHTML = hashtags.map(tag => `<span class="post-hashtag">#${tag}</span>`).join(' ');
        const labelHTML = post.label ? `<span class="post-label">#${post.label}</span>` : '';

        const el = document.createElement('div');
        el.className = 'post-card';
        el.innerHTML = `
          <a href="${post.link}">
            <img src="${post.thumbnail}" alt="${post.title}" loading="lazy" onerror="this.onerror=null;this.src='/assets/default-thumb.jpg';">
            <h3>${post.title}</h3>
            <p class="post-description">${post.description}</p>
          </a>
          <div class="post-meta">
            <div class="post-hashtags">${labelHTML} ${hashtagsHTML}</div>
            <div class="post-time" data-timestamp="${post.timestamp || ''}"></div>
          </div>
        `;

        container.appendChild(el);

        // Animasi muncul untuk label dan hashtags
        const tags = el.querySelectorAll('.post-hashtag, .post-label');
        tags.forEach(tag => {
          requestAnimationFrame(() => {
            tag.classList.add('show');
          });
        });
      });

      updateTimes(container);
    })
    .catch(err => {
      console.error('Gagal memuat latest posts:', err);
      container.innerHTML = '<p style="color:red;">Gagal memuat postingan terbaru.</p>';
    });
}

window.loadLatestPosts = loadLatestPosts;