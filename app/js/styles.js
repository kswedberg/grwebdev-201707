export let loadStyles = function() {
  window.addEventListener('load', function(event) {
    let head = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');

    link.href = '/css/secondary.css';
    link.rel = 'stylesheet';

    head.appendChild(link);
  });

};
