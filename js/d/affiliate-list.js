function renderAffiliateItems() {
    var affiliateList = document.getElementById('affiliate-list');
    if (!affiliateList) return;

    affiliateList.innerHTML = '';

    fetch('https://opensheet.elk.sh/1NiExGcDs8CxJUQDBG7EX-XT1N991a7pnhtIcUvjpjKQ/affiliate')
        .then(function(response) {
            if (!response.ok) throw new Error('Gagal memuat affiliate');
            return response.json();
        })
        .then(function(items) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var card = document.createElement('a');
                card.href = item.url;
                card.target = '_blank';
                card.className = 'affiliate-card';
                
                var imgDiv = document.createElement('div');
                var img = document.createElement('img');
                img.src = item.img;
                img.alt = item.alt ? item.alt : 'Affiliate Item';
                img.loading = 'lazy';
                img.onerror = function() {
                    this.onerror = null;
                    this.src = 'assets/error.jpg';
                };
 
                imgDiv.appendChild(img);
                card.appendChild(imgDiv);
                affiliateList.appendChild(card);
            }
        })
        .catch(function(error) {
            console.error('Gagal memuat affiliate items:', error);
            affiliateList.innerHTML = '<p style="color:red;">Gagal memuat affiliate items.</p>';
        });
}
window.renderAffiliateItems = renderAffiliateItems;
