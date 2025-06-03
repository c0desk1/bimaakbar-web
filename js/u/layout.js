function includeHTML() {
   var elements = document.querySelectorAll('[id$="-include"]');

   var promises = Array.from(elements).map(el => {
      var file = el.id.replace('-include', '') + '.html';

      // Ambil nama folder dari atribut `data-folder`
      var folder = el.dataset.folder || "default"; // Jika tidak ada, gunakan default

      // Tentukan path secara otomatis berdasarkan folder yang ditentukan
      var path;
      if (folder === "default") {
         path = "html/" + file; // Default untuk root
      } else {
         path = `html/${folder}/` + file; // Folder lain, misalnya "html/extra/"
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

window.includeHTML = includeHTML;
