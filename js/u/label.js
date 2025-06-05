function loadCategoryLabels() {
    const container = document.getElementById('category-labels');
    if (!container) {
        console.warn('Elemen #category-labels tidak ditemukan.');
        return;
    }

    const labels = [
        { name: 'musik', sheet: 'musik', url: 'html/d/musik.html', title: 'Musik' },
        { name: 'game', sheet: 'game', url: 'html/d/game.html', title: 'Game' },
        { name: 'tutorial', sheet: 'tutorial', url: 'html/d/tutorial.html', title: 'Tutorial' },
        { name: 'tips', sheet: 'tips', url: 'html/d/tips.html', title: 'Tips & Trik' },
        { name: 'shop', sheet: 'shop', url: 'html/d/shop.html', title: 'Shop' },
    ];

    labels.forEach(label => {
        fetch(`https://opensheet.elk.sh/10fSdWnRM2rYLYfJufWl-IkBeul2CgZSoUmOaeneO8xk/${label.sheet}`)
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data) || data.length === 0) {
                    console.warn(`❌ Data kosong untuk label: ${label.name}`);
                    return;
                }

                // Ambil postingan terbaru berdasarkan timestamp
                let latest = data[0];
                for (let i = 1; i < data.length; i++) {
                    const t1 = new Date(data[i].timestamp || 0).getTime();
                    const t2 = new Date(latest.timestamp || 0).getTime();
                    if (t1 > t2) latest = data[i];
                }

                const thumb = latest.thumbnail || '/assets/error.jpg';

                const card = document.createElement('a');
                card.href = label.url;
                card.className = 'category-card';
                card.style.backgroundImage = `url('${thumb}')`;
                card.innerHTML = `
                    <div class="category-content">
                        <h3>${label.title}</h3>
                    </div>
                `;

                container.appendChild(card);
            })
            .catch(err => {
                console.error(`Gagal mengambil thumbnail untuk ${label.name}`, err);
            });
    });
}

window.loadCategoryLabels = loadCategoryLabels;