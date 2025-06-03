function renderAffiliateItems() {
  const affiliateList = document.getElementById('affiliate-list');
  if (!affiliateList) return;

  affiliateList.innerHTML = '';

  fetch('https://opensheet.elk.sh/1NiExGcDs8CxJUQDBG7EX-XT1N991a7pnhtIcUvjpjKQ/affiliate-list')
    .then(response => {
      if (!response.ok) throw new Error('Gagal memuat affiliate');
      return response.json();
    })
    .then(items => {
      items.forEach(item => {
        const card = document.createElement('a');
        card.href = item.url;
        card.target = '_blank';
        card.className = 'affiliate-card';

        // Debug: cek URL gambar di konsol
        console.log('Gambar:', item.image);

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.alt || 'Affiliate Item';
        img.loading = 'lazy';

        // Pasang event listener untuk menangani error pada image dengan fallback URL
        img.addEventListener('error', function handleImageError() {
          img.removeEventListener('error', handleImageError);
          
        });

        card.appendChild(img);
        affiliateList.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Gagal memuat affiliate items:', error);
    });
}

window.renderAffiliateItems = renderAffiliateItems;
