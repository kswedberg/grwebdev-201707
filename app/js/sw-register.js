let host = location.hostname;
let httpsOnly = location.protocol === 'https:';

export let registerWorker = (filePath) => {

  if (!navigator.serviceWorker ||
    typeof Cache === 'undefined' || !Cache.prototype.addAll ||
    !(httpsOnly || host === '127.0.0.1' || host === 'localhost')
  ) {
    return console.log('[Register]', 'Your browser does not support serviceWorker at this domain');
  }

  navigator.serviceWorker.register(filePath)
  .then(function(registration) {
    // Check to see if there's an updated version of sw.js with new files to cache
    if (typeof registration.update === 'function') {
      registration.update();
    }
  })
  .catch((event) => {
    console.error('[Register]', 'Error during service worker registration:', event);
  });
};
