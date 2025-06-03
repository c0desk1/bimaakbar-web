function updatePageTitle() {
  const path = window.location.pathname.toLowerCase();
  const pageTitleElement = document.querySelector('h1.page-title');
  
  let judulHalaman = "Bima Akbar";

  if (path.includes("index")) {
    judulHalaman = "Beranda";
  } else if (path.includes("musik")) {
    judulHalaman = "Musik";
  } else if (path.includes("tips") || path.includes("trik")) {
    judulHalaman = "Tips & Trik";
  } else if (path.includes("tutorial")) {
    judulHalaman = "Tutorial";
  } else if (path.includes("game")) {
    judulHalaman = "Game";
  } else if (path.includes("shop")) {
    judulHalaman = "Shop";
  }

  // Jangan ubah document.title supaya judul postingan tetap bisa diatur secara terpisah
  if (pageTitleElement) pageTitleElement.textContent = judulHalaman;
}

window.updatePageTitle = updatePageTitle;