const links = document.querySelectorAll('a[href]');

[...links].forEach((link) => {
  const sameOrigin = location.origin === link.origin;
  const samePath = location.pathname === link.pathname;

  if (sameOrigin && samePath) {
    link.classList.add('is-cached');
  }

  caches
  .match(link.href, {ignoreSearch: true})
  .then((response) => {
    if (response) {
      link.classList.add('is-cached');
    }
  });
});
