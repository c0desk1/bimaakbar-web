function updatePostTitle({
  titleElementId = 'dynamic-title',
  descElementId = 'dynamic-description',
  defaultTitle = 'Judul Postingan',
  defaultDesc = 'Deskripsi belum tersedia',
  titleSeparator = '-' // karakter pemisah yang biasa dipakai di title
} = {}) {
  let titleFromHead = document.title || defaultTitle;

  // Pisahkan title berdasarkan separator dan ambil bagian pertama sebagai judul postingan
  if (titleFromHead.includes(titleSeparator)) {
    titleFromHead = titleFromHead.split(titleSeparator)[0].trim();
  }

  const metaDescTag = document.querySelector('meta[name="description"]');
  const descFromHead = metaDescTag ? metaDescTag.getAttribute('content') : defaultDesc;

  const heroTitle = document.getElementById(titleElementId);
  const heroDesc = document.getElementById(descElementId);

  if (heroTitle) heroTitle.textContent = titleFromHead;
  if (heroDesc) heroDesc.textContent = descFromHead;
}

window.updatePostTitle = updatePostTitle;