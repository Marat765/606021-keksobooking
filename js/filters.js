'use strict';

(function () {
  var MAX_PINS_COUNT = 5;

  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');
  var type = mapFilters.querySelector('#housing-type');
  var price = mapFilters.querySelector('#housing-price');
  var room = mapFilters.querySelector('#housing-rooms');
  var guest = mapFilters.querySelector('#housing-guests');
  var mapFeatures = mapFilters.querySelector('.map__features');

  var newData = [];
  var initialRenderingData = [];
  var ValueToPrice = {
    LOW: '10000',
    HIGH: '50000'
  };

  function onLoadSuccess(data) {
    newData = data;
    initialRenderingData = newData.slice(0, MAX_PINS_COUNT);
    window.pin.renderPinsFragment(initialRenderingData);
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var l = 0;
    while (l < mapPins.length) {
      mapPins[l].addEventListener('click', window.card.generateClickHandler(initialRenderingData[l]));
      l = l + 1;
    }
  }

  function filterType(item) {
    return type.value === 'any' || item.offer.type === type.value;
  }

  function filterPrice(item) {
    switch (price.value) {
      case 'low':
        return item.offer.price < ValueToPrice.LOW;
      case 'middle':
        return item.offer.price >= ValueToPrice.LOW && item.offer.price < ValueToPrice.HIGH;
      case 'high':
        return item.offer.price >= ValueToPrice.HIGH;
      default:
        return true;
    }
  }

  function filterRoom(item) {
    return room.value === 'any' || item.offer.rooms.toString() === room.value;
  }

  function filterGuest(item) {
    return guest.value === 'any' || item.offer.guests.toString() === guest.value;
  }

  function filterFeatures(item) {
    var checkedFields = mapFeatures.querySelectorAll('input:checked');
    var fieldsArray = Array.from(checkedFields);
    var selectedFields = fieldsArray.map(function (feature) {
      return feature.value;
    });
    return selectedFields.every(function (featureValue) {
      return item.offer.features.includes(featureValue);
    });
  }

  function getFilteredData() {
    var sortedData = newData.filter(filterType).filter(filterPrice)
    .filter(filterRoom).filter(filterGuest).filter(filterFeatures);
    return sortedData;
  }

  function onFilterChange() {
    var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins.forEach(function (item) {
      item.remove();
    });
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    var updatedData = getFilteredData();
    var pinsCount = MAX_PINS_COUNT;
    if (updatedData.length < pinsCount) {
      pinsCount = updatedData.length;
    }
    var filteredData = updatedData.slice(0, pinsCount);
    window.pin.renderPinsFragment(filteredData);
    mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    var l = 0;
    while (l < mapPins.length) {
      mapPins[l].addEventListener('click', window.card.generateClickHandler(filteredData[l]));
      l = l + 1;
    }
  }

  mapFilters.addEventListener('change', function () {
    window.debounce.debounce(onFilterChange);
  });

  window.filters = {
    onLoadSuccess: onLoadSuccess
  };
})();
