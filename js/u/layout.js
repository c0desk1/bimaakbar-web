// Fungsi untuk menyertakan partial HTML
function includeHTML() {
  var elements = document.querySelectorAll('[id$="-include"]');

  var promises = Array.prototype.map.call(elements, function(el) {
    var file = el.id.replace('-include', '') + '.html';

    var path = window.location.pathname.indexOf('/partials/') !== -1
      ? '../partials/' + file
      : 'partials/' + file;

    console.log('Mencoba load:', path);

    return fetch(path)
      .then(function(res) {
        if (!res.ok) throw new Error('Gagal memuat ' + file);
        return res.text();
      })
      .then(function(html) {
        el.innerHTML = html;
      })
      .catch(function(err) {
        console.error(err);
        el.innerHTML = '<p style="color:red;">Error loading ' + file + '</p>';
      });
  });

  return Promise.all(promises).then(function() {
    console.log("Semua partial selesai dimuat.");
  });
}

// Simpan fungsi di global agar bisa dipanggil di file lain
window.includeHTML = includeHTML;