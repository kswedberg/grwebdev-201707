const path = require('path');
const dest = path.join(process.cwd(), 'public');

const wbBuild = require('workbox-build');

wbBuild.generateSW({
  cacheId: 'grwd',
  swDest: path.join(dest, 'sw.js'),
  globDirectory: `${dest}/`,
  globPatterns: [
    '/',
    'css/*.css',
    'js/*.js',
  ],

  clientsClaim: true,
  runtimeCaching: [
    {
      urlPattern: /\.png/,
      handler: 'networkFirst',
    },
  ],

})
.then(() => {
  console.log('Built serviceWorker');
})
.catch(console.error);