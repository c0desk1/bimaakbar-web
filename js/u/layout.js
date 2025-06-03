function includeHTML() {
  var elements = document.querySelectorAll('[id$="-include"]');

  var promises = Array.from(elements).map(el => {
    var file = el.id.replace('-include', '') + '.html';

    // Tentukan lokasi berdasarkan pathname
    var path;
    if (window.location.pathname.includes('/html/d/')) {
      path = 'html/d/' + file;
    } else if (window.location.pathname.includes('/html/l/')) {
      path = 'html/l/' + file;
    } else {
      path = 'html/' + file; // Default jika di root atau lokasi lain
    }

    console.log(`🔍 Mencoba load: ${path}`);

    return fetch(path)
      .then(res => {
        if (!res.ok) throw new Error(`❌ Gagal memuat ${file} (${res.status})`);
        return res.text();
      })
      .then(html => {
        if (el) el.innerHTML = html;
      })
      .catch(err => {
        console.error(err);
        if (el) el.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
      });
  });

  return Promise.all(promises).then(() => {
    console.log("✅ Semua HTML selesai dimuat.");
  });
}

// Simpan fungsi di global agar bisa dipanggil di file lain
window.includeHTML = includeHTML;
