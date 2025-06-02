function loadPostsMusik() {
  var container = document.getElementById('post-list-musik');
  if (!container) {
    console.warn('Elemen #post-list-musik tidak ditemukan.');
    return;
  }

  container.innerHTML = '<p>Loading posts...</p>';
  fetch('https://opensheet.elk.sh/10fSdWnRM2rYLYfJufWl-IkBeul2CgZSoUmOaeneO8xk/musik-list')
    .then(function(res) {
      if (!res.ok) throw new Error('Gagal fetch JSON: ' + res.status + ' ' + res.statusText);
      return res.json();
    })

    .then(function(data) {
    	console.log(data);
      if (!data.posts || !data.posts.length) {
        container.innerHTML = '<p>Belum ada postingan musik.</p>';
        return;
      }

      container.innerHTML = '';
      if (container.className.indexOf('card-grid') === -1) {
        container.className += ' card-grid';
      }

      for (var i = 0; i < data.posts.length; i++) {
        var post = data.posts[i];

        var hashtags = Array.isArray(post.hashtags) ? post.hashtags : [];
        var hashtagsHTML = '';
        for (var j = 0; j < hashtags.length; j++) {
          hashtagsHTML += '<span class="post-hashtag">#' + hashtags[j] + '</span> ';
        }

        // Tambah label (kategori) jika ada
        var labelHTML = post.label ? '<span class="post-label">#' + post.label + '</span> ' : '';

        var postEl = document.createElement('div');
        postEl.className = 'post-card';

        postEl.innerHTML =
          '<a href="' + post.link + '" target="_blank" rel="noopener noreferrer">' +
            '<img src="' + post.thumbnail + '" alt="' + post.title + '" loading="lazy" ' +
                 'onerror="this.onerror=null;this.src=\'/assets/default-thumb.jpg\';">' +
            '<h3>' + post.title + '</h3>' +
            '<p class="post-description">' + post.description + '</p>' +
          '</a>' +
          '<div class="post-meta">' +
            '<div class="post-hashtags">' + labelHTML + hashtagsHTML + '</div>' +
            '<div class="post-time" data-timestamp="' + (post.timestamp || '') + '"></div>' +
          '</div>';

        container.appendChild(postEl);

        // Animasi kelas show untuk hashtags & label
        var tags = postEl.querySelectorAll('.post-hashtag, .post-label');
        for (var k = 0; k < tags.length; k++) {
          (function(tag) {
            requestAnimationFrame(function() {
              tag.className += ' show';
            });
          })(tags[k]);
        }
      }
    })
    .catch(function(error) {
      console.error('Error saat memuat post musik:', error);
      container.innerHTML = '<p style="color:red;">Gagal memuat postingan musik.</p>';
    });
}

window.loadPostsMusik = loadPostsMusik;