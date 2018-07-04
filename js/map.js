'use strict';

var ADS_COUNT = 8;
var PHOTOS_COUNT = 3;
var MAP_PIN_SIZE_X = 50;
var MAP_PIN_SIZE_Y = 70;
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

var similarAds = [];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME_STAMPS = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME_STAMPS = ['12:00', '13:00', '14:00'];
var ALL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ALL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var COMPLIANCE_OF_NAMES_OF_TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

function getAdvertisement() {
  var i;
  var j;
  var k;
  var titlesRandom = [];
  var getRandomNumber = function (a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  };
  var getRandomNumberFromZeroTo = function (b) {
    return Math.floor(Math.random() * b);
  };
  var getRandomArray = function (arr) {
    var randomArray = arr.slice();
    var temp;
    for (k = arr.length - 1; k > 0; k--) {
      j = getRandomNumberFromZeroTo(k);
      temp = randomArray[j];
      randomArray[j] = randomArray[k];
      randomArray[k] = temp;
    }
    return randomArray;
  };
  var getRandomItem = function (arr) {
    return arr[getRandomNumberFromZeroTo(arr.length)];
  };
  var getListOfFeatures = function (arr) {
    var listOfFeatures = [];
    k = getRandomNumberFromZeroTo(arr.length);
    listOfFeatures = arr.slice(0, k + 1);
    return listOfFeatures;
  };
  titlesRandom = getRandomArray(TITLES);

  for (i = 0; i < ADS_COUNT; i++) {
    similarAds[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      location: {
        x: getRandomNumber(COORDINATES_X_MIN, COORDINATES_X_MAX),
        y: getRandomNumber(COORDINATES_Y_MIN, COORDINATES_Y_MAX)
      },

      offer: {
        title: titlesRandom[i],
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
    similarAds[i].offer.address = similarAds[i].location.x + ', ' + similarAds[i].location.y;
  }
}

getAdvertisement();

document.querySelector('.map').classList.remove('map--faded');

var mapPinTemplate = document.querySelector('template')
  .content
  .querySelector('.map__pin');

var renderPin = function (ad) {
  var adElement = mapPinTemplate.cloneNode(true);
  adElement.style = 'left: ' + (ad.location.x - MAP_PIN_SIZE_X / 2) + 'px; top: ' + (ad.location.y - MAP_PIN_SIZE_Y) + 'px;';
  adElement.querySelector('img').src = ad.author.avatar;
  adElement.querySelector('img').alt = ad.offer.title;
  return adElement;
};

var fragment = document.createDocumentFragment();
var i = 0;
while (i < similarAds.length) {
  fragment.appendChild(renderPin(similarAds[i]));
  i = i + 1;
}
document.querySelector('.map__pins').appendChild(fragment);

var mapCard = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);

var renderCard = function (pinNumber) {
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
  i = 0;
  while (i < similarAds[pinNumber].offer.features.length) {
    var featuresElement = document.createElement('li');
    featuresElement.classList.add('popup__feature');
    featuresElement.classList.add('popup__feature--' + similarAds[pinNumber].offer.features[i]);
    mapFeatures.appendChild(featuresElement);
    i = i + 1;
  }

  mapCard.querySelector('.popup__description').textContent = similarAds[pinNumber].offer.description;
  var templatePhoto = mapCard.querySelector('.popup__photos').removeChild(mapCard.querySelector('.popup__photo'));
  i = 0;
  while (i < PHOTOS_COUNT) {
    mapCard.querySelector('.popup__photos').insertBefore(templatePhoto.cloneNode(true), null);
    mapCard.querySelector('.popup__photos').children[i].src = similarAds[pinNumber].offer.photos[i];
    i = i + 1;
  }
  mapCard.querySelector('.popup__avatar').src = similarAds[pinNumber].author.avatar;

  document.querySelector('.map').insertBefore(mapCard, document.querySelector('.map__filters-container'));
};

renderCard(0);
