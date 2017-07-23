let host = location.hostname;
let httpsOnly = location.protocol === 'https:' && host.indexOf('.com') !== -1;

let registerWorker = (filePath) => {

  if (!navigator.serviceWorker ||
    typeof Cache === 'undefined' || !Cache.prototype.addAll ||
    !(httpsOnly || host === '127.0.0.1' || host === 'localhost')
  ) {
    return;
  }

  navigator.serviceWorker.register(filePath, {scope: './'})
  .then(function(registration) {

    // updatefound is fired if sw.js changes.
    registration.onupdatefound = function() {
      // The updatefound event implies that registration.installing is set
      var installingWorker = registration.installing;

      installingWorker.onstatechange = function() {
        let state = installingWorker.state;

        if (state === 'installed') {

          if (navigator.serviceWorker.controller) {
            // At this point, the old content has been purged and the fresh content has been added to the cache.
            // Maybe display a "New content is available; please refresh" message?
            console.log('New or updated content is available.');
          } else {
            // At this point, everything has been precached, but the service worker is not
            // controlling the page. The service worker will not take control until the next
            // reload or navigation to a page under the registered scope.
            // Maybe display a "Content is cached for offline use" message?
            console.log('Content is cached, and will be available for offline use the next time the page is loaded.');
          }

        } else if (state === 'redundant') {
          console.error('The installing service worker became redundant.');
        }
      };
    };

    // Check to see if there's an updated version of sw.js with new files to cache
    if (typeof registration.update === 'function') {
      registration.update();
    }

  })
  .catch(function(e) {
    console.error('Error during service worker registration:', e);
  });
};

registerWorker('./sw.js');
