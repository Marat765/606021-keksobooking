'use strict';

(function () {
  var ADS_COUNT = 8;
  var COORDINATES_Y_MIN = 180;
  var COORDINATES_Y_MAX = 670;
  var MAIN_PIN_SIZE_X = 62;
  var MAIN_PIN_SIZE_Y = 84;
  var i;

  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
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
    document.querySelector('.map__pins').appendChild(window.pin.fragment);
    l = 0;
    while (l < ADS_COUNT) {
      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      mapPins[l].addEventListener('click', window.card.generateClickHahdler(l));
      l = l + 1;
    }
  }

  mapPinMain.addEventListener('mouseup', function () {
    setPageToActiveMode();
  });

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
})();
