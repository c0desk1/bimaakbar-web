function loadPostsTips() {
  var container = document.getElementById('post-list-tips');
  if (!container) return;

  container.innerHTML = '<p>Loading...</p>';
  fetch('https://opensheet.elk.sh/1l7d-9BwbbH5I-jj_Uw0-eA2mkJEWV_yWyt9RquhM_XY/tips-list')
    .then(function(res) {
      if (!res.ok) throw new Error('Gagal fetch tips dantrik');
      return res.json();
    })
    .then(function(data) {
      if (!data.posts || !data.posts.length) {
        container.innerHTML = '<p>Belum ada tips & trik.</p>';
        return;
      }

      // Filter berdasarkan label 'tips' supaya lebih aman
      const filteredPosts = data.posts.filter(post => post.label && post.label.toLowerCase() === 'tips');

      if (!filteredPosts.length) {
        container.innerHTML = '<p>Tidak ada postingan tips & trik dengan label "tips".</p>';
        return;
      }

      container.innerHTML = '';
      container.className += ' card-grid';

      filteredPosts.forEach(post => {
        var hashtags = Array.isArray(post.hashtags) ? post.hashtags : [];
        var hashtagsHTML = hashtags.map(tag => `<span class="post-hashtag">#${tag}</span>`).join(' ');

        var postEl = document.createElement('div');
        postEl.className = 'post-card';
        postEl.innerHTML =
          `<a href="${post.link || post.url}">
            <img src="${post.thumbnail}" alt="${post.title}" loading="lazy" onerror="this.onerror=null;this.src='/assets/default-thumb.jpg';">
            <h3>${post.title}</h3>
            <p class="post-description">${post.description}</p>
          </a>
          <div class="post-meta">
            <div class="post-hashtags">${hashtagsHTML}</div>
            <div class="post-time" data-timestamp="${post.timestamp || ''}"></div>
          </div>`;

        container.appendChild(postEl);

        // Animasi show untuk hashtags
        var tags = postEl.querySelectorAll('.post-hashtag');
        tags.forEach(tag => {
          requestAnimationFrame(() => tag.classList.add('show'));
        });
      });
    })
    .catch(function(err) {
      console.error('Gagal memuat tips & trik:', err);
      container.innerHTML = '<p style="color:red;">Gagal memuat data tips & trik.</p>';
    });
}

// Ekspor ke global
window.loadPostsTips = loadPostsTips;