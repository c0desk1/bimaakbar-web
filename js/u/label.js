var spreadsheetURL = "https://docs.google.com/spreadsheets/d/1ES0oKihVPw3LVwnFtlquFNltyIFvEImL-4gy-5fw2bA/gviz/tq?tqx=out:json";

function loadCategoriesForIndex() {
  var categoryGrid = document.querySelector('.category-grid');
  if (!categoryGrid) return;

  categoryGrid.innerHTML = '<div class="loading-spinner">Loading...</div>';

  fetch(spreadsheetURL)
    .then(res => res.text())
    .then(text => {
      var jsonText = text.substring(47, text.length - 2);
      var data = JSON.parse(jsonText);
      var rows = data.table.rows;

      var categories = rows.map(row => ({
        name: row.c[0].v.toLowerCase(),
        title: row.c[1].v,
        thumbnail: row.c[2] ? row.c[2].v : "assets/default-thumb.jpg" // Menambahkan gambar dari spreadsheet
      }));

      categoryGrid.innerHTML = '';
      categories.forEach(cat => {
        var card = document.createElement('a');
        card.className = 'category-card';
        card.href = 'html/d/' + cat.name + '-list.html';
        card.innerHTML =
          `<img src="${cat.thumbnail}" 
            alt="${cat.title}" 
            loading="lazy" onerror="this.onerror=null;this.src='assets/default-thumb.jpg';">
          <h3>${cat.title}</h3>`;

        categoryGrid.appendChild(card);
      });
    })
    .catch(err => console.error("Gagal fetch data dari Google Spreadsheet", err));
}

window.loadCategoriesForIndex = loadCategoriesForIndex;
