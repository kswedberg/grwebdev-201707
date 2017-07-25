const path = require('path');
const dest = path.join(process.cwd(), 'public');

const wbBuild = require('workbox-build');

wbBuild.generateSW({
  cacheId: 'grwebdev-offline',
  swDest: path.join(dest, 'sw-workbox.js'),
  globDirectory: `${dest}/`,
  globPatterns: [
    '**/*-*.css',
    'js/*-*.js',
    '**/img/*.png',
    '**/img/sprites/*.svg',
  ],
  globIgnores: [
    '**/admin*/**',
  ],
  clientsClaim: true,
  runtimeCaching: [
    {
      urlPattern: /game\//,
      handler: 'staleWhileRevalidate',
    },
    {
      urlPattern: /\/fonts\//,
      handler: 'cacheFirst',
    }
  ],

  // Skip cache busting for revved files
  dontCacheBustUrlsMatching: /-[0-9a-f]{10}\./,
})
.then(() => {
  console.log('Built serviceWorker');
})
.catch(console.error);
