var categories = [
  { name: "musik", title: "Musik" },
  { name: "tutorial", title: "Tutorial" },
  { name: "tips", title: "Tips & Trik" },
  { name: "game", title: "Game" },
  { name: "shop", title: "Shop" }
];

function loadCategoriesForIndex() {
  var categoryGrid = document.querySelector('.category-grid');
  if (!categoryGrid) return;

  categoryGrid.innerHTML = '<div class="loading-spinner">Memuat...</div>';

  var promises = categories.map(function(cat) {
    return fetch('https://opensheet.elk.sh/1ES0oKihVPw3LVwnFtlquFNltyIFvEImL-4gy-5fw2bA/label')
      .then(function(res) {
        if (!res.ok) throw new Error('Gagal fetch data kategori ' + cat.name);
        return res.json();
      })
      .then(function(json) {
        var latestPost = json.posts && json.posts.length > 0 ? json.posts[0] : null;

        var card = document.createElement('a');
        card.className = 'category-card';
        card.href = 'html/d/' + cat.name + '.html';
        card.innerHTML =
          '<img src="' + (latestPost && latestPost.thumbnail ? latestPost.thumbnail : 'assets/default-thumb.jpg') + '" ' +
          'alt="' + (latestPost && latestPost.title ? latestPost.title : cat.title) + '" ' +
          'loading="lazy" onerror="this.onerror=null;this.src=\'assets/default-thumb.jpg\';">' +
          '<h3>' + cat.title + '</h3>';
        return card;
      })
      .catch(function(err) {
        console.error('Gagal load kategori: ' + cat.name, err);
        return null;
      });
  });

  Promise.all(promises).then(function(cards) {
    categoryGrid.innerHTML = '';
    cards.forEach(function(card) {
      if (card) categoryGrid.appendChild(card);
    });
  });
}

window.loadCategoriesForIndex = loadCategoriesForIndex;