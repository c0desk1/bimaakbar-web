function updatePostHeader(post) {
  const heroTitle = document.querySelector('.hero-section .blog-title');
  const heroDesc = document.querySelector('.hero-section .blog-description');

  if (!post) return;

  if (heroTitle) heroTitle.textContent = post.title || 'Judul Postingan';
  if (heroDesc) heroDesc.textContent = post.description || 'Deskripsi postingan belum tersedia';
}

window.updatePostHeader = updatePostHeader;