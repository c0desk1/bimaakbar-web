// Inisialisasi Firebase (hanya jika belum diinisialisasi)
const firebaseConfig = {
  apiKey: "AIzaSyDtMdCf91Ihh-SlhoZHLV4Taxg2YPmks14",
  authDomain: "bima-akbar-web.firebaseapp.com",
  databaseURL: "https://bima-akbar-web-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bima-akbar-web",
  storageBucket: "bima-akbar-web.appspot.com",
  messagingSenderId: "521611265429",
  appId: "1:521611265429:web:9e6c64385b5abcbad6e29c"
};

if (!firebase.apps?.length) {
  firebase.initializeApp(firebaseConfig);
}

// Fungsi ambil statistik
async function updateStats() {
  try {
    const snapshot = await firebase.database().ref('posts').once('value');
    const postsData = snapshot.val() || {};
    const posts = Object.values(postsData);

    const totalPosts = posts.length;
    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
    const totalMembers = 187; // Bisa dibuat dinamis nanti

    document.getElementById('total-posts').textContent = `${totalPosts} post`;
    document.getElementById('total-views').textContent = `${totalViews.toLocaleString()} view`;
    document.getElementById('total-members').textContent = `${totalMembers.toLocaleString()} member`;
  } catch (err) {
    console.error("Gagal memuat data stats dari Firebase:", err);
  }
}
