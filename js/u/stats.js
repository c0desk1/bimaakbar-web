

// Fungsi ambil statistik
async function updateStats() {
  try {
    const snapshot = await firebase.database().ref('posts').once('value');
    const postsData = snapshot.val() || {};
    const posts = Object.values(postsData);

    const totalPosts = posts.length;
    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
    const totalMembers = 187; // Bisa dibuat dinamis nanti

    document.getElementById('total-posts').textContent = `${totalPosts} post`;
    document.getElementById('total-views').textContent = `${totalViews.toLocaleString()} view`;
    document.getElementById('total-members').textContent = `${totalMembers.toLocaleString()} member`;
  } catch (err) {
    console.error("Gagal memuat data stats dari Firebase:", err);
  }
}
