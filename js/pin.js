'use strict';

(function () {
  window.pin = {};
  var mapPinTemplate = document.querySelector('template')
  .content
  .querySelector('.map__pin');
  function renderPin(ad) {
    var MAP_PIN_SIZE_X = 50;
    var MAP_PIN_SIZE_Y = 70;
    var adElement = mapPinTemplate.cloneNode(true);
    adElement.style = 'left: ' + (ad.location.x - MAP_PIN_SIZE_X / 2) + 'px; top: ' + (ad.location.y - MAP_PIN_SIZE_Y) + 'px;';
    adElement.querySelector('img').src = ad.author.avatar;
    adElement.querySelector('img').alt = ad.offer.title;
    return adElement;
  }

  window.pin.createPinsFragment = function (arr) {
    var fragment = document.createDocumentFragment();
    var i = 0;
    while (i < arr.length) {
      fragment.appendChild(renderPin(arr[i]));
      i = i + 1;
    }

    return fragment;
  };
})();
