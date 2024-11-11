
self.addEventListener('install', function(event) {
    event.waitUntil(caches.open('my-cache').then(function(cache) {
        return cache.addAll([
            '/index.html',
            '/manifest.json',
            '/style.css',
            '/script.js',
            '/icons/back-arrow-icon.png',
            '/icons/icon-192x192.png',
            '/icons/icon-512x512.png',
            '/icons/icon.png',
            '/icons/play-pause-icon.png',
            '/icons/settings-icon.png',
            '/screenshots/screenshot1.png',
            '/screenshots/screenshot2.png',
        ]);
    }));
});
self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
    }));
});
