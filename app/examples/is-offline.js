let alert = document.getElementById('alert');

let updateStatus = () => {
  let isOnline = navigator.onLine;

  document.documentElement.classList.toggle('is-offline', !isOnline);
  alert.textContent = isOnline ? 'Online' : 'Offline';

  if (isOnline) {
    setTimeout(() => {
      alert.hidden = true;
    }, 3000);
  } else {
    alert.hidden = false;
  }
};

// hook up updateStatus to event listeners…
let checkConnectivity = () => {
  if (typeof navigator.onLine === 'undefined') {
    return;
  }

  updateStatus();
  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
};

window.addEventListener('load', checkConnectivity);
