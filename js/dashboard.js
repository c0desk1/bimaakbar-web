const firebaseConfig = {
	apiKey: "AIzaSyDtMdCf91Ihh-SlhoZHLV4Taxg2YPmks14",
	authDomain: "bima-akbar-web.firebaseapp.com",
	databaseURL: "https://bima-akbar-web-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "bima-akbar-web",
	storageBucket: "bima-akbar-web.appspot.com",
	messagingSenderId: "521611265429",
	appId: "1:521611265429:web:9e6c64385b5abcbad6e29c"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
// --- End Firebase Configuration ---

// --- Global Elements ---
const mainContent = document.getElementById('mainContent');
const loadingOverlay = document.getElementById('loadingOverlay');
const body = document.body;
const userNameDisplayMobile = document.getElementById('pageTitle').textContent = "Dashboard";
let activeUserEmailPart = 'Admin'; // To store user email part for dynamic greeting
let myChart; // Global variable to hold the Chart.js instance for post views
let myCategoryChart; // Global variable to hold the Chart.js instance for category views
let editingPostId = null;

const headerStatPosts = document.getElementById('headerStatPosts');

const headerStatViews = document.getElementById('headerStatViews');

// --- End Global Elements ---



// --- Logout Function ---
const logout = () => {
	auth.signOut()
		.then(() => {
			window.location.href = 'login.html';
		})
		.catch((error) => {
			alert(`Gagal logout: ${error.message}`);
		});
};



// Function to update server time (client-side time for demonstration)

const updateServerTime = () => {

	const now = new Date();

	const options = {

		weekday: 'long',

		year: 'numeric',

		month: 'long',

		day: 'numeric',

		hour: '2-digit',

		minute: '2-digit',

		second: '2-digit',

		timeZoneName: 'short',

		timeZone: 'Asia/Jakarta'

	};

	const serverTimeElement = document.getElementById('serverTime');

	if (serverTimeElement) {

		serverTimeElement.textContent = now.toLocaleString('id-ID', options);

	}

};



// --- Auth State Change Listener for Dashboard (PENTING UNTUK PROTEKSI) ---

auth.onAuthStateChanged((user) => {

	if (!user) {

		window.location.href = 'login.html';

	} else {

		activeUserEmailPart = user.email ? user.email.split('@')[0] : 'Admin';

		// Load initial content based on URL or default

		const urlParams = new URLSearchParams(window.location.search);

		const initialPage = urlParams.get('page') || 'dashboard';

		const initialTargetId = `${initialPage}Section`;

		loadContent(initialTargetId); // Panggil loadContent setelah user terautentikasi



		// Hide loading overlay with fade-out

		loadingOverlay.classList.add('hidden');

		loadingOverlay.addEventListener('transitionend', function handler() {

			loadingOverlay.style.display = 'none';

			body.classList.remove('loading-dashboard');

			loadingOverlay.removeEventListener('transitionend', handler);

		}, {

			once: true

		});



		// Update last login time in database (optional, but good for tracking)

		database.ref(`BimaAkbar/users/${user.uid}`).update({ //
			lastLogin: firebase.database.ServerValue.TIMESTAMP
		});


		// Log activity for successful login (only when dashboard is loaded)

		database.ref('BimaAkbar/login_activities').push({ //
			userId: user.uid,
			message: `Berhasil login ke dashboard: ${user.email}`,
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			type: 'login'
		});


		// Initialize header stats listener

		initHeaderStats();

	}

});



// --- Content Loading & Initialization Logic (MODULARIZED) ---

const navLinks = document.querySelectorAll('.nav-link');

const contentSections = document.querySelectorAll('.content-section');



// Object to store active Firebase listener references

const activeFirebaseListeners = {};



// Function to stop all active Firebase listeners for a specific section

function stopSectionListeners(sectionId) {

	if (activeFirebaseListeners[sectionId]) {

		activeFirebaseListeners[sectionId].forEach(listener => {

			if (listener.ref && listener.eventType && listener.callback) {

				listener.ref.off(listener.eventType, listener.callback);

			}

		});

		activeFirebaseListeners[sectionId] = []; // Clear listeners for this section

	}

}



// Helper to register a Firebase listener

function registerListener(sectionId, path, eventType, callback) {

	const ref = database.ref(`BimaAkbar/${path}`); //
	ref.on(eventType, callback);

	if (!activeFirebaseListeners[sectionId]) {

		activeFirebaseListeners[sectionId] = [];

	}

	activeFirebaseListeners[sectionId].push({

		ref, // Store the reference

		path,

		eventType,

		callback

	});

	return ref; // Return ref if needed for specific detach later

}



function loadContent(targetSectionId) {

	// Stop listeners from ALL previously active sections

	Object.keys(activeFirebaseListeners).forEach(sectionId => {

		stopSectionListeners(sectionId);

	});

	// Stop global dashboard interval

	if (window.serverTimeInterval) {

		clearInterval(window.serverTimeInterval);

		window.serverTimeInterval = null; // Clear reference

	}

	// Destroy Chart.js instances if they exist

	if (myChart) {

		myChart.destroy();

		myChart = null;

	}

	if (myCategoryChart) {

		myCategoryChart.destroy();

		myCategoryChart = null;

	}



	// Sembunyikan semua section

	contentSections.forEach(section => {

		section.style.display = 'none';

	});



	// Tampilkan section yang ditargetkan

	const targetSection = document.getElementById(targetSectionId);

	if (targetSection) {

		targetSection.style.display = 'block';

	}



	// Perbarui kelas 'active' untuk semua elemen navigasi

	navLinks.forEach(item => item.classList.remove('active'));

	const currentLink = document.querySelector(`.nav-link[data-target="${targetSectionId}"]`);

	if (currentLink) {

		currentLink.classList.add('active');

	}

	console.log('Target Section ID:', targetSectionId);



	// Panggil fungsi inisialisasi spesifik untuk section yang aktif

	switch (targetSectionId) {

		case 'dashboardSection':

			initDashboardSection();

			break;

		case 'postStatsSection':

			initPostStatsSection();

			break;

		case 'addPostSection':

			initAddPostSection();

			break;

		case 'postListSection':

			initPostListSection();

			break;

		case 'settingsSection':

			initSettingsSection();

			break;

		default:

			// Fallback or error handling

			console.warn(`Unknown section ID: ${targetSectionId}`);

			break;

	}



	// Update URL tanpa reload (untuk riwayat browser)

	history.pushState(null, '', `dashboard.html?page=${targetSectionId.replace('Section', '')}`);

}



// --- Header Stats (New Feature) ---

function initHeaderStats() {

	const postsRef = database.ref('BimaAkbar/posts'); //
	
	// Listener for total posts and total views

	registerListener('headerStats', 'posts', 'value', (snapshot) => {

		const posts = snapshot.val();

		let postCount = 0;

		let totalViews = 0;

		if (posts) {

			postCount = Object.keys(posts).length;

			Object.values(posts).forEach(post => {

				totalViews += (post.views || 0);

			});

		}

		if (headerStatPosts) headerStatPosts.textContent = `${postCount} Post`;

		if (headerStatViews) headerStatViews.textContent = `${totalViews.toLocaleString('id-ID')} Views`;

	});

}



// --- Initialization Functions for Each Section ---



function initDashboardSection() {

	// Update greeting for the dynamically loaded dashboard content

	const dynamicGreetingH1 = document.getElementById("greeting-text-dynamic");

	if (dynamicGreetingH1) {

		dynamicGreetingH1.textContent = `Halo, ${activeUserEmailPart}.`;

	}



	// Update server time

	updateServerTime();

	window.serverTimeInterval = setInterval(updateServerTime, 1000);



	// Update "Last Updated" timestamp

	const lastUpdatedDashboard = document.getElementById('lastUpdatedDashboard');

	if (lastUpdatedDashboard) {

		const now = new Date();

		const options = {

			year: 'numeric',

			month: 'long',

			day: 'numeric',

			hour: '2-digit',

			minute: '2-digit'

		};

		lastUpdatedDashboard.textContent = now.toLocaleString('id-ID', options);

	}



	// Update Firebase Project ID

	const firebaseProjectIdElement = document.getElementById('firebaseProjectId');

	if (firebaseProjectIdElement) {

		firebaseProjectIdElement.textContent = firebaseConfig.projectId;

	}



	// Inisialisasi elemen statistik dan daftar

	const statCardViewsElement = document.getElementById('statCardViews');

	const statValueViews = statCardViewsElement;



	const statCardPostsElement = document.getElementById('statCardPosts');

	const statValuePosts = statCardPostsElement;



	const statCardCommentsElement = document.getElementById('statCardComments');

	const statValueComments = statCardCommentsElement;



	const statCardCategoriesElement = document.getElementById('statCardCategories');

	const statValueCategories = statCardCategoriesElement;



	const topPostsList = document.getElementById('topPostsList');

	const latestPostsList = document.getElementById('latestPostsList');

	const loginActivityList = document.getElementById('loginActivityList');



	const updateStatCard = (valueElement, data) => {

		if (valueElement) {

			valueElement.textContent = (data !== null && data !== undefined) ? data.toLocaleString('id-ID') : '0';

		}

	};



	// Firebase data listeners for dashboard content

	// Stats Listener (Posts & Views)

	if (statValueViews && statValuePosts) {

		registerListener('dashboardSection', 'posts', 'value', (snapshot) => { //
			const posts = snapshot.val();

			let totalViews = 0;

			let postCount = 0;

			if (posts) {

				postCount = Object.keys(posts).length;

				Object.values(posts).forEach(post => {

					totalViews += (post.views || 0);

				});

			}

			updateStatCard(statValueViews, totalViews);

			updateStatCard(statValuePosts, postCount);

		});

	}



	// Comments Listener

	if (statValueComments) {

		registerListener('dashboardSection', 'comments', 'value', (snapshot) => { //
			const comments = snapshot.val();

			updateStatCard(statValueComments, comments ? Object.keys(comments).length : 0);

		});

	}



	// Categories Listener

	if (statValueCategories) {

		registerListener('dashboardSection', 'categories', 'value', (snapshot) => { //
			const categories = snapshot.val();

			updateStatCard(statValueCategories, categories ? Object.keys(categories).length : 0);

		});

	}



	// Top Posts Listener (Adding Comments & Status)

	if (topPostsList) {

		registerListener('dashboardSection', 'posts', 'value', (snapshot) => { //
			const posts = snapshot.val();

			topPostsList.innerHTML = '';

			if (posts) {

				const postsArray = Object.keys(posts).map(key => ({

					id: key,

					...posts[key]

				}));

				postsArray.sort((a, b) => b.views - a.views); // Sort by views descending

				const top5Posts = postsArray.slice(0, 5); // Take top 5



				if (top5Posts.length > 0) {

					top5Posts.forEach(post => {

						const li = document.createElement('li');

						const postDate = new Date(post.timestamp).toLocaleDateString('id-ID', {

							year: 'numeric',

							month: 'short',

							day: 'numeric'

						});

						// Fetch comment count for this post (this is a simplified approach,

						// a more efficient way would be to denormalize comment counts in post data)

						let commentCount = 0;

						database.ref('BimaAkbar/comments').orderByChild('postId').equalTo(post.id).once('value', commentSnap => { //
							commentCount = commentSnap.exists() ? Object.keys(commentSnap.val()).length : 0;



							let statusText = post.status === 'published' ? 'Publikasi' : (post.status === 'scheduled' ? 'Terjadwal' : 'Draf');

							if (post.status === 'scheduled' && post.scheduledTimestamp && new Date(post.scheduledTimestamp) < new Date()) {

								statusText = 'Terjadwal (Terlewat)';

							}



							li.innerHTML = `

								<div class="post-details">

									<span class="post-title">${post.title || 'Judul Tidak Ada'}</span>

									<div class="post-meta">

										<span>Kategori: ${post.category || 'Belum ada'}</span>

										<span>&bull; Status: ${statusText}</span>

										<span>&bull; Komentar: ${commentCount}</span>

										<span>&bull; ${postDate}</span>

									</div>

								</div>

								<div class="post-stats">

									<div class="stat-value">${(post.views || 0).toLocaleString('id-ID')}</div>

									<div class="stat-label">Views</div>

								</div>

							`;

							topPostsList.appendChild(li); // Append after comments are fetched

						});

					});

				} else {

					topPostsList.innerHTML = '<li style="text-align: center; color: #8E8E93;">Belum ada postingan teratas.</li>';

				}

			} else {

				topPostsList.innerHTML = '<li style="text-align: center; color: #8E8E93">Belum ada postingan teratas.</li>';

			}

		});

	}



	// Latest Posts Listener

	if (latestPostsList) {

		registerListener('dashboardSection', 'posts', 'value', (snapshot) => { //
			const posts = snapshot.val();

			latestPostsList.innerHTML = '';

			if (posts) {

				const postsArray = Object.keys(posts).map(key => ({

					id: key,

					...posts[key]

				}));

				postsArray.sort((a, b) => b.timestamp - a.timestamp); // Sort by latest timestamp descending

				const latest5Posts = postsArray.slice(0, 5); // Take latest 5



				if (latest5Posts.length > 0) {

					latest5Posts.forEach(post => {

						const li = document.createElement('li');

						const postDate = new Date(post.timestamp).toLocaleDateString('id-ID', {

							year: 'numeric',

							month: 'short',

							day: 'numeric'

						});

						let statusText = post.status === 'published' ? 'Publikasi' : (post.status === 'scheduled' ? 'Terjadwal' : 'Draf');

						if (post.status === 'scheduled' && post.scheduledTimestamp && new Date(post.scheduledTimestamp) < new Date()) {

							statusText = 'Terjadwal (Terlewat)';

						}
						
						// Added `editPost` and `viewPost` functions
						li.innerHTML = `
							<div>
								<span class="item-title">${post.title || 'Judul Tidak Ada'}</span>
								<div class="item-meta">
									<span>Kategori: ${post.category || 'Belum ada'}</span>
									<span>&bull; Status: ${statusText}</span>
									${post.scheduledTimestamp ? `<span>&bull; Jadwal: ${new Date(post.scheduledTimestamp).toLocaleString('id-ID')}</span>` : ''}
									<span>&bull; ${postDate}</span>
								</div>
							</div>
							<div class="actions">
								<button onclick="editPost('${post.id}')"><ion-icon name="create"></ion-icon> Edit</button>
								<button onclick="viewPost('${post.slug || post.id}')"><ion-icon name="eye"></ion-icon> Lihat</button>
							</div>
						`;

						latestPostsList.appendChild(li);

					});

				} else {

					latestPostsList.innerHTML = '<li style="text-align: center; color: #8E8E93">Belum ada postingan terbaru.</li>';

				}

			} else {

				latestPostsList.innerHTML = '<li style="text-align: center; color: #8E8E93">Belum ada postingan terbaru.</li>';

			}

		});

	}



	// Login Activity Listener

	if (loginActivityList) {

		registerListener('dashboardSection', 'login_activities', 'value', (snapshot) => { //
			const activities = snapshot.val();

			loginActivityList.innerHTML = '';

			if (activities) {

				const activitiesArray = Object.keys(activities).map(key => ({

					id: key,

					...activities[key]

				}));

				activitiesArray.sort((a, b) => b.timestamp - a.timestamp); // Sort by latest timestamp descending

				const latest5Activities = activitiesArray.slice(0, 5); // Take latest 5



				if (latest5Activities.length > 0) {

					latest5Activities.forEach(activity => {

						const li = document.createElement('li');

						const activityTime = new Date(activity.timestamp).toLocaleString('id-ID', {

							year: 'numeric',

							month: 'short',

							day: 'numeric',

							hour: '2-digit',

							minute: '2-digit'

						});

						li.classList.add('activity-item');

						li.innerHTML = `

							<span class="log-time">${activityTime}</span>

							<span class="log-message">${activity.message}</span>

						`;

						loginActivityList.appendChild(li);

					});

				} else {

					loginActivityList.innerHTML = '<li style="text-align: center; color: #8E8E93">Belum ada aktivitas login.</li>';

				}

			} else {

				loginActivityList.innerHTML = '<li style="text-align: center; color: #8E8E93">Belum ada aktivitas login.</li>';

			}

		});

	}

}



function initPostStatsSection() {

	console.log('Menginisialisasi Statistik Postingan...');

	stopSectionListeners('postStatsSection'); // Stop any previous listeners specific to this section



	const statFilterCategory = document.getElementById('statFilterCategory');

	const postViewsChartCtx = document.getElementById('postViewsChart').getContext('2d');

	const categoryViewsChartCtx = document.getElementById('categoryViewsChart').getContext('2d');

	const chartViewsMessage = document.getElementById('chartViewsMessage');

	const chartCategoryViewsMessage = document.getElementById('chartCategoryViewsMessage');

	const topMonthlyPostsList = document.getElementById('topMonthlyPostsList');

	const mostActiveCategoriesList = document.getElementById('mostActiveCategoriesList');





	chartViewsMessage.style.display = 'block';

	chartViewsMessage.textContent = 'Memuat data grafik Views Postingan...';

	chartCategoryViewsMessage.style.display = 'block';

	chartCategoryViewsMessage.textContent = 'Memuat data grafik Views per Kategori...';

	topMonthlyPostsList.innerHTML = '<li style="text-align: center; color: #8E8E93">Memuat postingan...</li>';

	mostActiveCategoriesList.innerHTML = '<li style="text-align: center; color: #8E8E93">Memuat kategori...</li>';



	if (myChart) myChart.destroy();

	if (myCategoryChart) myCategoryChart.destroy();



	const updateChartsAndStats = (filterCategory = 'all') => {

		registerListener('postStatsSection', 'posts', 'value', (snapshot) => { //
			const posts = snapshot.val();

			let postLabels = [];

			let postViewsData = [];

			let totalMonthlyViews = 0;

			let popularPostTitle = 'N/A';

			let maxViews = -1;

			
			let categoryViews = {}; // For category views chart

			let categoryPostCounts = {}; // For most active categories



			const now = new Date();

			const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();



			if (posts) {

				const postsArray = Object.keys(posts).map(key => ({ id: key, ...posts[key] }));

				let monthlyPosts = [];



				postsArray.forEach(post => {

					// Calculate monthly views

					const postTimestamp = post.timestamp;

					if (postTimestamp && postTimestamp >= firstDayOfMonth) {

						totalMonthlyViews += (post.views || 0);

						monthlyPosts.push(post);

					}



					// Prepare data for individual post views chart (filtered by category)

					if (filterCategory === 'all' || post.category === filterCategory) {

						postLabels.push(post.title || `Post ${post.id.substring(0, 5)}`);

						postViewsData.push(post.views || 0);

						if ((post.views || 0) > maxViews) {

							maxViews = (post.views || 0);

							popularPostTitle = post.title || 'N/A';

						}

					}



					// Accumulate views per category for category views chart

					if (post.category) {

						categoryViews[post.category] = (categoryViews[post.category] || 0) + (post.views || 0);

						categoryPostCounts[post.category] = (categoryPostCounts[post.category] || 0) + 1;

					}

				});

				
				// Sort individual post data for chart readability

				const sortedPostData = postLabels.map((label, index) => ({

					label: label,

					views: postViewsData[index]

				})).sort((a, b) => b.views - a.views);



				postLabels = sortedPostData.map(item => item.label);

				postViewsData = sortedPostData.map(item => item.views);



				// Render Top 3 Monthly Posts

				monthlyPosts.sort((a, b) => b.views - a.views);

				const top3Monthly = monthlyPosts.slice(0, 3);

				topMonthlyPostsList.innerHTML = '';

				if (top3Monthly.length > 0) {

					top3Monthly.forEach(post => {

						const li = document.createElement('li');

						li.innerHTML = `

							<div class="post-details">

								<span class="post-title">${post.title || 'Judul Tidak Ada'}</span>

								<div class="post-meta">

									<span>Views: ${(post.views || 0).toLocaleString('id-ID')}</span>

									<span>&bull; Kategori: ${post.category || 'Belum ada'}</span>

								</div>

							</div>

						`;

						topMonthlyPostsList.appendChild(li);

					});

				} else {

					topMonthlyPostsList.innerHTML = '<li style="text-align: center; color: #8E8E93">Belum ada postingan bulan ini.</li>';

				}



				// Render Most Active Categories

				const sortedCategories = Object.keys(categoryPostCounts).map(key => ({

					name: key,

					count: categoryPostCounts[key]

				})).sort((a, b) => b.count - a.count);

				
				const top3Categories = sortedCategories.slice(0, 3);

				mostActiveCategoriesList.innerHTML = '';

				if (top3Categories.length > 0) {

					top3Categories.forEach(cat => {

						const li = document.createElement('li');

						li.innerHTML = `

							<div>

								<span class="item-title">${cat.name}</span>

								<div class="item-meta">

									<span>Jumlah Postingan: ${cat.count}</span>

								</div>

							</div>

						`;

						mostActiveCategoriesList.appendChild(li);

					});

				} else {

					mostActiveCategoriesList.innerHTML = '<li style="text-align: center; color: #8E8E93">Belum ada kategori aktif.</li>';

				}




			} else {

				postLabels = ['No Data'];

				postViewsData = [0];

				chartViewsMessage.textContent = 'Tidak ada data postingan untuk ditampilkan.';

			}



			// Calculate average comments (still requires actual comment data per post, simplified for now)

			let totalComments = 0;

			let numPostsWithComments = 0;

			database.ref('BimaAkbar/comments').once('value').then(commentSnapshot => { //
				const comments = commentSnapshot.val();

				if (comments) {

					const commentsArray = Object.values(comments);

					totalComments = commentsArray.length;

					const uniquePostIdsWithComments = new Set(commentsArray.map(comment => comment.postId));

					numPostsWithComments = uniquePostIdsWithComments.size;

				}

				const avgComments = numPostsWithComments > 0 ? (totalComments / numPostsWithComments).toFixed(1) : 0;

				document.getElementById('avgCommentsPerPost').textContent = avgComments;

			});



			// Update summary stats

			document.getElementById('monthlyViews').textContent = totalMonthlyViews.toLocaleString('id-ID');

			document.getElementById('mostPopularPost').textContent = popularPostTitle;



			// Chart 1: Post Views

			if (myChart) myChart.destroy();

			myChart = new Chart(postViewsChartCtx, {
				type: 'bar',
				data: {
					labels: postLabels,
					datasets: [{
						label: 'Jumlah Views',
						data: postViewsData,
						backgroundColor: [
							'#0A84FF', '#5AC8FA', '#FFD60A', '#FF375F', '#30D158', '#BF5AF2', '#FFA500', '#FF69B4'
						],
						borderColor: '#1C1C1E',
						borderWidth: 2
					}]
				},
				options: {
					indexAxis: 'x', // INI YANG MEMBUATNYA HORIZONTAL
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						x: {
							grid: { color: 'rgba(255,255,255,0.1)' },
							ticks: { color: '#8E8E93', callback: value => value.toLocaleString('id-ID') }
						},
						y: {
							grid: { color: 'rgba(255,255,255,0.1)' },
							ticks: { color: '#8E8E93' }
						}
					},
					plugins: {
						legend: { labels: { color: '#E0E0E0' } },
						tooltip: {
							backgroundColor: '#1C1C1E',
							titleColor: '#FFFFFF',
							bodyColor: '#E0E0E0',
							borderColor: '#0A84FF',
							borderWidth: 1,
							callbacks: {
								label: function(context) {
									let label = context.label || '';
									if (label) label += ': ';
									if (context.parsed.x !== null) {
										label += context.parsed.x.toLocaleString('id-ID') + ' views';
									}
									return label;
								}
							}
						}
					},
					animation: { duration: 1200, easing: 'easeOutBounce' }
				}
			});

			chartViewsMessage.style.display = 'none';



			// Chart 2: Category Views

			if (myCategoryChart) myCategoryChart.destroy();

			const categoryLabels = Object.keys(categoryViews);

			const categoryViewsData = Object.values(categoryViews);



			myCategoryChart = new Chart(categoryViewsChartCtx, {
				type: 'radar',
				data: {
					labels: categoryLabels,
					datasets: [{
						label: 'Views per Kategori',
						data: categoryViewsData,
						backgroundColor: 'rgba(10,132,255,0.3)',
						borderColor: '#0A84FF',
						pointBackgroundColor: '#5AC8FA',
						borderWidth: 2
					}]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							labels: { color: '#E0E0E0' }
						},
						tooltip: {
							backgroundColor: 'rgba(28, 28, 30, 0.9)',
							titleColor: '#FFFFFF',
							bodyColor: '#E0E0E0',
							borderColor: 'var(--primary-color)',
							borderWidth: 1,
							callbacks: {
								label: function(context) {
									let label = context.label || '';
									if (label) label += ': ';
									if (context.parsed !== null) {
										label += context.parsed.toLocaleString('id-ID') + ' views';
									}
									return label;
								}
							}
						}
					},
					animation: { duration: 1000, easing: 'easeOutQuart' },
					scales: {
						r: {
							angleLines: { color: '#8E8E93' },
							grid: { color: 'rgba(255,255,255,0.1)' },
							pointLabels: { color: '#E0E0E0' },
							ticks: {
								color: '#8E8E93',
								backdropColor: 'transparent',
								callback: function(value) { return value.toLocaleString('id-ID'); }
							}
						}
					}
				}
			});

			chartCategoryViewsMessage.style.display = 'none';



		});

	};



	// Initial chart load

	updateChartsAndStats('all');



	// Handle filter change

	if (statFilterCategory) {

		if (window.statFilterCategoryChangeHandler) {

			statFilterCategory.removeEventListener('change', window.statFilterCategoryChangeHandler);

		}

		window.statFilterCategoryChangeHandler = (event) => {

			updateChartsAndStats(event.target.value);

		};

		statFilterCategory.addEventListener('change', window.statFilterCategoryChangeHandler);

	}



	// Populate category filter dropdown

	if (statFilterCategory) {

		 registerListener('postStatsSection', 'categories', 'value', (snapshot) => { //
			const categories = snapshot.val();

			// Clear existing options except 'Semua Kategori'

			statFilterCategory.querySelectorAll('option:not([value="all"])').forEach(option => option.remove());

			if (categories) {

				// Convert categories object to array for sorting by name

				const categoryArray = Object.keys(categories).map(key => ({ id: key, ...categories[key] }));

				categoryArray.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically



				categoryArray.forEach(cat => {

					const option = document.createElement('option');

					option.value = cat.name; // Use original case for value if filtering by exact name

					option.textContent = cat.name;

					statFilterCategory.appendChild(option);

				});

			}

		 });

	}

}



function initAddPostSection() {

	console.log('Menginisialisasi Buat Postingan Baru...');

	stopSectionListeners('addPostSection'); // Stop any previous listeners specific to this section



	const addPostForm = document.getElementById('addPostForm');

	const addPostMessage = document.getElementById('addPostMessage');

	const postCategorySelect = document.getElementById('postCategory');

	const statusRadios = document.querySelectorAll('input[name="postStatus"]');

	const scheduleDateTimeGroup = document.getElementById('scheduleDateTimeGroup');

	const scheduleDateInput = document.getElementById('scheduleDate');

	const scheduleTimeInput = document.getElementById('scheduleTime');



	// --- Fill Category Dropdown from Firebase ---

	if (postCategorySelect) {

		postCategorySelect.querySelectorAll('option:not([value=""])').forEach(option => option.remove()); // Clear

		registerListener('addPostSection', 'categories', 'value', (snapshot) => { //
			const categories = snapshot.val();

			if (categories) {

				const categoryArray = Object.keys(categories).map(key => ({ id: key, ...categories[key] }));

				categoryArray.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically



				categoryArray.forEach(cat => {

					const option = document.createElement('option');

					option.value = cat.name;

					option.textContent = cat.name;

					postCategorySelect.appendChild(option);

				});

			} else {

				console.warn("No categories found in Firebase. Please add some categories first.");

			}

		});

	}



	// --- Toggle Schedule Date/Time Input Based on Status ---

	const toggleScheduleInputs = () => {

		if (document.getElementById('statusScheduled').checked) {

			scheduleDateTimeGroup.style.display = 'block';

			scheduleDateInput.setAttribute('required', 'true');

			scheduleTimeInput.setAttribute('required', 'true');



			const now = new Date();

			now.setHours(now.getHours() + 1);

			const defaultDate = now.toISOString().split('T')[0];

			const defaultTime = now.toTimeString().split(' ')[0].substring(0, 5);



			if (!scheduleDateInput.value) scheduleDateInput.value = defaultDate;

			if (!scheduleTimeInput.value) scheduleTimeInput.value = defaultTime;



		} else {

			scheduleDateTimeGroup.style.display = 'none';

			scheduleDateInput.removeAttribute('required');

			scheduleTimeInput.removeAttribute('required');

		}

	};



	statusRadios.forEach(radio => {

		if (window.statusRadioChangeHandler) { // Remove if exists

			 radio.removeEventListener('change', window.statusRadioChangeHandler);

		}

		window.statusRadioChangeHandler = toggleScheduleInputs;

		radio.addEventListener('change', toggleScheduleInputs);

	});

	toggleScheduleInputs(); // Initial call



	// --- Handle Form Submission ---

	if (addPostForm) {

		if (window.addPostFormSubmitHandler) { // Remove if exists

			addPostForm.removeEventListener('submit', window.addPostFormSubmitHandler);

		}



		window.addPostFormSubmitHandler = (event) => {
			event.preventDefault();
		
			const title = document.getElementById('postTitle').value.trim();
			const category = postCategorySelect.value;
			const content = document.getElementById('postContent').value.trim();
			const status = document.querySelector('input[name="postStatus"]:checked').value;
			const cover = document.getElementById('postCover') ? document.getElementById('postCover').value.trim() : '';
			const excerpt = document.getElementById('postExcerpt') ? document.getElementById('postExcerpt').value.trim() : '';
			const slug = generateSlug(title);
			const hashtags = document.getElementById('postTags').value.split(',').map(t => t.trim()).filter(t => t.length > 0);
		
			let scheduledTimestamp = null;
			if (status === 'scheduled') {
			  const scheduleDate = scheduleDateInput.value;
			  const scheduleTime = scheduleTimeInput.value;
		
			  if (!scheduleDate || !scheduleTime) {
				addPostMessage.textContent = 'Tanggal dan waktu jadwal harus diisi!';
				addPostMessage.style.color = 'red';
				return;
			  }
			  scheduledTimestamp = new Date(`${scheduleDate}T${scheduleTime}`).getTime();
			  if (isNaN(scheduledTimestamp)) {
				addPostMessage.textContent = 'Format tanggal atau waktu jadwal tidak valid.';
				addPostMessage.style.color = 'red';
				return;
			  }
			  if (scheduledTimestamp <= Date.now()) {
				addPostMessage.textContent = 'Waktu jadwal harus di masa depan.';
				addPostMessage.style.color = 'red';
				return;
			  }
			}
		
			if (!title || !category || !content) {
			  addPostMessage.textContent = 'Judul, kategori, dan konten harus diisi!';
			  addPostMessage.style.color = 'red';
			  return;
			}
		
			addPostMessage.textContent = (editingPostId ? 'Menyimpan perubahan...' : 'Menyimpan postingan...');
			addPostMessage.style.color = '#8E8E93';
		
			const postData = {
			  title,
			  category,
			  content,
			  status,
			  views: 0,
			  timestamp: editingPostId ? undefined : firebase.database.ServerValue.TIMESTAMP,
			  authorId: auth.currentUser ? auth.currentUser.uid : 'anonymous',
			  cover: cover || null,
			  excerpt: excerpt || content.substring(0, 120),
			  slug,
			  hashtags
			};
			if (scheduledTimestamp) postData.scheduledTimestamp = scheduledTimestamp;
		
			if (editingPostId) {
			  // MODE EDIT: update post
			  // Jangan update views, timestamp, authorId jika tidak diperlukan!
			  delete postData.views;
			  delete postData.timestamp;
			  delete postData.authorId;
		
			  database.ref('BimaAkbar/posts/' + editingPostId)
				.update(postData)
				.then(() => {
				  addPostMessage.textContent = 'Postingan berhasil di-update!';
				  addPostMessage.style.color = '#0A84FF';
				  editingPostId = null;
				  // Reset form
				  addPostForm.reset();
				  document.getElementById('statusPublished').checked = true;
				  if (document.getElementById('formTitle')) document.getElementById('formTitle').textContent = "Buat Postingan Baru";
				  // Kembali ke daftar postingan:
				  loadContent('postListSection');
				})
				.catch(error => {
				  addPostMessage.textContent = `Gagal update postingan: ${error.message}`;
				  addPostMessage.style.color = 'red';
				});
			} else {
			  // MODE TAMBAH: push baru
			  database.ref('BimaAkbar/posts').push(postData)
				.then(() => {
				  addPostMessage.textContent = 'Postingan berhasil disimpan!';
				  addPostMessage.style.color = '#0A84FF';
				  addPostForm.reset();
				  document.getElementById('statusPublished').checked = true;
				  if (document.getElementById('formTitle')) document.getElementById('formTitle').textContent = "Buat Postingan Baru";
				})
				.catch(error => {
				  addPostMessage.textContent = `Gagal menyimpan postingan: ${error.message}`;
				  addPostMessage.style.color = 'red';
				});
			}
		  };
		
		  addPostForm.addEventListener('submit', window.addPostFormSubmitHandler);
		}

}

function generateSlug(text) {
		return text.toString().toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')             // Hapus - di awal
		.replace(/-+$/, '');            // Hapus - di akhir
}



function initPostListSection() {
	console.log('Menginisialisasi Daftar Postingan...');
	stopSectionListeners('postListSection');
		
	function renderPostsCard(posts) {
		const cardList = document.getElementById("allPostsCardList");
		cardList.innerHTML = "";
		
		if (!posts || !posts.length) {
			cardList.innerHTML = `<div style="color:#bdbdbd;text-align:center;padding:1.5em;">Belum ada postingan</div>`;
			return;
		}
posts.forEach(post => {
	const card = document.createElement("div");
	card.className = "post-card";
	card.innerHTML = `<div class="post-card-title">${post.title || "(Tanpa Judul)"}</div>
		<div class="post-card-meta">
			<span>Kategori: <strong>${post.category || "-"}</strong></span>
			<span>Status: <strong>${post.status || "-"}</strong></span>
			<span>Views: <strong>${post.views ?? 0}</strong></span>
			<span>Tanggal: <strong>${post.timestamp ? new Date(post.timestamp).toLocaleDateString('id-ID') : "-"}</strong></span>
			<span>Slug: <strong>${post.slug || "-"}</strong></span>
		</div>
		${post.hashtags ? `<div class="post-card-hashtags">${Array.isArray(post.hashtags) ? post.hashtags.join(', ') : post.hashtags}</div>` : ""}
		<div class="post-card-actions">
			<button onclick="editPost('${post.id}')">Edit</button>
			<button onclick="viewPost('${post.slug || post.id}')">Lihat</button>
			<button class="delete" onclick="deletePost('${post.id}')">Hapus</button>
		</div>`;
	cardList.appendChild(card);
});
}

const cardList = document.getElementById("allPostsCardList");
if (cardList) {
cardList.innerHTML = `<div style="color:#8E8E93;text-align:center;padding:1.5em;">Memuat daftar postingan...</div>`;
}

registerListener('postListSection', 'posts', 'value', (snapshot) => {
const posts = snapshot.val();
if (posts) {
	const postsArray = Object.keys(posts).map(key => ({
		id: key,
		...posts[key]
	})).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
	renderPostsCard(postsArray);
} else {
	renderPostsCard([]);
}
});
}



// Fungsi Global untuk Menghapus Postingan (dapat dipanggil dari tombol)
function deletePost(postId) {
	if (confirm('Apakah Anda yakin ingin menghapus postingan ini? Tindakan ini tidak dapat dibatalkan.')) {
		database.ref('BimaAkbar/posts/' + postId).remove() //
			.then(() => {
				alert('Postingan berhasil dihapus!');
			})
			.catch(error => {
				alert(`Gagal menghapus postingan: ${error.message}`);
				console.error("Error deleting post:", error);
			});
	}
}
window.deletePost = deletePost;

// New: Function to handle editing a post
function editPost(postId) {
	editingPostId = postId; // set mode edit
  
	// Ambil data post dari Firebase
	database.ref('BimaAkbar/posts/' + postId).once('value').then(snapshot => {
	  const postData = snapshot.val();
	  if (postData) {
		// Pindah ke section form tambah/ubah
		loadContent('addPostSection');
  
		// Tunggu form render, lalu isi field
		setTimeout(() => {
		  document.getElementById('postTitle').value = postData.title || '';
		  document.getElementById('postContent').value = postData.content || '';
		  document.getElementById('postCategory').value = postData.category || '';
		  if (document.getElementById('postExcerpt')) document.getElementById('postExcerpt').value = postData.excerpt || '';
		  if (document.getElementById('postCover')) document.getElementById('postCover').value = postData.cover || '';
		  document.getElementById('postTags').value = Array.isArray(postData.hashtags)
			? postData.hashtags.join(', ')
			: (postData.hashtags || '');
  
		  // Status
		  if (postData.status === 'published') {
			document.getElementById('statusPublished').checked = true;
		  } else if (postData.status === 'draft') {
			document.getElementById('statusDraft').checked = true;
		  } else if (postData.status === 'scheduled') {
			document.getElementById('statusScheduled').checked = true;
			// Isi tanggal dan waktu jika ada
			if (postData.scheduledTimestamp) {
			  const dateObj = new Date(postData.scheduledTimestamp);
			  if (document.getElementById('scheduleDate')) document.getElementById('scheduleDate').value = dateObj.toISOString().slice(0,10);
			  if (document.getElementById('scheduleTime')) document.getElementById('scheduleTime').value = dateObj.toTimeString().slice(0,5);
			}
		  }
  
		  // Ubah judul form (opsional)
		  if (document.getElementById('formTitle')) {
			document.getElementById('formTitle').textContent = "Edit Postingan";
		  }
		}, 400);
	  } else {
		alert("Postingan tidak ditemukan.");
	  }
	});
  }
  window.editPost = editPost;
  

// New: Function to handle viewing a post
function viewPost(postSlug) {
	window.open(`https://bimaakbar.netlify.app/post.html?slug=${postSlug}`, '_blank');
}
window.viewPost = viewPost;


// --- Category Management Section (New Feature) ---
function initSettingsSection() {

	console.log('Menginisialisasi Pengaturan...');

	stopSectionListeners('settingsSection');



	const adminEmailInput = document.getElementById('adminEmail');

	const siteNameInput = document.getElementById('siteName');

	const itemsPerPageInput = document.getElementById('itemsPerPage');

	const settingsForm = document.getElementById('settingsForm');

	const settingsMessage = document.getElementById('settingsMessage');



	if (adminEmailInput && auth.currentUser) {

		adminEmailInput.value = auth.currentUser.email;

	}



	database.ref('BimaAkbar/settings').once('value').then(snapshot => { //
		const settings = snapshot.val();

		if (settings) {

			if (siteNameInput) siteNameInput.value = settings.siteName || '';

			if (itemsPerPageInput) itemsPerPageInput.value = settings.itemsPerPage || 10;

		}

	}).catch(error => console.error("Error loading settings:", error));



	if (settingsForm) {

		if (window.settingsFormSubmitHandler) {

			settingsForm.removeEventListener('submit', window.settingsFormSubmitHandler);

		}



		window.settingsFormSubmitHandler = (event) => {

			event.preventDefault();

			settingsMessage.textContent = 'Menyimpan pengaturan...';

			settingsMessage.style.color = '#8E8E93';



			const newSiteName = siteNameInput ? siteNameInput.value.trim() : '';

			const newItemsPerPage = itemsPerPageInput ? parseInt(itemsPerPageInput.value) : 10;



			database.ref('BimaAkbar/settings').update({ //
					siteName: newSiteName,

					itemsPerPage: newItemsPerPage,

					lastUpdated: firebase.database.ServerValue.TIMESTAMP

				})

				.then(() => {

					settingsMessage.textContent = 'Pengaturan berhasil disimpan!';

					settingsMessage.style.color = 'var(--primary-color)';

				})

				.catch(error => {

					settingsMessage.textContent = `Gagal menyimpan pengaturan: ${error.message}`;

					settingsMessage.style.color = 'red';

					console.error("Error saving settings:", error);

				});

		};

		settingsForm.addEventListener('submit', window.settingsFormSubmitHandler);

	}



	const changePasswordBtn = document.getElementById('changePasswordBtn');

	if (changePasswordBtn) {

		changePasswordBtn.onclick = () => {

			const newPassword = prompt("Masukkan password baru (minimal 6 karakter):");

			if (newPassword && newPassword.length >= 6) {

				auth.currentUser.updatePassword(newPassword)

					.then(() => {

						alert("Password berhasil diubah!");

						settingsMessage.textContent = 'Password berhasil diubah!';

						settingsMessage.style.color = 'var(--primary-color)';

					})

					.catch((error) => {

						alert(`Gagal mengubah password: ${error.message}`);

						settingsMessage.textContent = `Gagal mengubah password: ${error.message}`;

						settingsMessage.style.color = 'red';

						console.error("Error updating password:", error);

					});

			} else if (newPassword !== null) {

				alert("Password minimal 6 karakter.");

			}

		};

	}

}



// --- Navigation Link Event Listeners ---

navLinks.forEach(link => {

	link.addEventListener('click', (event) => {

		event.preventDefault();



		const targetId = link.getAttribute('data-target');

		if (targetId) {

			loadContent(targetId);

		}

	});

});



// Handle initial load based on URL parameter or default to dashboard

document.addEventListener('DOMContentLoaded', () => {

	const urlParams = new URLSearchParams(window.location.search);

	const initialPage = urlParams.get('page') || 'dashboard';

	const initialTargetId = `${initialPage}Section`;



	navLinks.forEach(item => item.classList.remove('active'));

	const initialLink = document.querySelector(`.nav-link[data-target="${initialTargetId}"]`);

	if (initialLink) {

		initialLink.classList.add('active');

	} else {

		document.querySelector('.nav-link[data-target="dashboardSection"]').classList.add('active');

	}

});



// To handle browser back/forward buttons

window.addEventListener('popstate', () => {

	const urlParams = new URLSearchParams(window.location.search);

	const page = urlParams.get('page') || 'dashboard';

	const targetId = `${page}Section`;

	loadContent(targetId);

});
