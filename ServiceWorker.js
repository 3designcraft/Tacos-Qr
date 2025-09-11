const cacheName = "DefaultCompany-pruebafigma-1.0";
const contentToCache = [
    "Build/60e9291e416528416a7d1ddadc39c555.loader.js",
    "Build/4c9ef7477288b9510457450d5fe52490.framework.js",
    "Build/e99c9910abdf6dd569c7c1f73e086e66.data",
    "Build/008d47ecf3f15c6cecf9f39f62ac7c56.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
