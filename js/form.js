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
  var FOR_1_GUEST = 0;
  var FOR_2_GUESTS = 1;
  var FOR_3_GUESTS = 2;
  var NOT_FOR_GUESTS = 3;
  var COMPLIANCES_ROOMS_CAPACITIES = [
    [FOR_2_GUESTS, FOR_3_GUESTS, NOT_FOR_GUESTS],
    [FOR_3_GUESTS, NOT_FOR_GUESTS],
    [NOT_FOR_GUESTS],
    [FOR_1_GUEST, FOR_2_GUESTS, FOR_3_GUESTS]
  ];

  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var successPopup = document.querySelector('.success');
  var mapPinMain = document.querySelector('.map__pin--main');
  var capacitySelect = adForm.querySelector('#capacity');

  function CustomValidation() {}
  CustomValidation.prototype = {
  // Установим пустой массив сообщений об ошибках
    invalidities: [],
    // Метод, проверяющий валидность
    checkValidity: function (input) {
      this.invalidities = [];
      var validity = input.validity;
      if (validity.rangeOverflow) {
        var max = input.getAttribute('max');
        this.addInvalidity('Максимальное значение ' + max);
      }
      if (validity.tooShort) {
        var minLength = input.getAttribute('minlength');
        this.addInvalidity('Минимальная длина ' + minLength);
      }
      if (validity.rangeUnderflow) {
        var min = input.getAttribute('min');
        this.addInvalidity('Минимальное значение ' + min);
      }
      if (validity.tooLong) {
        var maxLength = input.getAttribute('maxlength');
        this.addInvalidity('Максимальная длина ' + maxLength);
      }
      if (validity.valueMissing) {
        this.addInvalidity('Обязательно для заполнения');
      }
    },
    // Добавляем сообщение об ошибке в массив ошибок
    addInvalidity: function (message) {
      this.invalidities.push(message);
    },
    // Получаем общий текст сообщений об ошибках
    getInvalidities: function () {
      return this.invalidities.join('. \n');
    }
  };

  CustomValidation.prototype.getInvaliditiesForHTML = function () {
    return this.invalidities.join('. <br>');
  };
  // Добавляем обработчик клика на кнопку отправки формы
  var submit = document.querySelector('.ad-form__submit');
  submit.addEventListener('click', function (evt) {
  // Пройдёмся по всем полям
    capacitySelect.style.cssText = '';
    var stopSubmit = false;
    var inputs = document.querySelectorAll('.ad-form input');
    for (var j = 0; j < inputs.length; j++) {
      var input = inputs[j];
      input.style.cssText = '';
      // Проверим валидность поля, используя встроенную в JavaScript функцию checkValidity()
      if (!input.checkValidity()) {
        var inputCustomValidation = new CustomValidation(); // Создадим объект CustomValidation
        inputCustomValidation.checkValidity(input); // Выявим ошибки
        var customValidityMessage = inputCustomValidation.getInvalidities(); // Получим все сообщения об ошибках
        input.setCustomValidity(customValidityMessage); // Установим специальное сообщение об ошибке
        // Добавим ошибки в документ
        var customValidityMessageForHTML = inputCustomValidation.getInvaliditiesForHTML();
        input.insertAdjacentHTML('afterend', '<p class="error-message">' + customValidityMessageForHTML + '</p>');
        stopSubmit = true;
        input.style.cssText = 'border: 1px solid red; box-shadow: 0 0 3px red;';
      }
    }
    var index = capacitySelect.selectedIndex;
    if (capacitySelect.options[index].disabled) {
      stopSubmit = true;
      capacitySelect.insertAdjacentHTML('afterend', '<p class="error-message">Измените количество мест</p>');
      capacitySelect.style.cssText = 'border: 1px solid red; box-shadow: 0 0 3px red;';
    }
    setTimeout(function () {
      var errorMessages = adForm.querySelectorAll('.error-message');
      for (j = 0; j < errorMessages.length; j++) {
        errorMessages[j].remove();
      }
    }, 5000);
    if (stopSubmit) {
      evt.preventDefault();
    }
  });

  var selectTypeHouse = adForm.querySelector('#type');
  var priceHouse = adForm.querySelector('#price');
  function onSelectTypeChange() {
    priceHouse.placeholder = COMPLIANCE_TYPE_PRICE[selectTypeHouse.value];
    priceHouse.min = COMPLIANCE_TYPE_PRICE[selectTypeHouse.value];
  }
  selectTypeHouse.addEventListener('change', onSelectTypeChange);

  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  function onSelectTimeChange(evt) {
    if (evt.target === timeIn) {
      timeOut.selectedIndex = evt.target.selectedIndex;
    } else {
      timeIn.selectedIndex = evt.target.selectedIndex;
    }
  }
  timeIn.addEventListener('change', onSelectTimeChange);
  timeOut.addEventListener('change', onSelectTimeChange);

  var roomNumberSelect = adForm.querySelector('#room_number');
  function onSelectCapacityChange(evt) {
    var capacitySelectOptions = adForm.querySelectorAll('#capacity option');
    for (var j = 0; j < capacitySelectOptions.length; j++) {
      capacitySelectOptions[j].disabled = false;
    }
    var capacities = COMPLIANCES_ROOMS_CAPACITIES[evt.target.selectedIndex];
    for (j = 0; j < capacities.length; j++) {
      capacitySelect.options[capacities[j]].disabled = true;
    }
  }
  roomNumberSelect.addEventListener('change', onSelectCapacityChange);

  function deactivatePage() {
    var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    adForm.reset();
    map.classList.add('map--faded');
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
    var inputs = document.querySelectorAll('.ad-form input');
    for (i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      input.style.cssText = '';
    }
    capacitySelect.style.cssText = '';
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

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSuccessForm, window.map.onError);
  });
})();
