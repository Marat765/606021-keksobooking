'use strict';

(function () {
  window.map = {};
  var COORDINATES_Y_MIN = 180;
  var COORDINATES_Y_MAX = 670;
  var MAIN_PIN_SIZE_X = 62;
  var MAIN_PIN_SIZE_Y = 84;
  var i;
  var posterArr;

  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  adForm.querySelector('#address').value = (parseInt(mapPinMain.style.left, 10) + MAIN_PIN_SIZE_X / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAIN_PIN_SIZE_Y);
  var fieldsets = adForm.querySelectorAll('fieldset');
  for (i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = true;
  }

  function setPageToActiveMode() {
    document.querySelector('.map').classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    var l = 0;
    while (l < fieldsets.length) {
      fieldsets[l].disabled = false;
      l = l + 1;
    }
    document.querySelector('.map__pins').appendChild(window.pin.createPinsFragment(posterArr));
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    l = 0;
    while (l < mapPins.length) {
      mapPins[l].addEventListener('click', window.card.generateClickHahdler(posterArr[l]));
      l = l + 1;
    }
    mapPinMain.removeEventListener('mouseup', setPageToActiveMode);
  }

  function clickMainPin() {
    mapPinMain.addEventListener('mouseup', setPageToActiveMode);
  }

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;
    function getCoords(elem) {
      var box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }
    var coords = getCoords(mapPinMain);
    var shiftX = evt.pageX - coords.left;
    var shiftY = evt.pageY - coords.top;

    function onDocumentMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var computedStyle = getComputedStyle(document.body);
      var bodyMarginLeft = parseInt(computedStyle.marginLeft, 10);
      var limits = {
        top: COORDINATES_Y_MIN,
        right: document.querySelector('.map').offsetWidth,
        bottom: COORDINATES_Y_MAX,
        left: bodyMarginLeft
      };
      dragged = true;
      var newLocation = {
        x: shiftX,
        y: limits.top - MAIN_PIN_SIZE_Y + shiftY
      };
      if (moveEvt.pageX - shiftX > (limits.right - MAIN_PIN_SIZE_X + bodyMarginLeft)) {
        newLocation.x = limits.right - MAIN_PIN_SIZE_X + shiftX;
      } else if (moveEvt.pageX - shiftX > limits.left) {
        newLocation.x = moveEvt.pageX - bodyMarginLeft;
      }
      if (moveEvt.pageY - shiftY > limits.bottom - MAIN_PIN_SIZE_Y) {
        newLocation.y = limits.bottom - MAIN_PIN_SIZE_Y + shiftY;
      } else if (moveEvt.pageY - shiftY > limits.top - MAIN_PIN_SIZE_Y) {
        newLocation.y = moveEvt.pageY;
      }
      mapPinMain.style.left = newLocation.x - shiftX + 'px';
      mapPinMain.style.top = newLocation.y - shiftY + 'px';
      document.querySelector('#address').value = (mapPinMain.offsetLeft + MAIN_PIN_SIZE_X / 2) + ', ' + (mapPinMain.offsetTop + MAIN_PIN_SIZE_Y);
    }

    function onDocumentMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    }

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  });

  window.map.deleteCard = function () {
    var previousCard = map.querySelector('.map__card');

    if (previousCard) {
      map.removeChild(previousCard);
    }
  };

  window.map.onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(255, 50, 0, 0.7); top: 200px; left: 50%; transform: translateX(-50%); box-shadow: 0 0 50px rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 50, 0, 0.7); border-radius: 20px';
    node.style.position = 'fixed';
    node.style.padding = '50px 30px';
    node.style.fontfamily = 'Arial';
    node.style.color = 'white';
    node.style.fontSize = '24px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  function onSuccess(cardsArray) {
    posterArr = cardsArray;
    clickMainPin();
  }

  window.backend.load(onSuccess, window.map.onError);

})();
