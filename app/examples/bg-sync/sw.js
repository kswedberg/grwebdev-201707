

self.addEventListener('sync', function(event) {
  if (event.tag === 'submitform') {
    event.waitUntil();
  }
});
