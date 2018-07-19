'use strict';

(function () {
  var COORDINATES_Y_MIN = 180;
  var COORDINATES_Y_MAX = 670;
  var ADS_COUNT = 8;
  var COORDINATES_X_MIN = 180;
  var COORDINATES_X_MAX = 1150;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 100;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var CHECKIN_TIME_STAMPS = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME_STAMPS = ['12:00', '13:00', '14:00'];
  var ALL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ALL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var similarAds = [];
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

  window.data = {
    similarAds: similarAds
  };
})();
