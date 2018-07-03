'use strict';

var i;
var j;
var k;
var ADS_COUNT = 8;
var PHOTOS_COUNT = 3;
var MAP_PIN_SIZE_X = 50;
var MAP_PIN_SIZE_Y = 70;

var similarAds = [];
var titlesRandom = [];
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
  var getRandomNumber = function (a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  };
  var getRandomNumberFromZeroTo = function (b) {
    return Math.floor(Math.random() * (b + 1));
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
    return arr[getRandomNumberFromZeroTo(arr.length - 1)];
  };
  var getListOfFeatures = function (arr) {
    var listOfFeatures = [];
    k = getRandomNumberFromZeroTo(arr.length - 1);
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
        x: getRandomNumber(280, 1150),
        y: getRandomNumber(180, 630)
      },

      offer: {
        title: titlesRandom[i],
        address: location.x + ', ' + location.y,
        price: getRandomNumber(1000, 1000000),
        type: getRandomItem(TYPES),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 100),
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
i = 0;
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

  i = ALL_FEATURES.length - 1;
  while (i >= 0) {
    var flag = true;
    j = 0;
    while (flag && (j < similarAds[pinNumber].offer.features.length)) {
      if (ALL_FEATURES[i] === similarAds[pinNumber].offer.features[j]) {
        flag = false;
      }
      j = j + 1;
    }
    if (flag) {
      mapCard.querySelector('.popup__features').removeChild(mapCard.querySelector('.popup__features').children[i]);
    }
    i = i - 1;
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
