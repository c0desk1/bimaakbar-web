// time.js

function timeSince(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now - past) / 1000);

  if (isNaN(seconds)) return ''; // Tanggal tidak valid
  if (seconds < 60) return 'Baru saja';
  if (seconds < 3600) return Math.floor(seconds / 60) + ' menit lalu';
  if (seconds < 86400) return Math.floor(seconds / 3600) + ' jam lalu';
  if (seconds < 604800) return Math.floor(seconds / 86400) + ' hari lalu';

  return past.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function updateTimes(scope = document) {
  const timeElements = scope.querySelectorAll('.post-time');
  timeElements.forEach(el => {
    const ts = el.getAttribute('data-timestamp');
    if (ts) {
      el.textContent = timeSince(ts);
    }
  });
}

// Buat global
window.timeSince = timeSince;
window.updateTimes = updateTimes;