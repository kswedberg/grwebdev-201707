const cacheId = 'grwebdev-presentation';
const precacheFiles = [
  '/',
  '/css/app.css',
  '/js/app.js',
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

  self.clients.matchAll({
    includeUncontrolled: true
  })
  .then(function(clientList) {
    var urls = clientList.map((client) => client.url);

    // console.log('[ServiceWorker] Matching clients:', urls.join(', '));
  });


  event.waitUntil(
    caches.keys()
    .then(function(cacheIds) {
      console.log(cacheIds);

      return Promise.resolve();
    })
  );

  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  let request = event.request;

  event.respondWith(
    getFromCache(request)
    .catch(getFromServer(request))
  );

  // Only do this for same-site resources
  if (location.origin === request.url.origin && !request.pathname.endsWith('favicon.ico')) {
    event.waitUntil(update(request));
  }

});
