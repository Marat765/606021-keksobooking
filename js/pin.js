'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var MAP_PIN_SIZE_X = 50;
  var MAP_PIN_SIZE_Y = 70;

  window.pin = {};
  var mapPinTemplate = document.querySelector('template')
  .content
  .querySelector('.map__pin');
  var activePin = null;

  window.pin.renderPin = function (ad) {
    var adElement = mapPinTemplate.cloneNode(true);
    adElement.style = 'left: ' + (ad.location.x - MAP_PIN_SIZE_X / 2) + 'px; top: ' + (ad.location.y - MAP_PIN_SIZE_Y) + 'px;';
    adElement.querySelector('img').src = ad.author.avatar;
    adElement.querySelector('img').alt = ad.offer.title;

    adElement.addEventListener('click', function () {
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
      adElement.classList.add('map__pin--active');
      activePin = adElement;
      document.addEventListener('keydown', onDocumentKeydown);
    });
    return adElement;
  };

  function onDocumentKeydown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.map.deleteCard();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  }

  window.pin.createPinsFragment = function (arr) {
    var fragment = document.createDocumentFragment();
    var i = 0;
    while (i < arr.length) {
      fragment.appendChild(window.pin.renderPin(arr[i]));
      i = i + 1;
    }

    return fragment;
  };
})();
