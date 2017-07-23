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

// Then we need to hook up function to event listeners…
