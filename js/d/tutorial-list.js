function loadPostsTutorial() {
  const container = document.getElementById('post-list-tutorial');
  if (!container) return;

  container.innerHTML = '<p>Loading tutorial...</p>';
  fetch('https://opensheet.elk.sh/10mlJVNqfUinj7gWlZ3_VcItX4EyBrRpWs3isOKXK5_M/tutorial')
    .then(res => {
      if (!res.ok) throw new Error('Gagal fetch data tutorial');
      return res.json();
    })
    .then(data => {
      const filteredPosts = data.filter(post => post.label && post.label.toLowerCase() === 'tutorial');

      if (!filteredPosts.length) {
        container.innerHTML = '<p>Belum ada postingan dengan label "tutorial".</p>';
        return;
      }

      container.innerHTML = '';
      container.className += ' card-grid';

      filteredPosts.forEach(post => {
        const hashtags = Array.isArray(post.hashtags) ? post.hashtags : [];
        const hashtagsHTML = hashtags.map(tag => `<span class="post-hashtag">#${tag}</span>`).join(' ');

        const postEl = document.createElement('div');
        postEl.className = 'post-card';
        postEl.innerHTML = `
          <a href="${post.link || post.url}">
            <img src="${post.thumbnail}" alt="${post.title}" loading="lazy" onerror="this.onerror=null;this.src='/assets/default-thumb.jpg';">
            <h3>${post.title}</h3>
            <p class="post-description">${post.description}</p>
          </a>
          <div class="post-meta">
            <div class="post-hashtags">${hashtagsHTML}</div>
            <div class="post-time" data-timestamp="${post.timestamp || ''}"></div>
          </div>
        `;
        container.appendChild(postEl);
      });
    })
    .catch(err => {
      console.error('Gagal memuat data tutorial:', err);
      container.innerHTML = '<p style="color:red;">Gagal memuat data tutorial.</p>';
    });
}

window.loadPostsTutorial = loadPostsTutorial;
