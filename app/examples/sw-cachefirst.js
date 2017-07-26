const cacheId = 'grjs-offline';
const precacheFiles = [
  'offline.html',
  '404.html',
  '/css/app.css',
  '/js/app.js',
  'sw-register.js'
];

const precache = () => {
  return caches.open(cacheId)
  .then(function(cache) {
    return cache.addAll(precacheFiles);
  });
};

const getFromCache = (request) => {
  return caches.open(cacheId)
  .then((cache) => {
    return cache.match(request)
    .then((matches) => {
      return matches || Promise.reject('no-match');
    });
  });
};

const getFromServer = (request) => {
  return fetch(request)
  .then(function(response) {
    return response;
  });
};

// Get newest version of file for next time
const update = (request) => {
  return caches.open(cacheId)
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
    // Forces trigger of 'activate' without waiting for browser refresh
    return self.skipWaiting();
  }));
});

self.addEventListener('activate', (event) => {
  // Along with self.skipWaiting() in the install listener,
  // lets the serviceWorker start working immediately without navigation in the browser
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    getFromCache(event.request)
    .catch(getFromServer(event.request))
  );

  // Only do this for same-site resources
  if (location.origin === event.request.url.origin) {
    event.waitUntil(update(event.request));
  }

});
