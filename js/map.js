'use strict';

var similarAds = [];
var ADS_COUNT = 8;
var i;

function getAdvertisement() {
  var COORDINATES_X_MIN = 280;
  var COORDINATES_X_MAX = 1150;
  var COORDINATES_Y_MIN = 180;
  var COORDINATES_Y_MAX = 630;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 100;
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_TIME_STAMPS = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME_STAMPS = ['12:00', '13:00', '14:00'];
  var ALL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ALL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var m;
  var j;
  var titlesRandom = [];

  function getRandomNumber(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  }
  function getRandomNumberFromZeroTo(b) {
    return Math.floor(Math.random() * b);
  }
  function getRandomArray(arr) {
    var randomArray = arr.slice();
    var temp;
    for (var k = arr.length - 1; k > 0; k--) {
      j = getRandomNumberFromZeroTo(k);
      temp = randomArray[j];
      randomArray[j] = randomArray[k];
      randomArray[k] = temp;
    }
    return randomArray;
  }
  function getRandomItem(arr) {
    return arr[getRandomNumberFromZeroTo(arr.length)];
  }
  function getListOfFeatures(arr) {
    var listOfFeatures = [];
    var k = getRandomNumberFromZeroTo(arr.length);
    listOfFeatures = arr.slice(0, k + 1);
    return listOfFeatures;
  }
  titlesRandom = getRandomArray(TITLES);

  for (m = 0; m < ADS_COUNT; m++) {
    similarAds[m] = {
      author: {
        avatar: 'img/avatars/user0' + (m + 1) + '.png'
      },

      location: {
        x: getRandomNumber(COORDINATES_X_MIN, COORDINATES_X_MAX),
        y: getRandomNumber(COORDINATES_Y_MIN, COORDINATES_Y_MAX)
      },

      offer: {
        title: titlesRandom[m],
        address: location.x + ', ' + location.y,
        price: getRandomNumber(PRICE_MIN, PRICE_MAX),
        type: getRandomItem(TYPES),
        rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        checkin: getRandomItem(CHECKIN_TIME_STAMPS),
        checkout: getRandomItem(CHECKOUT_TIME_STAMPS),
        features: getListOfFeatures(getRandomArray(ALL_FEATURES)),
        description: '',
        photos: getRandomArray(ALL_PHOTOS)
      }
    };
    similarAds[m].offer.address = similarAds[m].location.x + ', ' + similarAds[m].location.y;
  }
}

getAdvertisement();

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

var fragment = document.createDocumentFragment();
i = 0;
while (i < similarAds.length) {
  fragment.appendChild(renderPin(similarAds[i]));
  i = i + 1;
}

var mapCard;

function renderCard(pinNumber) {
  var PHOTOS_COUNT = 3;
  var COMPLIANCE_OF_NAMES_OF_TYPES = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var m;

  mapCard.querySelector('.popup__title').textContent = similarAds[pinNumber].offer.title;
  mapCard.querySelector('.popup__text--address').textContent = similarAds[pinNumber].offer.address;
  mapCard.querySelector('.popup__text--price').textContent = similarAds[pinNumber].offer.price + '₽/ночь';
  mapCard.querySelector('.popup__type').textContent = COMPLIANCE_OF_NAMES_OF_TYPES[similarAds[pinNumber].offer.type];
  mapCard.querySelector('.popup__text--capacity').textContent = similarAds[pinNumber].offer.rooms + ' комнаты для ' + similarAds[pinNumber].offer.guests + ' гостей';
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + similarAds[pinNumber].offer.checkin + ', выезд до ' + similarAds[pinNumber].offer.checkout;

  var mapFeatures = mapCard.querySelector('.popup__features');
  while (mapFeatures.firstChild) {
    mapFeatures.removeChild(mapFeatures.firstChild);
  }
  m = 0;
  while (m < similarAds[pinNumber].offer.features.length) {
    var featuresElement = document.createElement('li');
    featuresElement.classList.add('popup__feature');
    featuresElement.classList.add('popup__feature--' + similarAds[pinNumber].offer.features[m]);
    mapFeatures.appendChild(featuresElement);
    m = m + 1;
  }

  mapCard.querySelector('.popup__description').textContent = similarAds[pinNumber].offer.description;
  var templatePhoto = mapCard.querySelector('.popup__photos').removeChild(mapCard.querySelector('.popup__photo'));
  m = 0;
  while (m < PHOTOS_COUNT) {
    mapCard.querySelector('.popup__photos').insertBefore(templatePhoto.cloneNode(true), null);
    mapCard.querySelector('.popup__photos').children[m].src = similarAds[pinNumber].offer.photos[m];
    m = m + 1;
  }
  mapCard.querySelector('.popup__avatar').src = similarAds[pinNumber].author.avatar;
}


document.querySelector('#address').value = '300, 404';
var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.querySelectorAll('fieldset');
for (var m = 0; m < fieldsets.length; m++) {
  fieldsets[m].disabled = true;
}

function generateClickHahdler(l) {
  return function () {
    mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    mapCard = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);
    renderCard(l);
    var a = mapCard;
    document.querySelector('.map').insertBefore(a, document.querySelector('.map__filters-container'));
  };
}

function setPageToActiveMode() {
  document.querySelector('.map').classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  var l = 0;
  while (l < fieldsets.length) {
    fieldsets[l].disabled = false;
    l = l + 1;
  }
  document.querySelector('.map__pins').appendChild(fragment);

  l = 0;
  while (l < ADS_COUNT) {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins[l].addEventListener('click', generateClickHahdler(l));
    l = l + 1;
  }
}

function setValueOfAddress(evt) {
  document.querySelector('#address').value = evt.pageX + ', ' + evt.pageY;
}

document.querySelector('.map__pin--main').addEventListener('mouseup', function (evt) {
  setPageToActiveMode();
  setValueOfAddress(evt);
});


function getAttributeValue(elem, attribute) {
  return elem.getAttribute(attribute);
}
function CustomValidation() {}

CustomValidation.prototype = {
  // Установим пустой массив сообщений об ошибках
  invalidities: [],
  // Метод, проверяющий валидность
  checkValidity: function (input) {
    this.invalidities = [];
    var validity = input.validity;
    if (validity.rangeOverflow) {
      var max = getAttributeValue(input, 'max');
      this.addInvalidity('Максимальное значение ' + max);
    }
    if (validity.rangeUnderflow) {
      var min = getAttributeValue(input, 'min');
      this.addInvalidity('Минимальное значение ' + min);
    }
    if (validity.tooShort) {
      var minlength = getAttributeValue(input, 'minlength');
      this.addInvalidity('Минимальная длина ' + minlength);
    }
    if (validity.tooLong) {
      var maxlength = getAttributeValue(input, 'maxlength');
      this.addInvalidity('Максимальная длина ' + maxlength);
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
  var stopSubmit = false;
  var inputs = document.querySelectorAll('.ad-form input');
  for (var j = 0; j < inputs.length; j++) {
    var input = inputs[j];
    // Проверим валидность поля, используя встроенную в JavaScript функцию checkValidity()
    if (input.checkValidity() === false) {
      var inputCustomValidation = new CustomValidation(); // Создадим объект CustomValidation
      inputCustomValidation.checkValidity(input); // Выявим ошибки
      var customValidityMessage = inputCustomValidation.getInvalidities(); // Получим все сообщения об ошибках
      input.setCustomValidity(customValidityMessage); // Установим специальное сообщение об ошибке
      // Добавим ошибки в документ
      var customValidityMessageForHTML = inputCustomValidation.getInvaliditiesForHTML();
      input.insertAdjacentHTML('afterend', '<p class="error-message">' + customValidityMessageForHTML + '</p>');
      stopSubmit = true;
    }
  }
  setTimeout(function () {
    var errorMessages = document.querySelectorAll('.error-message');
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
  var PRICE_MIN_BUNGALO = 0;
  var PRICE_MIN_FLAT = 1000;
  var PRICE_MIN_HOUSE = 5000;
  var PRICE_MIN_PALACE = 10000;
  if (selectTypeHouse.value === 'bungalo') {
    priceHouse.placeholder = PRICE_MIN_BUNGALO + '';
    priceHouse.min = PRICE_MIN_BUNGALO;
  } else if (selectTypeHouse.value === 'flat') {
    priceHouse.placeholder = PRICE_MIN_FLAT + '';
    priceHouse.min = PRICE_MIN_FLAT;
  } else if (selectTypeHouse.value === 'house') {
    priceHouse.placeholder = PRICE_MIN_HOUSE + '';
    priceHouse.min = PRICE_MIN_HOUSE;
  } else if (selectTypeHouse.value === 'palace') {
    priceHouse.placeholder = PRICE_MIN_PALACE + '';
    priceHouse.min = PRICE_MIN_PALACE;
  }
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
var capacitySelect = adForm.querySelector('#capacity');
function onSelectCapacityChange(evt) {
  function deleteAttrDisabled() {
    var capacitySelectOptions = adForm.querySelectorAll('#capacity option');
    for (var j = 0; j < capacitySelectOptions.length; j++) {
      capacitySelectOptions[j].disabled = false;
    }
  }
  if (evt.target.selectedIndex === 3) {
    deleteAttrDisabled();
    capacitySelect.selectedIndex = 3;
    capacitySelect.options[0].disabled = true;
    capacitySelect.options[1].disabled = true;
    capacitySelect.options[2].disabled = true;
  } else if (evt.target.selectedIndex === 0) {
    deleteAttrDisabled();
    capacitySelect.selectedIndex = 2;
    capacitySelect.options[0].disabled = true;
    capacitySelect.options[1].disabled = true;
    capacitySelect.options[3].disabled = true;
  } else if (evt.target.selectedIndex === 1) {
    deleteAttrDisabled();
    capacitySelect.selectedIndex = 1;
    capacitySelect.options[0].disabled = true;
    capacitySelect.options[3].disabled = true;
  } else if (evt.target.selectedIndex === 2) {
    deleteAttrDisabled();
    capacitySelect.selectedIndex = 0;
    capacitySelect.options[3].disabled = true;
  }
}
roomNumberSelect.addEventListener('change', onSelectCapacityChange);
