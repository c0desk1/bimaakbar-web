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

  var searchIconHeader = document.querySelector('.search-icon-header');
  var searchOverlay = document.querySelector('.search-overlay');
  var closeSearchOverlay = document.querySelector('.close-search-overlay');

  if (searchIconHeader && searchOverlay && closeSearchOverlay) {
    searchIconHeader.addEventListener('click', function(e) {
      e.stopPropagation();
      if (searchOverlay.className.indexOf('active') === -1) {
        searchOverlay.className += ' active';
      }
      if (body.className.indexOf('sidebar-open') === -1) {
        body.className += ' sidebar-open';
      }

      var input = searchOverlay.querySelector('input[type="text"]');
      if (input) input.focus();
    });

    closeSearchOverlay.addEventListener('click', function() {
      searchOverlay.className = searchOverlay.className.replace(/\bactive\b/, '').trim();
      body.className = body.className.replace(/\bsidebar-open\b/, '').trim();
    });

    searchOverlay.addEventListener('click', function(e) {
      if (e.target === searchOverlay) {
        searchOverlay.className = searchOverlay.className.replace(/\bactive\b/, '').trim();
        body.className = body.className.replace(/\bsidebar-open\b/, '').trim();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && searchOverlay.className.indexOf('active') !== -1) {
        searchOverlay.className = searchOverlay.className.replace(/\bactive\b/, '').trim();
        body.className = body.className.replace(/\bsidebar-open\b/, '').trim();
      }
    });
  }
}

function initHeaderLogo() {
  const logoContainer = document.getElementById('logo-container');
  if (!logoContainer) return;

  const isIndexPage =
    window.location.pathname === '/' ||
    window.location.pathname.endsWith('/index.html');

  if (isIndexPage) {
    logoContainer.innerHTML = `
      <a href="/">
        <img src="https://drive.google.com/file/d/1YqTO39Ty0Ll9U7G6bseSzE1eKCLxwTmb/view?usp=sharing" alt="Logo Blog Anda" />
      </a>
    `;
  } else {
    logoContainer.innerHTML = `
      <button onclick="history.back()" class="back-button" aria-label="Kembali">
        <i class="fas fa-arrow-left"></i>
      </button>
    `;
  }
}

// Simpan fungsi di global agar bisa dipanggil di file lain
window.initHeaderEvents = initHeaderEvents;
