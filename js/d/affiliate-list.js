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

                // Tambahan: Pembungkus gambar
                var imgDiv = document.createElement('div');
                imgDiv.className = 'affiliate-img';

                var img = document.createElement('img');
                img.src = item.img;
                img.alt = item.alt ? item.alt : 'Affiliate Item';
                img.loading = 'lazy';
                img.onerror = function() {
                    this.onerror = null;
                    this.src = 'assets/error.jpg';
                };
                img.style.width = "100%";
                img.style.height = "100%";
                img.style.objectFit = "cover";
                img.style.display = "block";

                imgDiv.appendChild(img);
                card.appendChild(imgDiv);

                // Label affiliate (opsional)
                if(item.alt) {
                    var label = document.createElement('div');
                    label.className = 'affiliate-label';
                    label.innerText = item.alt;
                    label.style.textAlign = "center";
                    label.style.fontSize = "14px";
                    label.style.marginTop = "8px";
                    card.appendChild(label);
                }

                affiliateList.appendChild(card);
            }
        })
        .catch(function(error) {
            console.error('Gagal memuat affiliate items:', error);
            affiliateList.innerHTML = '<p style="color:red;">Gagal memuat affiliate items.</p>';
        });
}
window.renderAffiliateItems = renderAffiliateItems;
