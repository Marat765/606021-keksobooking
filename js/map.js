'use strict';

var i;
var j;
var k;
var NUMBER_SIMILAR_ADS = 8;
var NUMBER_OF_PHOTOS = 3;
var MAP_PIN_SIZE_X = 50;
var MAP_PIN_SIZE_Y = 70;

var similarAds = [];
var ListOfFeatures = [];
var titlesRandom = [];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var allPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

function getArray() {
  var getRandomNumber = function (a, b) {
    return Math.floor(Math.random() * (b - a) + a);
  };
  var getRandomArray = function (arr) {
    var randomArray = arr;
    j = arr.length - 1;
    while (j > 0) {
      var Temp = randomArray[j];
      k = getRandomNumber(0, j);
      randomArray[j] = randomArray[k];
      randomArray[k] = Temp;
      j = j - 1;
    }
    return randomArray;
  };
  var getRandomItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };
  var getListOfFeatures = function (arr) {
    j = 0;
    k = getRandomNumber(-1, arr.length - 1);
    while (j <= k) {
      ListOfFeatures[j] = arr[j];
      j = j + 1;
    }
    return ListOfFeatures;
  };
  titlesRandom = getRandomArray(titles);
  for (i = 0; i < NUMBER_SIMILAR_ADS; i++) {
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
        type: getRandomItem(types),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 100),
        checkin: getRandomItem(checkin),
        checkout: getRandomItem(checkout),
        features: getListOfFeatures(getRandomArray(allFeatures)),
        description: '',
        photos: getRandomArray(allPhotos)
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

  var typeRu;
  if (similarAds[pinNumber].offer.type === 'palace') {
    typeRu = 'Дворец';
  } else if (similarAds[pinNumber].offer.type === 'flat') {
    typeRu = 'Квартира';
  } else if (similarAds[pinNumber].offer.type === 'house') {
    typeRu = 'Дом';
  } else if (similarAds[pinNumber].offer.type === 'bungalo') {
    typeRu = 'Бунгало';
  }

  mapCard.querySelector('.popup__type').textContent = typeRu;
  mapCard.querySelector('.popup__text--capacity').textContent = similarAds[pinNumber].offer.rooms + ' комнаты для ' + similarAds[pinNumber].offer.guests + ' гостей';
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + similarAds[pinNumber].offer.checkin + ', выезд до ' + similarAds[pinNumber].offer.checkout;

  var flag;
  i = allFeatures.length - 1;
  while (i >= 0) {
    flag = true;
    j = 0;
    while (flag && (j < similarAds[pinNumber].offer.features.length)) {
      if (allFeatures[i] === similarAds[pinNumber].offer.features[j]) {
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
  while (i < NUMBER_OF_PHOTOS) {
    mapCard.querySelector('.popup__photos').insertBefore(templatePhoto.cloneNode(true), null);
    mapCard.querySelector('.popup__photos').children[i].src = similarAds[pinNumber].offer.photos[i];
    i = i + 1;
  }
  mapCard.querySelector('.popup__avatar').src = similarAds[pinNumber].author.avatar;

  document.querySelector('.map').insertBefore(mapCard, document.querySelector('.map__filters-container'));
};

renderCard(0);
