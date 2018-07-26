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

  window.pin.createPinsFragment = function (arr) {
    var fragment = document.createDocumentFragment();
    var i = 0;
    while (i < arr.length) {
      fragment.appendChild(renderPin(arr[i]));
      i = i + 1;
    }

    return fragment;
  };

  // var template = document.querySelector('template');

  // var templatePin = template.content.querySelector('.map__pin');
  // // создаёт pin
  // window.pin = {
  //   renderPin: function (point) {
  //     var pin = templatePin.cloneNode(true);
  //     var pinWidth = templatePin.offsetWidth;
  //     var pinHeight = templatePin.offsetHeight;
  //     pin.style.left = point.location.x - pinWidth / 2 + 'px';
  //     pin.style.top = point.location.y - pinHeight + 'px';
  //     pin.querySelector('img').src = point.author.avatar;
  //     pin.querySelector('img').alt = point.offer.title;
  //     pin.addEventListener('click', function () {
  //       if (activePin) {
  //         activePin.classList.remove('map__pin--active');
  //       }
  //       pin.classList.add('map__pin--active');
  //       activePin = pin;
  //       window.card.fillCard(point);
  //       document.addEventListener('keydown', window.card.closeEscCardHandler);
  //     });
  //     return pin;
  //   }
  // };
})();
