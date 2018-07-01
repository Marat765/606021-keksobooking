'use strict';

var i;
var j;
var NUMBER_SIMILAR_ADS = 8;
var MAP_PIN_SIZE_X = 50;
var MAP_PIN_SIZE_Y = 70;

var similarAds = [];
var ListOfFeatures = [];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checks = ['12:00', '13:00', '14:00'];
var allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var allPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

function getArray() {
  for (i = 0; i < NUMBER_SIMILAR_ADS; i++) {
    var getRandomItem = function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    };
    var getRandomNumber = function (a, b) {
      return Math.floor(Math.random() * (b - a) + a);
    };
    var getListOfFeatures = function (arr) {
      j = 0;
      while (j <= Math.floor(Math.random() * arr.length)) {
        ListOfFeatures[j] = arr[j];
        j = j + 1;
      }
      return ListOfFeatures;
    };
    similarAds[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      location: {
        x: getRandomNumber(280, 1150),
        y: getRandomNumber(130, 630)
      },

      offer: {
        title: titles[i],
        address: location.x + ', ' + location.y,
        price: getRandomNumber(1000, 1000000),
        type: getRandomItem(types),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(2, 10),
        checkin: getRandomItem(checks),
        checkout: getRandomItem(checks),
        features: getListOfFeatures(allFeatures),
        description: '',
        photos: allPhotos
      }
    };
    similarAds[i].offer.address = similarAds[i].location.x + ', ' + similarAds[i].location.y;
  }
}

getArray();

document.querySelector('.map').classList.remove('map--faded');

var mapPinTemplate = document.querySelector('template')
  .content
  .querySelector('.map__pin');

i = 0;
while (i < NUMBER_SIMILAR_ADS) {
  var adElement = mapPinTemplate.cloneNode(true);
  adElement.style = 'left: ' + (similarAds[i].location.x - MAP_PIN_SIZE_X / 2) + 'px; top: ' + (similarAds[i].location.y - MAP_PIN_SIZE_Y) + 'px;';
  adElement.querySelector('img').src = similarAds[i].author.avatar;
  adElement.querySelector('img').alt = similarAds[i].offer.title;
  document.querySelector('.map__pins').appendChild(adElement);
  i = i + 1;
}

var mapPinLayout = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);
mapPinLayout.querySelector('.popup__title').textContent = similarAds[0].offer.title;
mapPinLayout.querySelector('.popup__text--address').textContent = similarAds[0].offer.address;
mapPinLayout.querySelector('.popup__text--price').textContent = similarAds[0].offer.price + '₽/ночь';

var typeRu;
if (similarAds[0].offer.type === 'palace') {
  typeRu = 'Дворец';
} else if (similarAds[0].offer.type === 'flat') {
  typeRu = 'Квартира';
} else if (similarAds[0].offer.type === 'house') {
  typeRu = 'Дом';
} else if (similarAds[0].offer.type === 'bungalo') {
  typeRu = 'Бунгало';
}

mapPinLayout.querySelector('.popup__type').textContent = typeRu;
mapPinLayout.querySelector('.popup__text--capacity').textContent = similarAds[0].offer.rooms + ' комнаты для ' + similarAds[0].offer.guests + ' гостей';
mapPinLayout.querySelector('.popup__text--time').textContent = 'Заезд после ' + similarAds[0].offer.checkin + ', выезд до ' + similarAds[0].offer.checkout;

var flag;
i = allFeatures.length - 1;
while (i >= 0) {
  flag = true;
  j = 0;
  while (flag && (j < similarAds[0].offer.features.length)) {
    if (allFeatures[i] === similarAds[0].offer.features[j]) {
      flag = false;
    }
    j = j + 1;
  }
  if (flag) {
    mapPinLayout.querySelector('.popup__features').removeChild(mapPinLayout.querySelector('.popup__features').children[i]);
  }
  i = i - 1;
}

mapPinLayout.querySelector('.popup__description').textContent = similarAds[0].offer.description;
document.querySelector('template').content.querySelector('.popup__photo').cloneNode(true);
mapPinLayout.querySelector('.popup__photos').insertBefore(document.querySelector('template').content.querySelector('.popup__photo').cloneNode(true), null);
mapPinLayout.querySelector('.popup__photos').children[1].src = similarAds[0].offer.photos[1];
document.querySelector('template').content.querySelector('.popup__photo').cloneNode(true);
mapPinLayout.querySelector('.popup__photos').insertBefore(document.querySelector('template').content.querySelector('.popup__photo').cloneNode(true), null);
mapPinLayout.querySelector('.popup__photos').children[2].src = similarAds[0].offer.photos[2];
mapPinLayout.querySelector('.popup__photos').children[0].src = similarAds[0].offer.photos[0];
mapPinLayout.querySelector('.popup__avatar').src = similarAds[0].author.avatar;

document.querySelector('.map').insertBefore(mapPinLayout, document.querySelector('.map__filters-container'));
