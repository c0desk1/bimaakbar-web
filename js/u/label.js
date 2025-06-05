function loadCategoryLabels() {
    const container = document.getElementById('category-labels');
    if (!container) {
        console.warn('Elemen #category-labels tidak ditemukan.');
        return;
    }

    const labels = [
        { name: 'Musik', sheet: 'musik', url: 'html/d/musik.html' },
        { name: 'Game', sheet: 'game', url: 'html/d/game.html' },
        { name: 'Tutorial', sheet: 'tutorial', url: 'html/d/tutorial.html' },
        { name: 'Tips', sheet: 'tips', url: 'html/d/tips.html' },
        { name: 'Shop', sheet: 'shop', url: 'html/d/shop.html' },
    ];

    labels.forEach(label => {
        fetch(`https://opensheet.elk.sh/10fSdWnRM2rYLYfJufWl-IkBeul2CgZSoUmOaeneO8xk/${label.sheet}`)
            .then(res => res.json())
            .then(data => {
                const post = data[0]; // Ambil postingan terbaru
                const thumb = post.thumbnail || '/assets/error.jpg';

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