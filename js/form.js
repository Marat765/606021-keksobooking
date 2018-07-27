'use strict';

(function () {
  var MAIN_PIN_SIZE_X = 62;
  var MAIN_PIN_SIZE_Y = 84;
  var MAIN_PIN_X = 570;
  var MAIN_PIN_Y = 375;
  var ESC_KEYCODE = 27;
  var PRICE_MIN_BUNGALO = 0;
  var PRICE_MIN_FLAT = 1000;
  var PRICE_MIN_HOUSE = 5000;
  var PRICE_MIN_PALACE = 10000;
  var COMPLIANCE_TYPE_PRICE = {
    palace: PRICE_MIN_PALACE,
    flat: PRICE_MIN_FLAT,
    house: PRICE_MIN_HOUSE,
    bungalo: PRICE_MIN_BUNGALO
  };

  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var successPopup = document.querySelector('.success');
  var mapPinMain = document.querySelector('.map__pin--main');
  var capacitySelect = adForm.querySelector('#capacity');
  var submit = adForm.querySelector('.ad-form__submit');
  var titleInput = adForm.querySelector('#title');
  var roomNumberSelect = adForm.querySelector('#room_number');

  function showError(element, condition, message) {
    if (condition) {
      element.style.borderColor = 'red';
      element.setCustomValidity(message);
    } else {
      element.setCustomValidity('');
    }
  }

  var selectType = adForm.querySelector('#type');
  var priceHouse = adForm.querySelector('#price');
  function onSelectTypeChange() {
    priceHouse.placeholder = COMPLIANCE_TYPE_PRICE[selectType.value];
    priceHouse.min = COMPLIANCE_TYPE_PRICE[selectType.value];
  }
  selectType.addEventListener('change', onSelectTypeChange);

  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  function synchronizeTime(evt) {
    if (evt.target === timeIn) {
      timeOut.selectedIndex = evt.target.selectedIndex;
    } else {
      timeIn.selectedIndex = evt.target.selectedIndex;
    }
  }
  timeIn.addEventListener('change', function (evt) {
    synchronizeTime(evt);
  });
  timeOut.addEventListener('change', function (evt) {
    synchronizeTime(evt);
  });

  function checkNumberOfGuests() {
    switch (+roomNumberSelect.value) {
      case 1:
        showError(capacitySelect, (+capacitySelect.value === 2 || +capacitySelect.value === 3 || +capacitySelect.value === 0), 'Для одного гостя');
        break;
      case 2:
        showError(capacitySelect, (+capacitySelect.value === 3 || +capacitySelect.value === 0), 'Не более двух гостей');
        break;
      case 3:
        showError(capacitySelect, (+capacitySelect.value === 0), 'Не более трех гостей');
        break;
      case 100:
        showError(capacitySelect, (!(+capacitySelect.value === 0)), 'Не для гостей');
        break;
    }
  }

  function deactivatePage() {
    var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    adForm.reset();
    map.classList.add('map--faded');
    map.querySelector('.map__filters').reset();
    map.querySelector('.map__filters').classList.add('visually-hidden');
    adForm.classList.add('ad-form--disabled');
    mapPinMain.style.left = MAIN_PIN_X + 'px';
    mapPinMain.style.top = MAIN_PIN_Y + 'px';
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].remove();
    }
    window.map.onCloseButtonClick();
    adForm.querySelector('#address').value = (parseInt(mapPinMain.style.left, 10) + MAIN_PIN_SIZE_X / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAIN_PIN_SIZE_Y);
    var fieldsets = adForm.querySelectorAll('fieldset');
    for (i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = true;
    }
    capacitySelect.style.borderColor = '#d9d9d3';
    titleInput.style.borderColor = '#d9d9d3';
    priceHouse.style.borderColor = '#d9d9d3';
    priceHouse.placeholder = PRICE_MIN_FLAT;
    priceHouse.min = PRICE_MIN_FLAT;
    window.map.loadPage();
  }

  function onSuccessPopupClick() {
    successPopup.classList.add('hidden');
    document.removeEventListener('keydown', onSuccessPopupEscPress);
  }

  function onSuccessPopupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onSuccessPopupClick();
    }
  }

  function openPopup() {
    successPopup.classList.remove('hidden');
    document.addEventListener('keydown', onSuccessPopupEscPress);
  }

  function onSuccessForm() {
    openPopup();
    successPopup.addEventListener('keydown', onSuccessPopupEscPress);
    successPopup.addEventListener('click', onSuccessPopupClick);
    deactivatePage();
  }

  adForm.querySelector('.ad-form__reset').addEventListener('click', function () {
    deactivatePage();
  });

  submit.addEventListener('click', function () {
    capacitySelect.style.borderColor = '#d9d9d3';
    titleInput.style.borderColor = '#d9d9d3';
    priceHouse.style.borderColor = '#d9d9d3';
    checkNumberOfGuests();
    showError(titleInput, (titleInput.value.length < 30 || titleInput.value.length > 100), 'Поле должно содержать от 30 до 100 символов');
    if (!priceHouse.validity.valid) {
      priceHouse.style.borderColor = 'red';
    }
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSuccessForm, window.map.onError);
  });
})();
