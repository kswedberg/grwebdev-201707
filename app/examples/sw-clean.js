
// Name and version could be pulled from package.json & inserted during build process
// or output to a different file and included here with self.importScripts();
const name = 'grjs-offline';
const version = '1.1.3';

const cacheId = `${name}-${version}`;

// Do the typical sw business with install and fetch lifecycle events...

// Then delete unused/unexpected caches in activate event:
self.addEventListener('activate', (event) => {

  event.waitUntil(
    caches.keys()
    .then(function(cacheIds) {
      return Promise.all(
        cacheIds
        .filter((item) => item !== cacheId)
        .map((item) => caches.delete(item))
      );
    })
  );
});
