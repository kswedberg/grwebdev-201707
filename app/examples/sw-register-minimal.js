
if (navigator.serviceWorker.controller) {
  console.log('Active service worker found. No need to register');
} else {

// Register the ServiceWorker
  navigator.serviceWorker.register('/sw.js', {
    // Default scope:
    scope: './'
  })
  .then(function(reg) {
    console.log(`Registered service worker for scope: ${reg.scope}`);
  });
}
