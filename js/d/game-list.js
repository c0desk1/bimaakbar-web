function loadPostsGame() {
  console.log('ðŸ”Š loadPostsGame dipanggil');
  
  var container = document.getElementById('post-list-game');
  if (!container) {
    console.warn('Elemen #post-list-game tidak ditemukan.');
    return;
  }

  container.innerHTML = '<p>Loading posts...</p>';
  fetch('https://opensheet.elk.sh/1_vWvMJK-mzsM38aPk6fXoPM_tjG9d3ibHtUhiJf_KW0/game')
    .then(function(res) {
      if (!res.ok) throw new Error('Gagal fetch Data: ' + res.status + ' ' + res.statusText);
      return res.json();
    })

    .then(function(data) {
	  console.log(' Data game:', data);
	  if (!data || !data.length) {
	    container.innerHTML = '<p>Belum ada postingan.</p>';
	    return;
	  }
	
	  container.innerHTML = '';
	  if (!container.classList.contains('card-grid')) {
	    container.classList.add('card-grid');
	  }
	
	  for (var i = 0; i < data.length; i++) {
	    var post = data[i];
	
	    var hashtags = Array.isArray(post.hashtags) ? post.hashtags : [];
	    var hashtagsHTML = '';
	    for (var j = 0; j < hashtags.length; j++) {
	      hashtagsHTML += '<span class="post-hashtag">#' + hashtags[j] + '</span> ';
	    }
	
	    var labelHTML = post.label ? '<span class="post-label">#' + post.label + '</span> ' : '';
	
	    var postEl = document.createElement('div');
	    postEl.className = 'post-card';
	
	    postEl.innerHTML =
	      '<a href="' + post.url + '" target="_blank" rel="noopener noreferrer">' +
	        '<img src="' + post.thumbnail + '" alt="' + post.title + '" loading="lazy" ' +
	             'onerror="this.onerror=null;this.src=\'/assets/error.jpg\';">' +
	        '<h3>' + post.title+ '</h3>' +
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
    .catch(function(error) {
      console.error('Error saat memuat post game:', error);
      container.innerHTML = '<p style="color:red;">Gagal memuat postingan game.</p>';
    });
}
window.loadPostsGame = loadPostsGame;
