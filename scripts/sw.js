const path = require('path');
const dest = path.join(process.cwd(), 'public');
const pkg = require('../package.json');
const wbBuild = require('workbox-build');

wbBuild.generateSW({
  cacheId: `${pkg.name}-${pkg.version}`,
  swDest: path.join(dest, 'sw.js'),
  globDirectory: `${dest}/`,
  globPatterns: [

    'index.html',
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
