function loadLatestPopularPost() {
    var SHEET_URL = 'https://opensheet.elk.sh/1SIruB6QAkFD35FeCcyY_lesfe5M7QuhKIyRT9o41UNk/post';
    var postsPerPage = 5;

    var allPosts = [];
    var latestPosts = [];
    var popularPosts = [];
    var latestPage = 1;
    var popularPage = 1;

    function formatTime(timestamp) {
        if (!timestamp) return '';
        var diff = Date.now() - new Date(timestamp).getTime();
        if (diff < 0) return 'Baru saja';

        var seconds = Math.floor(diff / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        if (days > 1) return days + ' hari lalu';
        if (days === 1) return '1 hari lalu';
        if (hours > 1) return hours + ' jam lalu';
        if (hours === 1) return '1 jam lalu';
        if (minutes > 1) return minutes + ' menit lalu';
        if (minutes === 1) return '1 menit lalu';
        return 'Baru saja';
    }

    function createPostElement(post) {
        const el = document.createElement('div');
        el.className = 'post-grid';

        const link = document.createElement('a');
        link.href = post.url || post.link || '#';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'post-card';

        // === Thumbnail (Kiri) ===
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.className = 'post-thumbnail';

        const img = document.createElement('img');
        img.src = post.thumbnail || '/assets/error.jpg';
        img.alt = post.title || '';
        img.loading = 'lazy';
        img.onerror = () => (img.src = '/assets/error.jpg');

        thumbnailDiv.appendChild(img);
        link.appendChild(thumbnailDiv);

        // === Konten Utama (Tengah) ===
        const contentDiv = document.createElement('div');
        contentDiv.className = 'post-content';
        contentDiv.style.flex = '1';

        const title = document.createElement('h3');
        title.className = 'post-title';
        title.textContent = post.title || 'Tanpa Judul';

        const desc = document.createElement('p');
        desc.className = 'post-description';
        desc.textContent = post.description || '';

        const hashtagsDiv = document.createElement('div');
        hashtagsDiv.className = 'post-hashtags';
        const hashtags = (post.hashtags || '')
            .split(',')
            .map(tag => tag.trim())
            .filter((tag, index, self) => tag && self.indexOf(tag) === index)
            .map(tag => `#${tag}`)
            .join(' ');

        hashtagsDiv.textContent = hashtags;

        contentDiv.appendChild(hashtagsDiv);
        contentDiv.appendChild(title);
        contentDiv.appendChild(desc);
        link.appendChild(contentDiv);

        // === Meta Info ===
        const rightDiv = document.createElement('div');
        rightDiv.className = 'post-meta';


        const label = document.createElement('div');
        label.className = 'post-label';
        label.textContent = post.label || '';

        const time = document.createElement('div');
        time.className = 'post-time';
        time.setAttribute('data-timestamp', post.timestamp);
        time.innerHTML = `<i class="fa fa-clock-o"></i> ${formatTime(post.timestamp)}`;

        rightDiv.appendChild(label);
        rightDiv.appendChild(time);
        link.appendChild(rightDiv);

        el.appendChild(link);
        return el;
    }


    function renderPaginationButtons(type, totalPosts, currentPage) {
        var containerId = type === 'latest' ? 'latest-posts' : 'popular-posts';
        var container = document.getElementById(containerId);
        if (!container) return;

        var oldPrev = container.querySelector('.load-prev-btn-' + type);
        if (oldPrev) oldPrev.parentNode.removeChild(oldPrev);
        var oldNext = container.querySelector('.load-next-btn-' + type);
        if (oldNext) oldNext.parentNode.removeChild(oldNext);

        var totalPages = Math.ceil(totalPosts / postsPerPage);

        if (currentPage > 1) {
            var btnPrev = document.createElement('button');
            btnPrev.className = 'load-more-btn load-prev-btn-' + type;
            btnPrev.textContent = 'Sebelumnya';
            btnPrev.onclick = function() {
                if (type === 'latest') {
                    latestPage--;
                    renderPosts('latest');
                } else {
                    popularPage--;
                    renderPosts('popular');
                }
            };
            container.appendChild(btnPrev);
        }

        if (currentPage < totalPages) {
            var btnNext = document.createElement('button');
            btnNext.className = 'load-more-btn load-next-btn-' + type;
            btnNext.textContent = 'Selanjutnya';
            btnNext.onclick = function() {
                if (type === 'latest') {
                    latestPage++;
                    renderPosts('latest');
                } else {
                    popularPage++;
                    renderPosts('popular');
                }
            };
            container.appendChild(btnNext);
        }
    }

    function renderPosts(type) {
        var containerId = type === 'latest' ? 'latest-posts' : 'popular-posts';
        var container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        var posts = type === 'latest' ? latestPosts : popularPosts;
        var page = type === 'latest' ? latestPage : popularPage;

        var start = (page - 1) * postsPerPage;
        var end = start + postsPerPage;
        var postsToShow = posts.slice(start, end);

        for (var i = 0; i < postsToShow.length; i++) {
            var postEl = createPostElement(postsToShow[i]);
            container.appendChild(postEl);
        }

        renderPaginationButtons(type, posts.length, page);
    }

    function fetchAllPosts(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', SHEET_URL, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        var posts = JSON.parse(xhr.responseText);
                        callback(posts);
                    } catch (e) {
                        console.error('Parse JSON gagal', e);
                        callback([]);
                    }
                } else {
                    console.error('Fetch gagal status:', xhr.status);
                    callback([]);
                }
            }
        };
        xhr.send();
    }

    fetchAllPosts(function(posts) {
        allPosts = posts || [];

        latestPosts = allPosts
            .filter(function(p) { return p.timestamp && !isNaN(Date.parse(p.timestamp)); })
            .sort(function(a, b) { return new Date(b.timestamp) - new Date(a.timestamp); });

        popularPosts = allPosts
            .filter(function(p) { return p.views && !isNaN(parseInt(p.views)); })
            .sort(function(a, b) { return parseInt(b.views) - parseInt(a.views); });

        latestPage = 1;
        popularPage = 1;

        renderPosts('latest');
        renderPosts('popular');
    });
}
if (typeof renderPosts === "function") {
    renderPosts('latest');
    renderPosts('popular');
}
