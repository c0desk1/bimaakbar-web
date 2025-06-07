function initHeaderEvents() {
    var sidebarToggle = document.querySelector('.sidebar-toggle');
    var sidebarClose = document.querySelector('.sidebar-close');
    var sidebar = document.querySelector('.sidebar');
    var body = document.body;

    if (sidebarToggle && sidebar && sidebarClose) {
        sidebarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (sidebar.className.indexOf('open') === -1) {
                sidebar.className += ' open';
            }
            if (body.className.indexOf('sidebar-open') === -1) {
                body.className += ' sidebar-open';
            }
        });

        sidebarClose.addEventListener('click', function() {
            sidebar.className = sidebar.className.replace(/\bopen\b/, '').trim();
            body.className = body.className.replace(/\bsidebar-open\b/, '').trim();
        });

        document.addEventListener('click', function(e) {
            if (
                sidebar.className.indexOf('open') !== -1 &&
                !sidebar.contains(e.target) &&
                !sidebarToggle.contains(e.target)
            ) {
                sidebar.className = sidebar.className.replace(/\bopen\b/, '').trim();
                body.className = body.className.replace(/\bsidebar-open\b/, '').trim();
            }
        });
    }
}

function initHeaderLogo() {
    const logoContainer = document.getElementById('logo-container');
    const pageTitle = document.querySelector('.page-title');
    if (!logoContainer || !pageTitle) return;

    const isIndexPage =
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/index.html');

    const currentTitle = document.title || 'Halaman';

    if (isIndexPage) {
        logoContainer.innerHTML = `
      <a href="/">
        <img src="assets/logo.png" alt="Logo" style="height: 32px;" />
      </a>
    `;
        pageTitle.textContent = currentTitle; // Judul seperti "Beranda"
    } else {
        pageTitle.innerHTML = `
      <button onclick="historyBack()" class="back-button" aria-label="Kembali">
        <i class="fas fa-arrow-left"></i>
      </button>
    `;
        logoContainer.textContent = currentTitle;
    }
}

function historyBack() {
    if (document.referrer && document.referrer !== location.href) {
        history.back();
    } else {
        window.location.href = '/';
    }
}
window.historyBack = historyBack;
window.initHeaderEvents = initHeaderEvents;
