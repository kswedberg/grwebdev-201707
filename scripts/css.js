const path = require('path');
const fs = require('fs-extra');
const postcss = require('postcss');
const config = require('./postcss.config.js');

const cwd = process.cwd();
const src = path.join(cwd, 'app/css/app.css');
const dest = path.join(cwd, 'public/css/app.css');

let run = function() {
  return fs.readFile(src)
  .then((css) => {
    return postcss(config.plugins)
    .process(css, {
      from: 'app/css/app.css',
      to: 'public/css/app.css'
    });
  })
  .then((result) => {
    let appWrite = fs.outputFile(dest, result.css);
    let mapWrite;

    if (result.map) {
      mapWrite = fs.outputFile(`${dest}.map`, result.map);
    }

    return Promise.all([appWrite, mapWrite]);
  })
  .catch(console.error);
};

if (process.argv.includes('cli')) {
  run();
}

module.exports = run;
