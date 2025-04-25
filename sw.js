self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        'index.html',
        'fish.js',
        'mancing.js',
        'pancing.png',
        'strike.png',
        'bait.png',
        'coin.png',
        'lele.png',
        'makananpelet.png',
        'talas.png',
        'pelet.png',
        'orang.png'
        
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
