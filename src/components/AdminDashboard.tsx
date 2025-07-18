import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    pubDate: string;
    description: string;
  };
}

const PostList = ({ posts }: { posts: Post[] }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Semua Postingan</h2>
    <div className="bg-white shadow-md rounded-lg">
      <ul className="divide-y divide-gray-200">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.slug} className="p-4 hover:bg-gray-50 flex justify-between items-center">
              <div>
                <Link to={`/admin/editor/${post.slug}`} className="text-lg font-semibold text-blue-600 hover:underline">
                  {post.frontmatter.title}
                </Link>
                <p className="text-sm text-gray-500">{new Date(post.frontmatter.pubDate).toLocaleDateString()}</p>
              </div>
              <Link to={`/admin/editor/${post.slug}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
                Edit
              </Link>
            </li>
          ))
        ) : (
          <li className="p-4 text-gray-500">Belum ada postingan.</li>
        )}
      </ul>
    </div>
  </div>
);

const PostEditor = () => {
  // Di dunia nyata, Anda akan mengambil slug dari URL dan memuat konten MDX
  // const { slug } = useParams();
  return <div className="text-xl">Halaman Editor untuk Postingan</div>;
};


interface AdminDashboardProps {
  posts: Post[];
}

export default function AdminDashboard({ posts }: AdminDashboardProps) {
  return (
    <Router>
      <div className="p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
        <nav className="mb-6">
          <Link to="/admin" className="text-blue-500 hover:underline">Dashboard Utama</Link>
        </nav>
        <Routes>
          <Route path="/admin" element={<PostList posts={posts} />} />
          <Route path="/admin/editor/:slug" element={<PostEditor />} />
          {/* Tambahkan route lain di sini, misalnya untuk membuat postingan baru */}
          {/* <Route path="/admin/new" element={<NewPost />} /> */}
        </Routes>
      </div>
    </Router>
  );
}