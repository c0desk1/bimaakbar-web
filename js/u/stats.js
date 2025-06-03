async function updateStats() {
  try {
    const response = await fetch('p/dummy.json');
    const posts = await response.json();

    const totalPosts = posts.length;
    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
    const totalMembers = 187; // Dummy atau ambil dari data asli jika ada

    const elPosts = document.getElementById('total-posts');
    const elViews = document.getElementById('total-views');
    const elMembers = document.getElementById('total-members');

    if (elPosts) elPosts.textContent = totalPosts + ' post';
    if (elViews) elViews.textContent = totalViews.toLocaleString() + ' view';
    if (elMembers) elMembers.textContent = totalMembers.toLocaleString() + ' member';

  } catch (error) {
    console.error('Gagal memuat statistik:', error);
  }
}