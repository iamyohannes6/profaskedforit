self.addEventListener('install', function(e) {
    self.skipWaiting();
});

self.addEventListener('activate', function(e) {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(e) {
    if (e.request.url.includes('debugger')) {
        e.respondWith(new Response('', {status: 403}));
    }
}); 