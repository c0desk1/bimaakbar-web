// Fungsi untuk mengambil data postingan (update path sumber data jika perlu)
async function fetchPosts() {
  try {
    const response = await fetch('p/dummy.json');
    // Pastikan response berupa array objek post
    if (!response.ok) throw new Error('Gagal fetch data post');
    const data = await response.json();
    // Bisa berupa array atau objek dengan key 'posts'
    return Array.isArray(data) ? data : data.posts || [];
  } catch (error) {
    console.error('Gagal memuat data post untuk search:', error);
    return [];
  }
}

// Fungsi utama input pencarian
async function handleSearchInput(e) {
  const query = e.target.value.trim().toLowerCase();
  const resultsContainer = document.getElementById('search-results');
  if (!resultsContainer) return;

  resultsContainer.innerHTML = '';

  if (!query) {
    resultsContainer.style.display = 'none';
    return;
  }

  const posts = await fetchPosts();

  const matched = posts.filter(post =>
    (post.title && post.title.toLowerCase().includes(query)) ||
    (post.description && post.description.toLowerCase().includes(query)) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
  );

  if (matched.length > 0) {
    resultsContainer.style.display = 'block';
    matched.forEach(post => {
      const link = document.createElement('a');
      link.href = post.url || post.link || "#";
      link.innerHTML = `<strong>${post.title || '-'}</strong><br><small>${post.description || ''}</small>`;
      resultsContainer.appendChild(link);
    });
  } else {
    resultsContainer.innerHTML = '<p>Tidak ada hasil ditemukan.</p>';
    resultsContainer.style.display = 'block';
  }
}

// Simpan fungsi di global agar bisa dipakai di event handler
window.handleSearchInput = handleSearchInput;