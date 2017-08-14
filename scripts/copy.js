const Promises = require('bluebird');
const fs = require('fs-extra');
const path = require('path');
const cwd = process.cwd();
const cheerio = require('cheerio');
const Prism = require('prismjs');
const toCopy = [
  '.htaccess',
  'favicon.ico',
  'manifest.webmanifest',
  'examples',
  'img',
];

const langs = {
  js: 'javascript',
};

const injectScripts = ($, dataAttr) => {
  return function() {
    let filePath = $(this).attr(dataAttr);
    let file = path.join(cwd, 'app', filePath);
    let ext = path.extname(file).replace(/^\./, '');
    let lang = $(this).attr('data-lang') || langs[ext] || ext;
    let prismLang = Prism.languages[lang];
    let script = fs.readFileSync(file, 'utf-8');

    script = Prism.highlight(script, prismLang);

    $(this).append(`<pre>${script}</pre>`);
  };
};

const setupSections = ($) => {
  return function(index) {
    let id = `s-${index}`;

    $(this)
    .attr('id', id)
    .attr('tabindex', '0');
  };
};

const buildPager = ($) => {
  let links = [];

  $('section').each(function(index) {
    let id = `s-${index}`;
    let title = $(this)
    .find('h2')
    .first()
    .text();

    links.push(`<a title="${title}" href="#${id}">${index || 'start'}</a>`);

    $(this)
    .attr('id', id)
    .attr('tabindex', '0');
  });

  $('#alert').after(`<footer class="Pager js-Pager"><div class="Pager-content">${links.join('')}</div></footer>`);
};

const buildIndex = () => {
  let from = path.join(cwd, 'app', 'index.html');
  let to = path.join(cwd, 'public', 'index.html');

  return fs.readFile(from, 'utf-8')
  .then((raw) => {
    let $ = cheerio.load(raw);
    let dataAttr = 'data-code';

    $('section').each(setupSections($));

    $(`[${dataAttr}]`).each(injectScripts($, dataAttr));

    buildPager($);

    let content = $.html();

    return fs.writeFile(to, content);
  });
};

let buildAll = function() {
  return Promises.each(toCopy, (file) => {
    let from = path.join(cwd, 'app', file);
    let to = path.join(cwd, 'public', file);

    return fs.copy(from, to);
  })
  .then(buildIndex);
};

if (process.argv.includes('cli')) {
  buildAll();
}

module.exports = {
  files: toCopy,
  buildAll,
  buildIndex,
  copyFile: function(file) {
    let from = path.join(cwd, 'app', file);
    let to = path.join(cwd, 'public', file);

    return fs.copy(from, to);
  }
};
