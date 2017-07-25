const cacheId = 'grwebdev-offline';
const precacheFiles = [
  'offline.html',
  '404.html',
  '/css/app.css',
  '/js/app.js',
  'sw-register.js'
];

const precache = () => {
  return caches.open(cacheId)
  .then((cache) => {
    return cache.addAll(precacheFiles);
  });
};

const getFromServer = (request) => {
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

const getFallbackFile = (matching) => {
  if (!matching || matching.status === 404) {
    return !matching ? 'offline.html' : '404.html';
  }

  return null;
};

const getFromCache = (request) => {
  return caches.open(cacheId)
  .then((cache) => {
    return cache.match(request)
    .then((matching) => {
      let fallback = getFallbackFile(matching);

      if (fallback) {
        return cache.match(fallback);
      }

      return matching;
    });
  });
};

const addToCache = (request) => {
  return caches.open(cacheId)
  .then((cache) => {
    return fetch(request)
    .then((response) => {
      if (!response.url) {
        return;
      }

      return cache.put(request, response);
    });
  });
};

self.addEventListener('install', (event) => {
  event.waitUntil(precache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    getFromServer(event.request)
    .catch(() => {
      return getFromCache(event.request)
      .catch((err) => {
        console.error('Getting from cache failed:', err);

        throw err;
      });
    })
  );

  event.waitUntil(addToCache(event.request));
});
