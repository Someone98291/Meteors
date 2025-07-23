const CACHE_NAME = 'meteor-madness-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // Game assets:
  'https://i.postimg.cc/cCvMNxKS/image.png',
  'https://i.imgur.com/E0oo8pS.png',
  'https://media.blooket.com/image/upload/c_limit,f_auto,h_250,fl_lossy,q_auto:low/v1753027482/wzppmcjrwkvkdmw5bzoy.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
