function includeHTML() {
  var elements = document.querySelectorAll('[id$="-include"]');

  var promises = Array.from(elements).map(el => {
    var file = el.id.replace('-include', '') + '.html';

    // Hitung kedalaman folder untuk menentukan prefix relatif
    var depth = window.location.pathname.split('/').length - 2; 
    var prefix = depth > 0 ? '../'.repeat(depth) : ''; 

    var path = prefix + 'html/' + file; 
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
