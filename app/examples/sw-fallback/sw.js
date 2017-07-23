const cacheLabel = 'grwebdev-offline';

const preLoad = () => {
  return caches.open(cacheLabel)
  .then((cache) => {
    return cache.addAll([
      'offline.html',
      'index.html',
      '/css/app.css',
      '/js/app.js',
      'sw-register.js'
    ]);
  });
};

const checkResponse = (request) => {
  return new Promise((resolve, reject) => {
    fetch(request)
    .then((response) => {
      if (response.status !== 404) {
        resolve(response);
      } else {
        reject();
      }
    }, reject);
  });
};

const addToCache = (request) => {
  return caches.open(cacheLabel)
  .then((cache) => {
    return fetch(request)
    .then((response) => {
      if (!response.url) {
        return;
      }
      console.log(`Add page to cache: ${response.url}`);

      return cache.put(request, response);
    });
  });
};

const returnFromCache = (request) => {
  return caches.open(cacheLabel)
  .then((cache) => {
    return cache.match(request)
    .then((matching) => {
      if (!matching || matching.status === 404) {
        return cache.match('offline.html');
      } else {
        return matching;
      }
    });
  });
};

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
