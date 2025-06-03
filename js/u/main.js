async function loadLatestPosts() {
  const container = document.getElementById('latest-posts');
  if (!container) return;

  container.innerHTML = '<p>Loading...</p>';

  try {
    const res = await fetch('p/dummy.json');
    if (!res.ok) throw new Error('Gagal fetch .json');
    const data = await res.json();

    // proses data seperti biasa
    // ...
    // setelah selesai:
    updateTimes();

  } catch (err) {
    console.error('Gagal memuat latest posts:', err);
    container.innerHTML = '<p style="color:red;">Gagal memuat postingan terbaru.</p>';
  }
}
