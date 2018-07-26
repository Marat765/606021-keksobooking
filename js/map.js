'use strict';

(function () {
  var COORDINATES_Y_MIN = 130;
  var COORDINATES_Y_MAX = 630;
  var MAIN_PIN_SIZE_X = 62;
  var MAIN_PIN_SIZE_Y = 84;

  window.map = {};
  var i;
  // var posterArr;

  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  // function checkMapFaded() {
  //   return map.classList.contains('map--faded');
  // }
  adForm.querySelector('#address').value = (parseInt(mapPinMain.style.left, 10) + MAIN_PIN_SIZE_X / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAIN_PIN_SIZE_Y);
  var fieldsets = adForm.querySelectorAll('fieldset');
  for (i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = true;
  }

  window.map.setPageToActiveMode = function () {
    document.querySelector('.map').classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    var l = 0;
    while (l < fieldsets.length) {
      fieldsets[l].disabled = false;
      l = l + 1;
    }
    var data = window.filters.updateData();
    // document.querySelector('.map__pins').appendChild(window.pin.createPinsFragment(window.map.posterArr));
    window.pin.createPinsFragment(data);
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    l = 0;
    while (l < mapPins.length) {
      mapPins[l].addEventListener('click', window.card.generateClickHandler(data[l]));
      l = l + 1;
    }
    // function list() {
    //   return Array.prototype.slice.call(arguments, 0);
    // }
    // var list1 = list(1, 2, 3);
    // window.map.pins = list(mapPins);
    // for (i = 6; i < mapPins.length; i++) {
    //   mapPins[i].remove();
    // }
    // for (l = 0; l < mapPins.length; l++) {
    //   mapPins[l].remove();
    // }
    // for (i = 0; i < 5; i++) {
    //   mapPins[i].classList.add('hidden');
    // }
  };

  // var dragged = false;

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    // dragged = false;
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
      // dragged = true;
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

    // function onDocumentMouseUp(upEvt) {
    //   upEvt.preventDefault();
    //   if (checkMapFaded()) {
    //     // window.backend.load(onSuccess, window.map.onError);
    //     window.backend.load(window.filters.onLoadSuccess, window.map.onError);
    //   }
    //   document.removeEventListener('mousemove', onDocumentMouseMove);
    //   document.removeEventListener('mouseup', onDocumentMouseUp);
    //   if (dragged) {
    //     var onClickPreventDefault = function () {
    //       evt.preventDefault();
    //       mapPinMain.removeEventListener('click', onClickPreventDefault);
    //     };
    //     mapPinMain.addEventListener('click', onClickPreventDefault);
    //   }
    // }

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mouseup', onMouseUp);

    document.addEventListener('mousemove', onDocumentMouseMove);
    // document.addEventListener('mouseup', onPinMainMouseUp);
  });

  window.map.onCloseButtonClick = function () {
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
    setTimeout(function () {
      document.body.children[0].remove();
    }, 10000);
  };

  function onPinMainMouseUp(upEvt) {
    upEvt.preventDefault();
    document.querySelector('.map').classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    var l = 0;
    while (l < fieldsets.length) {
      fieldsets[l].disabled = false;
      l = l + 1;
    }
    window.backend.load(window.filters.onLoadSuccess, window.map.onError);
    var data = window.filters.updateData();
    // document.querySelector('.map__pins').appendChild(window.pin.createPinsFragment(window.map.posterArr));
    window.pin.createPinsFragment(data);
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    l = 0;
    while (l < mapPins.length) {
      mapPins[l].addEventListener('click', window.card.generateClickHandler(data[l]));
      l = l + 1;
    }
    mapPinMain.removeEventListener('mouseup', onPinMainMouseUp);
    // if (dragged) {
    //   var onClickPreventDefault = function () {
    //     upEvt.preventDefault();
    //     mapPinMain.removeEventListener('click', onClickPreventDefault);
    //   };
    //   mapPinMain.addEventListener('click', onClickPreventDefault);
    // }
  }

  var loadPage = function () {
    mapPinMain.addEventListener('mouseup', onPinMainMouseUp);
  };
  loadPage();

  // function onSuccess(cardsArray) {
  //   window.map.posterArr = cardsArray;
  //   // window.card.generateCli = function () {
  //   //   return function () {
  //   //     window.map.ddd = window.map.posterArr;
  //   //   };
  //   // };
  //   setPageToActiveMode();
  // }
})();
