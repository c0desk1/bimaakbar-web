// components/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import LogoutButton from "@/components/ui/LogoutButton"

export default function Sidebar() {
  const pathname = usePathname()
  const [openSub, setOpenSub] = useState<string | null>(null)

  const nav = [
    { name: 'Dashboard', href: '/dashboard' },
    {
      name: 'Posts',
      children: [
        { name: 'All Posts', href: '/dashboard/posts' },
        { name: 'New Post', href: '/dashboard/posts/new' },
        { name: 'Categories', href: '/dashboard/categories' },
      ],
    },
    {
      name: 'Media',
      children: [
        { name: 'Library', href: '/dashboard/media' },
        { name: 'Upload', href: '/dashboard/media/upload' },
      ],
    },
    { name: 'Pages', href: '/dashboard/pages' },
    { name: 'Users', href: '/dashboard/users' },
    { name: 'Settings', href: '/dashboard/settings' },
  ]

  return (
    <aside className="w-64 min-h-screen bg-[#121212] border-r border-[#2a2a2a] p-4">
      <h2 className="text-white text-xl font-semibold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-1">
        {nav.map((item) =>
          item.children ? (
            <div key={item.name}>
              <button
                onClick={() =>
                  setOpenSub(openSub === item.name ? null : item.name)
                }
                className={`w-full text-left px-4 py-2 rounded text-sm font-medium transition-colors ${
                  openSub === item.name
                    ? 'bg-[#1e1e1e] text-white'
                    : 'text-gray-400 hover:bg-[#1e1e1e] hover:text-white'
                }`}
              >
                {item.name}
              </button>
              {openSub === item.name && (
                <div className="ml-4 mt-1 flex flex-col gap-1">
                  {item.children.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      className={`px-3 py-1.5 rounded text-sm transition-colors ${
                        pathname === sub.href
                          ? 'bg-[#2a2a2a] text-white'
                          : 'text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
                      }`}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-[#1e1e1e] text-white'
                  : 'text-gray-400 hover:bg-[#1e1e1e] hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          )
        )}
      </nav>
      <LogoutButton />
    </aside>
  )
}
