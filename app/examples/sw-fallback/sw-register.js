let host = location.hostname;
let httpsOnly = location.protocol === 'https:';

let registerWorker = (filePath) => {

  if (!navigator.serviceWorker ||
    typeof Cache === 'undefined' || !Cache.prototype.addAll ||
    !(httpsOnly || host === '127.0.0.1' || host === 'localhost')
  ) {
    return console.log('[Register]', 'Your browser does not support serviceWorker at this domain');
  }

  navigator.serviceWorker.register(filePath)
  .then((registration) => {

    // updatefound is fired if sw.js changes.
    registration.onupdatefound = () => {
      // The updatefound event implies that registration.installing is set
      var installingWorker = registration.installing;

      installingWorker.onstatechange = function() {
        let state = installingWorker.state;

        console.log('[Register]', 'onstatechange triggered', state);

        if (state === 'installed') {

          if (navigator.serviceWorker.controller) {
            // At this point, the old content has been purged and the fresh content has been added to the cache.
            // You might wnat to display a "New content is available; please refresh."
            console.log('[Register]', 'New or updated content is available.');
          } else {
            // At this point, everything has been precached, but the service worker is not
            // controlling the page. The service worker will not take control until the next
            // reload or navigation to a page under the registered scope.
            // It's the perfect time to display a "Content is cached for offline use." message.
            console.log('[Register]', 'Content is cached, and will be available for offline use the next time the page is loaded.');
          }

        } else if (state === 'redundant') {
          console.error('[Register]', 'The installing service worker became redundant.');
        }
      };
    };

    // Check to see if there's an updated version of sw.js with new files to cache
    if (typeof registration.update === 'function') {
      registration.update();
    }

  })
  .catch((event) => {
    console.error('[Register]', 'Error during service worker registration:', event);
  });
};

registerWorker('sw.js');
