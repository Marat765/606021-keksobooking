'use strict';

(function () {
  var COORDINATES_Y_MIN = 130;
  var COORDINATES_Y_MAX = 630;
  var MAIN_PIN_SIZE_X = 62;
  var MAIN_PIN_SIZE_Y = 84;

  window.map = {};
  var i;

  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  adForm.querySelector('#address').value = (parseInt(mapPinMain.style.left, 10) + MAIN_PIN_SIZE_X / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAIN_PIN_SIZE_Y);
  var fieldsets = adForm.querySelectorAll('fieldset');
  for (i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = true;
  }
  map.querySelector('.map__filters').classList.add('visually-hidden');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
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
        right: map.offsetWidth,
        bottom: COORDINATES_Y_MAX,
        left: bodyMarginLeft
      };
      var newLocation = {
        x: shiftX,
        y: limits.top + shiftY
      };
      if (moveEvt.pageX - shiftX > (limits.right - MAIN_PIN_SIZE_X + bodyMarginLeft)) {
        newLocation.x = limits.right - MAIN_PIN_SIZE_X + shiftX;
      } else if (moveEvt.pageX - shiftX > limits.left) {
        newLocation.x = moveEvt.pageX - bodyMarginLeft;
      }
      if (moveEvt.pageY - shiftY > limits.bottom) {
        newLocation.y = limits.bottom + shiftY;
      } else if (moveEvt.pageY - shiftY > limits.top) {
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
    }

    document.addEventListener('mouseup', onDocumentMouseUp);
    document.addEventListener('mousemove', onDocumentMouseMove);
  });

  window.map.onCloseButtonClick = function () {
    var previousCard = map.querySelector('.map__card');
    if (previousCard) {
      previousCard.remove();
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
    setTimeout(function () {
      document.body.children[0].remove();
    }, 10000);
  };

  function onMapPinMainMouseUp(upEvt) {
    upEvt.preventDefault();
    map.classList.remove('map--faded');
    map.querySelector('.map__filters').classList.remove('visually-hidden');
    adForm.classList.remove('ad-form--disabled');
    var l = 0;
    while (l < fieldsets.length) {
      fieldsets[l].disabled = false;
      l = l + 1;
    }
    window.backend.load(window.filters.onLoadSuccess, window.map.onError);
    mapPinMain.removeEventListener('mouseup', onMapPinMainMouseUp);
  }

  window.map.loadPage = function () {
    mapPinMain.addEventListener('mouseup', onMapPinMainMouseUp);
  };
  window.map.loadPage();
})();
