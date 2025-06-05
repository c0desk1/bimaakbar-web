function createPostElement(post) {
  var el = document.createElement('div');
  el.className = 'post-card';

  var link = document.createElement('a');
  link.href = post.url || post.link || '#';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.style.display = 'flex';  // supaya flex di anchor

  // konten kiri
  var leftDiv = document.createElement('div');
  leftDiv.className = 'post-content';

  // label (paling atas kecil)
  var label = document.createElement('div');
  label.className = 'post-label';
  label.textContent = post.label || post.category || 'No Label';
  label.style.fontSize = '0.75em';
  label.style.color = 'var(--primary-color)';
  label.style.marginBottom = '4px';
  leftDiv.appendChild(label);

  // judul
  var title = document.createElement('h3');
  title.className = 'post-title';
  var titleLink = document.createElement('a');
  titleLink.href = link.href;
  titleLink.target = '_blank';
  titleLink.rel = 'noopener noreferrer';
  titleLink.textContent = post.title || 'No Title';
  title.appendChild(titleLink);
  leftDiv.appendChild(title);

  // deskripsi singkat
  var desc = document.createElement('p');
  desc.className = 'post-description';
  desc.textContent = post.description || '';
  leftDiv.appendChild(desc);

  // baris bawah: hashtags di kiri, views di kanan
  var bottomRow = document.createElement('div');
  bottomRow.className = 'post-bottom-row';

  var hashtagsDiv = document.createElement('div');
  hashtagsDiv.className = 'post-hashtags';
  var hashtags = (post.hashtags || '').split(',').map(function(t){ return t.trim(); }).filter(function(t){ return t; });
  hashtagsDiv.innerHTML = hashtags.map(function(t){
    return '<span class="post-hashtag">#' + t + '</span>';
  }).join(' ');
  bottomRow.appendChild(hashtagsDiv);

  var viewsDiv = document.createElement('div');
  viewsDiv.className = 'post-views';
  viewsDiv.innerHTML = '<i class="fa fa-eye"></i> ' + (post.views ? post.views : '0') + ' views';
  bottomRow.appendChild(viewsDiv);

  leftDiv.appendChild(bottomRow);

  // waktu post
  var timeDiv = document.createElement('div');
  timeDiv.className = 'post-time';
  timeDiv.innerHTML = '<i class="fa fa-clock-o"></i> ' + formatTime(post.timestamp);
  timeDiv.style.marginTop = '6px';
  leftDiv.appendChild(timeDiv);

  // thumbnail kanan
  var thumbDiv = document.createElement('div');
  thumbDiv.className = 'post-thumb';
  thumbDiv.style.flexShrink = '0'; // supaya thumbnail tidak mengecil

  var img = document.createElement('img');
  img.src = post.thumbnail || '/assets/error.jpg';
  img.alt = post.title || '';
  img.loading = 'lazy';
  img.onerror = function() {
    img.src = '/assets/error.jpg';
  };
  thumbDiv.appendChild(img);

  link.appendChild(leftDiv);
  link.appendChild(thumbDiv);
  el.appendChild(link);

  return el;
}