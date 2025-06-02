async function fetchPosts() {
  try {
    const response = await fetch('p/dummy.json');
    return await response.json();
  } catch (error) {
    console.error('Gagal memuat pencarian post:', error);
    return [];
  }
}

async function handleSearchInput(e) {
  const query = e.target.value.toLowerCase();
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = '';

  if (!query.trim()) {
    resultsContainer.style.display = 'none'; // Sembunyikan container
    return;
  }

  const posts = await fetchPosts();

  const matched = posts.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.description.toLowerCase().includes(query) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
  );

  if (matched.length > 0) {
    resultsContainer.style.display = 'block';
  } else {
    resultsContainer.innerHTML = '<p>Tidak ada hasil ditemukan.</p>';
    resultsContainer.style.display = 'block';
    return;
  }

  matched.forEach(post => {
    const link = document.createElement('a');
    link.href = post.url;
    link.innerHTML = `<strong>${post.title}</strong><br><small>${post.description}</small>`;
    resultsContainer.appendChild(link);
  });
}

window.handleSearchInput = handleSearchInput;