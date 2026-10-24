// Offline cache: the app shell is cached on install, fonts are cached the first time they load.
const CACHE = 'intentionally-__VERSION__';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Never cache Google sign-in or Drive calls.
  if (/googleapis\.com$|accounts\.google\.com$/.test(url.hostname) && !/fonts\.googleapis\.com$/.test(url.hostname)) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: url.origin === location.origin }).then(hit => {
      const net = fetch(e.request).then(res => {
        if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
        return res;
      }).catch(() => hit || (e.request.mode === 'navigate' ? caches.match('index.html') : undefined));
      return hit || net;
    })
  );
});
