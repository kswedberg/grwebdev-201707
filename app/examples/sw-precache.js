// This is the service worker with the Cache-first network

const cacheLabel = 'grwebdev-offline';
const precacheFiles = [
  /* Add an array of files to precache for your app */
];

const precache = () => {
  return caches.open(cacheLabel)
  .then(function(cache) {
    return cache.addAll(precacheFiles);
  });
};

const getFromCache = (request) => {
  return caches.open(cacheLabel)
  .then((cache) => {
    return cache.match(request)
    .then((matches) => {
      return matches || Promise.reject('no-match');
    });
  });
};

const getFromServer = (request) => {
  return fetch(request).then(function(response) {
    return response;
  });
};

// Get newest version of file for next time
const update = (request) => {
  return caches.open(cacheLabel)
  .then(function(cache) {
    return fetch(request)
    .then(function(response) {
      return cache.put(request, response);
    });
  });
};

// LISTENERS
self.addEventListener('install', function(event) {
  event.waitUntil(precache()
  .then(function() {
    console.log('Skip waiting on install');

    return self.skipWaiting();
  }));
});

self.addEventListener('activate', (event) => {
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    getFromCache(event.request)
    .catch(getFromServer(event.request))
  );

  event.waitUntil(update(event.request));
});
