async function loadCategoryLabels() {
  const container = document.getElementById('category-labels');
  if (!container) {
    console.warn('Elemen #category-labels tidak ditemukan.');
    return;
  }
  container.innerHTML = '';

  // Ganti dengan URL sheet label kamu (pastikan benar)
  const sheetId = '10fSdWnRM2rYLYfJufWl-IkBeul2CgZSoUmOaeneO8xk'; 
  const labelSheetUrl = `https://opensheet.elk.sh/${sheetId}/label`;

  try {
    const labelRes = await fetch(labelSheetUrl);
    if (!labelRes.ok) throw new Error('Gagal fetch sheet label');
    const labels = await labelRes.json();

    for (const label of labels) {
      const { name, title } = label;
      if (!name) continue;

      // URL sheet untuk kategori sesuai name (misal musik, game, shop)
      const categorySheetUrl = `https://opensheet.elk.sh/${sheetId}/${name}`;

      try {
        const catRes = await fetch(categorySheetUrl);
        if (!catRes.ok) throw new Error(`Gagal fetch sheet kategori ${name}`);
        const posts = await catRes.json();

        if (!posts.length) {
          console.warn(`Sheet kategori ${name} kosong`);
          continue;
        }

        // Cari latest post berdasar timestamp terbaru
        posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const latestPost = posts[0];

        const thumb = latestPost.thumbnail || '/assets/error.jpg';

        const card = document.createElement('a');
        card.href = `html/d/${name}.html`;
        card.className = 'category-card';
        card.style.backgroundImage = `url('${thumb}')`;
        card.innerHTML = `
          <div class="category-content">
            <h3>${title || name}</h3>
          </div>
        `;

        container.appendChild(card);

      } catch (catErr) {
        console.error(catErr);
      }
    }
  } catch (err) {
    console.error(err);
    container.innerHTML = '<p style="color:red;">Gagal memuat kategori.</p>';
  }
}

window.loadCategoryLabels = loadCategoryLabels;