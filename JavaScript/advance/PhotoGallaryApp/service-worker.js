// Cache Name
const CACHE_NAME = 'photo-gallery-cache';

// Files to Cache
const ASSETS_TO_CACHE = [
  '/index.html', // Ensure this path is correct
  '/style.css',  // Ensure this path is correct
  '/app.js',     // Ensure this path is correct
];

// Install Event: Cache Static Assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching assets...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((error) => {
        console.error('Failed to cache assets:', error);
      })
  );
});

// Activate Event: Clean Up Old Caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Event: Serve Cached Resources or Fetch from Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
      .catch((error) => {
        console.error('Fetch failed:', error);
        return new Response('Offline', { status: 503 });
      })
  );
});