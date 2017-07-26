export let router = function(selector) {

  if (!document.querySelector(selector)) {
    return;
  }
  let supportKey = function(event) {
    return ['meta', 'shift', 'ctrl', 'alt'].reduce((previous, current) => {
      return event[`${current}Key`] || previous;
    }, false);
  };

  let removeActiveClass = function() {
    let firstSection = document.querySelector('section:first-child');

    firstSection.classList.remove('is-active');
    removeActiveClass = function() {};
  };

  let routes = {
    next: (index) => {
      let n = index + 1;
      let section = document.getElementById(`s-${n}`);

      if (!section) {
        return location.hash = '#s-0';
      }

      location.hash = `#s-${n}`;
    },
    prev: (index) => {
      let n = index - 1;

      if (n >= 0 && document.getElementById(`s-${n}`)) {
        return location.hash = `#s-${n}`;
      }
    },
  };

  let docTitle = document.title;
  let onHashChange = () => {
    removeActiveClass();

    let links = document.querySelectorAll('.js-Pager a');

    [...links].forEach((link) => link.classList.toggle('is-active', link.hash === location.hash));

    let activeLink = document.querySelector('.js-Pager a.is-active');

    if (activeLink) {
      document.title = `${docTitle} ${activeLink.title}`;
    }
  };


  document.addEventListener('DOMContentLoaded', function(event) {
    if (location.hash) {
      onHashChange();
    }
  });

  window.addEventListener('hashchange', onHashChange);

  window.addEventListener('keyup', function(event) {
    let hash = location.hash;
    let index = (hash.split(/-/)[1] || 0) * 1;
    let kc = event.keyCode;
    let route = kc === 39 ? 'next' : 'prev';

    if (supportKey(event) || (kc !== 39 && kc !== 37)) {
      return;
    }

    routes[route](index);
  });
};
