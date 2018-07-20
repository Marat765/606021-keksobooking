'use strict';

(function () {
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var img = cardTemplate.cloneNode(true).querySelector('.popup__photo');

  function getPhotoList(advData) {
    var imgFragment = document.createDocumentFragment();
    var photos = advData.offer.photos;
    for (var i = 0; i < photos.length; i++) {
      var imgTemplate = img.cloneNode(true);
      imgTemplate.src = advData.offer.photos[i];
      imgFragment.appendChild(imgTemplate);
    }
    return imgFragment;
  }

  window.card = {
    generateClickHahdler: function (ad) {
      return function () {
        var mapCard = document.querySelector('.map__card');
        if (mapCard) {
          mapCard.remove();
        }
        mapCard = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);
        var photoTemplate = mapCard.querySelector('.popup__photos').querySelector('.popup__photo');
        var COMPLIANCE_OF_NAMES_OF_TYPES = {
          'palace': 'Дворец',
          'flat': 'Квартира',
          'house': 'Дом',
          'bungalo': 'Бунгало'
        };
        var m;

        mapCard.querySelector('.popup__title').textContent = ad.offer.title;
        mapCard.querySelector('.popup__text--address').textContent = ad.offer.address;
        mapCard.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
        mapCard.querySelector('.popup__type').textContent = COMPLIANCE_OF_NAMES_OF_TYPES[ad.offer.type];
        mapCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
        mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

        var mapFeatures = mapCard.querySelector('.popup__features');
        while (mapFeatures.firstChild) {
          mapFeatures.removeChild(mapFeatures.firstChild);
        }
        m = 0;
        while (m < ad.offer.features.length) {
          var featuresElement = document.createElement('li');
          featuresElement.classList.add('popup__feature');
          featuresElement.classList.add('popup__feature--' + ad.offer.features[m]);
          mapFeatures.appendChild(featuresElement);
          m = m + 1;
        }

        mapCard.querySelector('.popup__description').textContent = ad.offer.description;
        mapCard.querySelector('.popup__photos').appendChild(getPhotoList(ad));
        photoTemplate.parentNode.removeChild(photoTemplate);
        mapCard.querySelector('.popup__avatar').src = ad.author.avatar;

        document.querySelector('.map').insertBefore(mapCard, document.querySelector('.map__filters-container'));
        var closeButton = document.querySelector('.map').querySelector('.popup__close');
        closeButton.addEventListener('click', window.map.deleteCard);
      };
    }
  };

})();
