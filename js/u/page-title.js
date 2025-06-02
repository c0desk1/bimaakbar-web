function updatePageTitle() {
  const path = window.location.pathname.toLowerCase();
  const pageTitleElement = document.querySelector('h1.page-title');
  
  let judul = "Bima Akbar";

  if (path.includes("index")) {
    judul = "Beranda – Bima Akbar";
  } else if (path.includes("musik")) {
    judul = "Musik – Bima Akbar";
  } else if (path.includes("tips") || path.includes("trik")) {
    judul = "Tips & Trik – Bima Akbar";
  } else if (path.includes("tutorial")) {
    judul = "Tutorial – Bima Akbar";
  } else if (path.includes("game")) {
    judul = "Game – Bima Akbar";
  } else if (path.includes("shop")) {
    judul = "Shop – Bima Akbar";
  }

  document.title = judul;
  if (pageTitleElement) pageTitleElement.textContent = judul.split(' – ')[0]; // hanya kata sebelum –
}

window.updatePageTitle = updatePageTitle;