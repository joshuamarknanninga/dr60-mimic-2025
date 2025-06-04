export default {
    swDest: 'dist/sw.js',
    globDirectory: 'dist',
    globPatterns: ['**/*.{html,js,css,png,webmanifest,json,woff2}'],
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.destination === 'audio',
        handler: 'CacheFirst',
        options: { cacheName: 'audio-cache', expiration: { maxEntries: 40 } }
      }
    ]
  };
  