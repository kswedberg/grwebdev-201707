const cacheLabel = 'grwebdev-offline';

const preLoad = () => {};

const checkResponse = (request) => {};

const addToCache = (request) => {};

const returnFromCache = (request) => {};

// Set up the offline page in the cache and open a new cache
self.addEventListener('install', (event) => {
  event.waitUntil(preLoad());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    checkResponse(event.request)
    .catch(() => {
      return returnFromCache(event.request);
    })
  );

  event.waitUntil(addToCache(event.request));
});
