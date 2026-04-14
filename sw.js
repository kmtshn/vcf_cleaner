const CACHE_NAME = 'contact-cleaner-v1';

// オフライン動作用にキャッシュするファイル群
// （外部のCDNが存在しないため、これだけで完全にオフライン動作します）
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// インストール時にファイルをキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// リクエスト時にキャッシュがあればそれを返し、無ければネットワークへ
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュが見つかった場合はそれを返す（オフライン対応）
        if (response) {
          return response;
        }
        // 見つからなければ通常のネットワークリクエスト
        return fetch(event.request);
      })
  );
});
