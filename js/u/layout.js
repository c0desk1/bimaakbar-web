function includeHTML() {
  var elements = document.querySelectorAll('[id$="-include"]');

  var promises = Array.from(elements).map(el => {
    var file = el.id.replace('-include', '') + '.html';

    // Tentukan jumlah level direktori berdasarkan lokasi file saat ini
    var depth = window.location.pathname.split('/').length - 2; // Hitung kedalaman dari root
    var prefix = depth > 0 ? '../'.repeat(depth) : ''; // Menyesuaikan dengan kedalaman folder

    var path = prefix + 'html/' + file; // Menentukan path berdasarkan folder html
    console.log('Mencoba load:', path);

    return fetch(path)
      .then(res => {
        if (!res.ok) throw new Error('Gagal memuat ' + file);
        return res.text();
      })
      .then(html => {
        if (el) el.innerHTML = html;
      })
      .catch(err => {
        console.error(err);
        if (el) el.innerHTML = '<p style="color:red;">Error loading ' + file + '</p>';
      });
  });

  return Promise.all(promises).then(() => {
    console.log("Semua HTML selesai dimuat.");
  });
}

// Simpan fungsi di global agar bisa dipanggil di file lain
window.includeHTML = includeHTML;
