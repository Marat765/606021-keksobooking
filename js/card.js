'use strict';

(function () {

  window.card = {
    generateClickHahdler: function (l) {
      return function () {
        var mapCard;
        if (mapCard) {
          mapCard.remove();
        }
        mapCard = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);
        var PHOTOS_COUNT = 3;
        var COMPLIANCE_OF_NAMES_OF_TYPES = {
          'palace': 'Дворец',
          'flat': 'Квартира',
          'house': 'Дом',
          'bungalo': 'Бунгало'
        };
        var m;

        mapCard.querySelector('.popup__title').textContent = window.data.similarAds[l].offer.title;
        mapCard.querySelector('.popup__text--address').textContent = window.data.similarAds[l].offer.address;
        mapCard.querySelector('.popup__text--price').textContent = window.data.similarAds[l].offer.price + '₽/ночь';
        mapCard.querySelector('.popup__type').textContent = COMPLIANCE_OF_NAMES_OF_TYPES[window.data.similarAds[l].offer.type];
        mapCard.querySelector('.popup__text--capacity').textContent = window.data.similarAds[l].offer.rooms + ' комнаты для ' + window.data.similarAds[l].offer.guests + ' гостей';
        mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.data.similarAds[l].offer.checkin + ', выезд до ' + window.data.similarAds[l].offer.checkout;

        var mapFeatures = mapCard.querySelector('.popup__features');
        while (mapFeatures.firstChild) {
          mapFeatures.removeChild(mapFeatures.firstChild);
        }
        m = 0;
        while (m < window.data.similarAds[l].offer.features.length) {
          var featuresElement = document.createElement('li');
          featuresElement.classList.add('popup__feature');
          featuresElement.classList.add('popup__feature--' + window.data.similarAds[l].offer.features[m]);
          mapFeatures.appendChild(featuresElement);
          m = m + 1;
        }

        mapCard.querySelector('.popup__description').textContent = window.data.similarAds[l].offer.description;
        var templatePhoto = mapCard.querySelector('.popup__photos').removeChild(mapCard.querySelector('.popup__photo'));
        m = 0;
        while (m < PHOTOS_COUNT) {
          mapCard.querySelector('.popup__photos').insertBefore(templatePhoto.cloneNode(true), null);
          mapCard.querySelector('.popup__photos').children[m].src = window.data.similarAds[l].offer.photos[m];
          m = m + 1;
        }
        mapCard.querySelector('.popup__avatar').src = window.data.similarAds[l].author.avatar;

        var a = mapCard;
        document.querySelector('.map').insertBefore(a, document.querySelector('.map__filters-container'));
      };
    }
  };

})();
