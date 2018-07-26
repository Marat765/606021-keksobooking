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

  function renderPin(ad) {
    var adClone = mapPinTemplate.cloneNode(true);
    adClone.style = 'left: ' + (ad.location.x - MAP_PIN_SIZE_X / 2) + 'px; top: ' + (ad.location.y - MAP_PIN_SIZE_Y) + 'px;';
    adClone.querySelector('img').src = ad.author.avatar;
    adClone.querySelector('img').alt = ad.offer.title;

    adClone.addEventListener('click', function () {
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
      adClone.classList.add('map__pin--active');
      activePin = adClone;
      document.addEventListener('keydown', onDocumentKeydown);
    });
    return adClone;
  }

  function onDocumentKeydown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.map.onCloseButtonClick();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  }

  window.pin.renderPinsFragment = function (arr) {
    var fragment = document.createDocumentFragment();
    var i = 0;
    while (i < arr.length) {
      fragment.appendChild(renderPin(arr[i]));
      i = i + 1;
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };
})();
