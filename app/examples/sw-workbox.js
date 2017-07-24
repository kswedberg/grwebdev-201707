// eslint-disable-next-line no-undef
importScripts('workbox-sw.prod.v1.0.1.js');

const fileManifest = [
  '/css/app-dc30f5ecff.css',
  '/css/print-d41d8cd98f.css',
  '/js/tail-fd0b93d19a.js',
  {
    url: '/img/logo.alpha.png',
    revision: '54cad1ce8891f9305a4d3daacca15dad'
  },
  {
    url: '/img/logo.alpha@2x.png',
    revision: '54cad1ce8891f9305a4d3daacca15dad'
  },
  {
    url: '/img/waiting.png',
    revision: '224dcc910d81ab892d41e3004d80e2a2'
  },
  {
    url: '/img/sprites/sprites.svg',
    revision: '5bafa6cbdd8d36a460e92f5e902399f4'
  }
];

const workboxSW = new self.WorkboxSW({
  cacheId: 'grwebdev-offline',
  clientsClaim: true
});

workboxSW.precache(fileManifest);

workboxSW.router.registerRoute(/game\//, workboxSW.strategies.staleWhileRevalidate());
workboxSW.router.registerRoute(/\/fonts\//, workboxSW.strategies.cacheFirst());
