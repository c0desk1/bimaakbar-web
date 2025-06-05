function createPostElement(post) {
  var el = document.createElement('div');
  el.className = 'post-card';

  var link = document.createElement('a');
  link.href = post.url || post.link || '#';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'post-link'; // gunakan flex di sini

  // THUMBNAIL DI KIRI
  var thumbDiv = document.createElement('div');
  thumbDiv.className = 'post-thumb';
  var img = document.createElement('img');
  img.src = post.thumbnail || '/assets/error.jpg';
  img.alt = post.title || '';
  img.loading = 'lazy';
  img.onerror = function() {
    img.src = '/assets/error.jpg';
  };
  thumbDiv.appendChild(img);

  // KONTEN DI KANAN THUMBNAIL
  var contentDiv = document.createElement('div');
  contentDiv.className = 'post-content-wrapper';

  // LABEL (KANAN ATAS)
  var label = document.createElement('div');
  label.className = 'post-label';
  label.textContent = post.label || post.category || 'No Label';
  contentDiv.appendChild(label);

  // TITLE
  var title = document.createElement('h3');
  title.className = 'post-title';
  title.textContent = post.title || 'No Title';
  contentDiv.appendChild(title);

  // DESKRIPSI
  var desc = document.createElement('p');
  desc.className = 'post-description';
  desc.textContent = post.description || '';
  contentDiv.appendChild(desc);

  // HASHTAGS + VIEWS
  var metaRow = document.createElement('div');
  metaRow.className = 'post-meta-row';

  var hashtagsDiv = document.createElement('div');
  hashtagsDiv.className = 'post-hashtags';
  var hashtags = (post.hashtags || '').split(',').map(function(t){ return t.trim(); }).filter(function(t){ return t; });
  hashtagsDiv.innerHTML = hashtags.map(function(t){
    return '<span class="post-hashtag">#' + t + '</span>';
  }).join(' ');
  metaRow.appendChild(hashtagsDiv);

  var viewsDiv = document.createElement('div');
  viewsDiv.className = 'post-views';
  viewsDiv.innerHTML = '<i class="fa fa-eye"></i> ' + (post.views ? post.views : '0') + ' views';
  metaRow.appendChild(viewsDiv);

  contentDiv.appendChild(metaRow);

  // TIME (KANAN BAWAH)
  var timeDiv = document.createElement('div');
  timeDiv.className = 'post-time';
  timeDiv.innerHTML = '<i class="fa fa-clock-o"></i> ' + formatTime(post.timestamp);
  contentDiv.appendChild(timeDiv);

  link.appendChild(thumbDiv);
  link.appendChild(contentDiv);
  el.appendChild(link);

  return el;
}