import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bima Akbar',
    short_name: 'Bima Akbar',
    description: 'Sampai nanti',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#fff',
    icons: [
        {
        "src": "/web-app-manifest-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "maskable"
        },
        {
        "src": "/web-app-manifest-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
        }
    ],
  }
}