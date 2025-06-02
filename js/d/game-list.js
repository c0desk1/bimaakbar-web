function loadPostsGame() {
  var container = document.getElementById('post-list-game');
  if (!container) return;

  container.innerHTML = '<p>Loading game posts...</p>';

  fetch('https://opensheet.elk.sh/10mlJVNqfUinj7gWlZ3_VcItX4EyBrRpWs3isOKXK5_M/game-list')
    .then(function(res) {
      if (!res.ok) throw new Error('Gagal fetch game.json');
      return res.json();
    })
    .then(function(data) {
      if (!data.posts || !data.posts.length) {
        container.innerHTML = '<p>Belum ada konten game.</p>';
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

        var labelHTML = post.label ? '<span class="post-label">#' + post.label + '</span> ' : '';

        var postEl = document.createElement('div');
        postEl.className = 'post-card';
        postEl.style.marginBottom = '20px';

        postEl.innerHTML =
          '<a href="' + post.link + '">' +
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
    .catch(function(err) {
      console.error('Gagal memuat game:', err);
      container.innerHTML = '<p style="color:red;">Gagal memuat data game.</p>';
    });
}

window.loadPostsGame = loadPostsGame;