let isGetHtml = (request) => {
  return request.mode === 'navigate' ||
    (request.method === 'GET' &&
    request.headers.get('accept').includes('text/html'));
};

self.addEventListener('fetch', event => {
  let request = event.request;

  if (isGetHtml(request)) {
    // Do network-first event.respondWith()
  } else {
    // Do cache-first event.respondWith()
  }
});
