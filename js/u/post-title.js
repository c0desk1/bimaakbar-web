function updatePostTitle({
  titleElementId = 'dynamic-title',
  descElementId = 'dynamic-description',
  defaultTitle = 'Judul Postingan',
  defaultDesc = 'Deskripsi belum tersedia'
} = {}) {
  const titleFromHead = document.title || defaultTitle;
  const metaDescTag = document.querySelector('meta[name="description"]');
  const descFromHead = metaDescTag ? metaDescTag.getAttribute('content') : defaultDesc;

  const heroTitle = document.getElementById(titleElementId);
  const heroDesc = document.getElementById(descElementId);

  if (heroTitle) heroTitle.textContent = titleFromHead;
  if (heroDesc) heroDesc.textContent = descFromHead;
}

// Tetap pakai nama fungsi lama agar main.js tidak perlu diubah
window.updatePostTitle = updatePostTitle;