
self.addEventListener('install', function(event) {
    event.waitUntil(caches.open('my-cache').then(function(cache) {
        return cache.addAll([
            '/index.html',
            '/style.css',
            '/script.js',
            '/icons/icon-192x192.png',
            '/icons/icon-512x512.png',
            '/icons/play-icon.png',
            '/icons/pause-icon.png',
            '/icons/settings-icon.png',
            '/icons/back-arrow-icon.png',
        ]);
    }));
});
  
self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
    }));
});
