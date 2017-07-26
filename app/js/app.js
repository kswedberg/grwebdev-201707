import {router} from './router.js';
import '../examples/is-offline.js';
import '../examples/offline-links.js';
import {registerWorker} from './sw-register.js';
import {pagerToggle} from './pager-toggle.js';

router('#slideshow');
pagerToggle();

window.addEventListener('load', function() {
  registerWorker('/sw.js');
});
