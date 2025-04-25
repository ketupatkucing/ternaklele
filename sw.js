

const CACHE_NAME = 'ternaklele-cache-v1';
const ASSETS_TO_CACHE = [
  '/ternaklele/',
  '/ternaklele/index.html',
  '/ternaklele/fish.js',
  '/ternaklele/mancing.js',
  '/ternaklele/pancing.png',
  '/ternaklele/strike.png',
  '/ternaklele/bait.png',
  '/ternaklele/coin.png',
  '/ternaklele/lele.png',
  '/ternaklele/makananpelet.png',
  '/ternaklele/talas.png',
  '/ternaklele/pelet.png',
  '/ternaklele/orang.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME)
                  .map((name) => caches.delete(name))
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedRes) => {
      return cachedRes || fetch(event.request);
    })
  );
});
