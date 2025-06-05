function loadCategoryLabels() {
    const container = document.getElementById('category-labels');
    if (!container) {
        console.warn('Elemen #category-labels tidak ditemukan.');
        return;
    }

    // URL ke sheet 'label' untuk daftar semua kategori
    const labelSheetURL = 'https://opensheet.elk.sh/1ES0oKihVPw3LVwnFtlquFNltyIFvEImL-4gy-5fw2bA/label';

    fetch(labelSheetURL)
        .then(res => res.json())
        .then(labels => {
            labels.forEach(label => {
                const sheetName = label.name;
                const title = label.title || label.name;
                const url = `html/d/${sheetName}.html`;

                // Fetch postingan dari masing-masing sheet
                fetch(`https://opensheet.elk.sh/1ES0oKihVPw3LVwnFtlquFNltyIFvEImL-4gy-5fw2bA/${sheetName}`)
                    .then(res => res.json())
                    .then(posts => {
                        if (!posts.length) return;

                        const latest = posts[0];
                        const thumbnail = latest.thumbnail || '/assets/error.jpg';

                        const card = document.createElement('a');
                        card.href = url;
                        card.className = 'category-card';
                        card.style.backgroundImage = `url('${thumbnail}')`;

                        card.innerHTML = `
                            <div class="category-content">
                                <h3>${title}</h3>
                            </div>
                        `;

                        container.appendChild(card);
                    })
                    .catch(err => {
                        console.warn(`Gagal mengambil data sheet '${sheetName}'`, err);
                    });
            });
        })
        .catch(err => {
            console.error('Gagal mengambil daftar label:', err);
        });
}
window.loadCategoryLabels = loadCategoryLabels;