// Pastikan hanya dideklarasikan sekali di global scope
if (!window.firebaseConfig) {
  window.firebaseConfig = {
    apiKey: "AIzaSyDtMdCf91Ihh-SlhoZHLV4Taxg2YPmks14",
    authDomain: "bima-akbar-web.firebaseapp.com",
    databaseURL: "https://bima-akbar-web-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bima-akbar-web",
    storageBucket: "bima-akbar-web.appspot.com",
    messagingSenderId: "521611265429",
    appId: "1:521611265429:web:9e6c64385b5abcbad6e29c"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(window.firebaseConfig);
  }
}

// Ambil statistik dari Firebase secara real-time
function updateStats() {
  try {
    const postsRef = firebase.database().ref('posts');
    const statsRef = firebase.database().ref('stats');

    // Ambil statistik dari database
    postsRef.on('value', (snapshot) => {
      const postsData = snapshot.val() || {};
      const posts = Object.values(postsData);

      const totalPosts = posts.length;
      const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);

      document.getElementById('total-posts').textContent = `${totalPosts} post`;
      document.getElementById('total-views').textContent = `${totalViews.toLocaleString()} view`;
    });

    // Ambil total members (followers) secara real-time
    statsRef.on('value', (snapshot) => {
      const statsData = snapshot.val();
      if (statsData) {
        document.getElementById('total-members').textContent = `${statsData.totalFollowers.toLocaleString()} member`;
      }
    });

  } catch (err) {
    console.error("Gagal memuat data stats dari Firebase:", err);
  }
}

// Jalankan fungsi updateStats
updateStats();
