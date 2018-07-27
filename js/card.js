'use strict';

(function () {
  var ComplianceTypesNames = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var img = cardTemplate.cloneNode(true).querySelector('.popup__photo');
  var map = document.querySelector('.map');
  var mapCard = map.querySelector('.map__card');

  function renderFeatures(advData) {
    var mapFeatures = mapCard.querySelector('.popup__features');
    mapFeatures.innerHTML = '';
    var m = 0;
    while (m < advData.offer.features.length) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add('popup__feature--' + advData.offer.features[m]);
      mapFeatures.appendChild(feature);
      m = m + 1;
    }
  }

  function renderPhotos(advData) {
    var imgFragment = document.createDocumentFragment();
    var photos = advData.offer.photos;
    for (var i = 0; i < photos.length; i++) {
      var imgTemplate = img.cloneNode(true);
      imgTemplate.src = advData.offer.photos[i];
      imgFragment.appendChild(imgTemplate);
    }
    mapCard.querySelector('.popup__photos').appendChild(imgFragment);
  }

  window.card = {
    generateClickHandler: function (ad) {
      return function () {
        if (mapCard) {
          mapCard.remove();
        }
        mapCard = cardTemplate.cloneNode(true);
        var photoTemplate = mapCard.querySelector('.popup__photos').querySelector('.popup__photo');

        mapCard.querySelector('.popup__title').textContent = ad.offer.title;
        mapCard.querySelector('.popup__text--address').textContent = ad.offer.address;
        mapCard.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
        mapCard.querySelector('.popup__type').textContent = ComplianceTypesNames[ad.offer.type];
        mapCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
        mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

        renderFeatures(ad);
        renderPhotos(ad);

        mapCard.querySelector('.popup__description').textContent = ad.offer.description;
        photoTemplate.parentNode.removeChild(photoTemplate);
        mapCard.querySelector('.popup__avatar').src = ad.author.avatar;

        map.insertBefore(mapCard, document.querySelector('.map__filters-container'));
        var closeButton = map.querySelector('.popup__close');
        closeButton.addEventListener('click', window.map.onCloseButtonClick);
      };
    }
  };

})();
