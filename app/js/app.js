import {router} from './router.js';
import '../examples/is-offline.js';
import '../examples/offline-links.js';
import {registerWorker} from './sw-register.js';

router('#slideshow');

window.addEventListener('load', function() {
  registerWorker('/sw.js');
});
