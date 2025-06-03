function updatePostTitle({
  titleElementId = 'dynamic-title',
  descElementId = 'dynamic-description',
  defaultTitle = 'Judul Postingan',
  defaultDesc = 'Deskripsi belum tersedia'
} = {}) {
  const metaTitleTag = document.querySelector('meta[name="post-title"]');
  const metaDescTag = document.querySelector('meta[name="post-description"]');

  const title = metaTitleTag ? metaTitleTag.getAttribute('content') : defaultTitle;
  const desc = metaDescTag ? metaDescTag.getAttribute('content') : defaultDesc;

  const heroTitle = document.getElementById(titleElementId);
  const heroDesc = document.getElementById(descElementId);

  if (heroTitle) heroTitle.textContent = title;
  if (heroDesc) heroDesc.textContent = desc;
}