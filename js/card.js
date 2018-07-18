'use strict';

(function () {

  window.card = {
    renderCard: function (pinNumber) {
      var mapCard = document.querySelector('.map__card');

      var PHOTOS_COUNT = 3;
      var COMPLIANCE_OF_NAMES_OF_TYPES = {
        'palace': 'Дворец',
        'flat': 'Квартира',
        'house': 'Дом',
        'bungalo': 'Бунгало'
      };
      var m;

      mapCard.querySelector('.popup__title').textContent = window.data.similarAds[pinNumber].offer.title;
      mapCard.querySelector('.popup__text--address').textContent = window.data.similarAds[pinNumber].offer.address;
      mapCard.querySelector('.popup__text--price').textContent = window.data.similarAds[pinNumber].offer.price + '₽/ночь';
      mapCard.querySelector('.popup__type').textContent = COMPLIANCE_OF_NAMES_OF_TYPES[window.data.similarAds[pinNumber].offer.type];
      mapCard.querySelector('.popup__text--capacity').textContent = window.data.similarAds[pinNumber].offer.rooms + ' комнаты для ' + window.data.similarAds[pinNumber].offer.guests + ' гостей';
      mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.data.similarAds[pinNumber].offer.checkin + ', выезд до ' + window.data.similarAds[pinNumber].offer.checkout;

      var mapFeatures = mapCard.querySelector('.popup__features');
      while (mapFeatures.firstChild) {
        mapFeatures.removeChild(mapFeatures.firstChild);
      }
      m = 0;
      while (m < window.data.similarAds[pinNumber].offer.features.length) {
        var featuresElement = document.createElement('li');
        featuresElement.classList.add('popup__feature');
        featuresElement.classList.add('popup__feature--' + window.data.similarAds[pinNumber].offer.features[m]);
        mapFeatures.appendChild(featuresElement);
        m = m + 1;
      }

      mapCard.querySelector('.popup__description').textContent = window.data.similarAds[pinNumber].offer.description;
      var templatePhoto = mapCard.querySelector('.popup__photos').removeChild(mapCard.querySelector('.popup__photo'));
      m = 0;
      while (m < PHOTOS_COUNT) {
        mapCard.querySelector('.popup__photos').insertBefore(templatePhoto.cloneNode(true), null);
        mapCard.querySelector('.popup__photos').children[m].src = window.data.similarAds[pinNumber].offer.photos[m];
        m = m + 1;
      }
      mapCard.querySelector('.popup__avatar').src = window.data.similarAds[pinNumber].author.avatar;
    }
  };
})();
