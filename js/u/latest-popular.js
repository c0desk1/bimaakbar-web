const SHEET_URL = 'https://opensheet.elk.sh/1SIruB6QAkFD35FeCcyY_lesfe5M7QuhKIyRT9o41UNk/post';

function fetchAllPosts() {
  return fetch(SHEET_URL)
    .then(res => {
      if (!res.ok) throw new Error('Gagal fetch data: ' + res.status);
      return res.json();
    });
}

function renderPosts(containerId, posts, withViews = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  container.classList.add('card-grid');

  posts.forEach(post => {
    const el = document.createElement('div');
    el.className = 'post-card';

    const link = document.createElement('a');
    link.href = post.url || post.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    el.appendChild(link);

    const img = document.createElement('img');
    img.src = post.thumbnail;
    img.alt = post.title;
    img.loading = 'lazy';
    img.onerror = function () {
      this.src = '/assets/error.jpg';
    };
    link.appendChild(img);

    const heading = document.createElement('h3');
    heading.textContent = post.title;
    link.appendChild(heading);

    const desc = document.createElement('p');
    desc.className = 'post-description';
    desc.textContent = post.description;
    link.appendChild(desc);

    const meta = document.createElement('div');
    meta.className = 'post-meta';

    const hashtagsDiv = document.createElement('div');
    hashtagsDiv.className = 'post-hashtags';
    const hashtags = (post.hashtags || '').split(',').map(tag => tag.trim()).filter(Boolean);
    hashtagsDiv.innerHTML = hashtags.map(tag => `<span class="post-hashtag">#${tag}</span>`).join(' ');
    meta.appendChild(hashtagsDiv);

    const timeDiv = document.createElement('div');
    timeDiv.className = 'post-time';
    timeDiv.setAttribute('data-timestamp', post.timestamp || '');
    meta.appendChild(timeDiv);

    if (withViews && post.views) {
      const viewsDiv = document.createElement('div');
      viewsDiv.className = 'post-views';
      viewsDiv.textContent = `${post.views} views`;
      meta.appendChild(viewsDiv);
    }

    el.appendChild(meta);
    container.appendChild(el);

    // Animasi hashtag
    el.querySelectorAll('.post-hashtag').forEach(tag => {
      requestAnimationFrame(() => tag.classList.add('show'));
    });
  });

  // ⏱️ Update waktu setelah render
  if (typeof updateTimes === 'function') updateTimes();
}

function loadLatestPosts() {
  fetchAllPosts()
    .then(posts => {
      const latest = posts
        .filter(p => p.timestamp)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 6);
      renderPosts('latest-posts', latest);
    })
    .catch(err => {
      console.error('❌ Gagal memuat latest posts:', err);
    });
}

function loadPopularPosts() {
  fetchAllPosts()
    .then(posts => {
      const popular = posts
        .filter(p => p.views && !isNaN(parseInt(p.views)))
        .sort((a, b) => parseInt(b.views) - parseInt(a.views))
        .slice(0, 6);
      renderPosts('popular-posts', popular, true);
    })
    .catch(err => {
      console.error('❌ Gagal memuat popular posts:', err);
    });
}

window.loadLatestPosts = loadLatestPosts;
window.loadPopularPosts = loadPopularPosts;