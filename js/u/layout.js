function includeHTML() {
  const elements = document.querySelectorAll('[id$="-include"]');
  const currentPath = window.location.pathname;
  const basePath =
    currentPath.includes('/html/d/') ? '../l/' :
    currentPath.includes('/html/l/') ? './' :
    'html/l/';

  const promises = Array.from(elements).map((el) => {
    const file = el.id.replace('-include', '') + '.html';
    const path = basePath + file;

    console.log('Mencoba load:', path);

    return fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat ' + file);
        return res.text();
      })
      .then((html) => {
        el.innerHTML = html;
      })
      .catch((err) => {
        console.error(err);
        el.innerHTML = '<p style="color:red;">Gagal memuat ' + file + '</p>';
      });
  });

  return Promise.all(promises).then(() => {
    console.log("Semua partial HTML selesai dimuat.");
  });
}