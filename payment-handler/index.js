var btnRegister = document.getElementById('register');
var msgResult = document.getElementById('result-msg');

function register() {

  if (navigator.serviceWorker) {

    navigator.serviceWorker.register('service-worker.js', {scope: './'})
      .then(function(registration) {

        // NB. The example code here shows 'paymentAppManager', but that's undefined for me:
        // https://github.com/w3c/payment-handler/blob/gh-pages/proposals/examples.md
        if (registration.paymentManager) {
          
          /*
          registration.paymentAppManager.options.set('-key', {
            enabledMethods: ['basic-card'],
            name: 'Card Provider Demo',
            id: 'P J TESTER;4111111111111111;01;25;123'
          });
          */

          registration.paymentManager.setManifest({
            name: 'CardProviderDemo',
            options: [{
              enabledMethods: ['basic-card'],
              name: 'Card Provider Demo',
              id: 'P J TESTER;4111111111111111;01;25;123'
            }]
          });

        } else {
          console.warn('Payment Handler API not supported');
          msgResult.innerHTML = 'Sorry the Payment Handler API is not supported in this browser';
        }

        return registration;

      }).then(function(sw) {
        console.log('Service worker', sw);
      }).catch(function(error) {
        console.error('Error registering service worker', error);
      });

  } else {
    console.warn('Service Worker API not supported');
    msgResult.innerHTML = 'Sorry the Service Worker API is not supported in this browser';
  }

}

btnRegister.addEventListener('click', register);