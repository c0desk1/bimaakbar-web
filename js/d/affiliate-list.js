function renderAffiliateItems() {
    var affiliateList = document.getElementById('affiliate-list');
    if (!affiliateList) return;

    affiliateList.innerHTML = '';

    fetch('data/affiliate.json')
        .then(function(response) {
            if (!response.ok) throw new Error('Gagal memuat affiliate.json');
            return response.json();
        })
        .then(function(items) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var card = document.createElement('a');
                card.href = item.link;
                card.target = '_blank';
                card.className += ' affiliate-card';

                var img = document.createElement('img');
                img.src = item.image;
                img.alt = item.alt ? item.alt : 'Affiliate Item';
                img.loading = 'lazy';
                img.onerror = function() {
                    this.onerror = null;
                    this.src = 'null';
                };

                card.appendChild(img);
                affiliateList.appendChild(card);
            }
        })
        .catch(function(error) {
            console.error('Gagal memuat affiliate items:', error);
            affiliateList.innerHTML = '<p style="color:red;">Gagal memuat affiliate items.</p>';
        });
}

// Simpan fungsi ke global
window.renderAffiliateItems = renderAffiliateItems;