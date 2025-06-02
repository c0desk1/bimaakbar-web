// Fungsi untuk menghitung waktu relatif
function timeSince(dateString) {
  var now = new Date();
  var past = new Date(dateString);
  var seconds = Math.floor((now - past) / 1000);

  if (isNaN(seconds)) return ''; // Jika tanggal tidak valid
  if (seconds < 60) return 'Baru saja';
  if (seconds < 3600) return Math.floor(seconds / 60) + ' menit lalu';
  if (seconds < 86400) return Math.floor(seconds / 3600) + ' jam lalu';
  if (seconds < 604800) return Math.floor(seconds / 86400) + ' hari lalu';
  return past.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}
function updateTimes() {
        var timeEls = document.querySelectorAll('.post-time');
        for (var t = 0; t < timeEls.length; t++) {
          var ts = timeEls[t].getAttribute('data-timestamp');
          if (ts) {
            timeEls[t].textContent = timeSince(ts);
          }
        }
}
updateTimes();
setInterval(updateTimes, 60000);      
// Simpan fungsi di global agar bisa dipanggil di file lain
window.timeSince = timeSince;
window.updateTimes = updateTimes;