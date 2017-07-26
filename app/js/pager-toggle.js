const buildEl = (tag, props) => {
  let el = document.createElement(tag);

  Object.keys(props).forEach((prop) => {
    el[prop] = props[prop];
  });

  return el;
};

const clickHandler = function(event) {
  let hiddenClass = 'is-hidden';
  let parentClasses = this.parentNode.classList;

  parentClasses.toggle(hiddenClass, !parentClasses.contains(hiddenClass));
};

export let pagerToggle = () => {
  let pager = document.querySelector('.js-Pager');

  if (!pager) {
    return;
  }

  let btn = buildEl('button', {className: 'Pager-toggle'});

  btn.appendChild(buildEl('span', {textContent: '+'}));
  pager.appendChild(btn);

  btn.addEventListener('click', clickHandler);
};
