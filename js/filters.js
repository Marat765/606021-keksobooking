'use strict';

(function () {
  var MAX_PINS_COUNT = 5;
  var filters = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };
  var priceParams = {
    LOW: 10000,
    HIGH: 50000
  };

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = Array.from(document.querySelectorAll('#housing-features input'));

  function getDifferenceOfArrays(arr1, arr2) {
    var result = [];
    for (var i = 0; i < arr1.length; i++) {
      if (arr2.indexOf(arr1[i]) === -1) {
        result.push(arr1[i]);
      }
    }
    return result;
  }

  function onLoadData(data) {
    for (var i = 0; i < window.map.pins.length; i++) {
      window.map.pins[i].classList.remove('hidden');
    }
    var filterDataObject = getFilteredData(data);
    for (i = 0; i < window.map.pins.length; i++) {
      window.map.pins[i].classList.remove('hidden');
    }
    var allIndexes = [];
    for (i = 0; i < window.map.pins.length; i++) {
      allIndexes.push(i);
    }
    var indexesOfPins = [];
    i = 0;
    while (i < window.map.pins.length) {
      var j = 0;
      while (j < filterDataObject.length) {
        if (window.map.pins[i].children[0].alt === filterDataObject[j].offer.title) {
          indexesOfPins.push(i);
        }
        j = j + 1;
      }
      i = i + 1;
    }
    var indexesOfPinsForHiding = getDifferenceOfArrays(allIndexes, indexesOfPins);
    for (i = 0; i < indexesOfPinsForHiding.length; i++) {
      window.map.pins[indexesOfPinsForHiding[i]].classList.add('hidden');
    }
  }

  function filterByPrice(data) {
    switch (housingPrice.value) {
      case 'low':
        return data.offer.price < priceParams.LOW;
      case 'middle':
        return data.offer.price >= priceParams.LOW && data.offer.price <= priceParams.HIGH;
      case 'high':
        return data.offer.price > priceParams.HIGH;
    }
    return false;
  }

  function filterByFeatures(data) {
    for (var i = 0; i < filters.features.length; i++) {
      if (data.offer.features.indexOf(filters.features[i]) === -1) {
        return false;
      }
    }
    return true;
  }

  function filterData(data) {
    return ((housingType.value === 'any') ? true : (data.offer.type === housingType.value)) &&
      ((housingPrice.value === 'any') ? true : filterByPrice(data)) &&
      ((housingRooms.value === 'any') ? true : (data.offer.rooms === parseInt(housingRooms.value, 10))) &&
      ((housingGuests.value === 'any') ? true : (data.offer.guests === parseInt(housingGuests.value, 10))) &&
      filterByFeatures(data);
  }

  function getFilteredData(ads) {

    var newData = ads.filter(filterData);

    return newData.slice(0, MAX_PINS_COUNT);
  }

  function filtersChangeHandlers() {
    var card = document.querySelector('.map__card');
    if (card !== null) {
      card.classList.add('hidden');
    }

    window.backend.load(onLoadData, window.map.onError);
  }

  function onHousingTypeChange(evt) {
    filters.type = evt.target.value;
    window.debounce(filtersChangeHandlers);
  }

  function onHousingPriceChange(evt) {
    filters.price = evt.target.value;
    window.debounce(filtersChangeHandlers);
  }

  function onHousingRoomsChange(evt) {
    filters.rooms = evt.target.value;
    window.debounce(filtersChangeHandlers);
  }

  function onHousingGuestsChange(evt) {
    filters.rooms = evt.target.value;
    window.debounce(filtersChangeHandlers);
  }

  // какой элемент из списка выбран(checked) записываем его в массив filters.features]
  function selectFeatures() {
    var accum = [];
    housingFeatures.map(function (item) {
      if (item.checked === true) {
        accum.push(item.value);
      }
    });
    return accum;
  }

  housingFeatures.forEach(function (item) {
    item.addEventListener('change', function () {
      filters.features = selectFeatures();
      window.debounce(filtersChangeHandlers);
    });
  });

  housingType.addEventListener('change', onHousingTypeChange);
  housingPrice.addEventListener('change', onHousingPriceChange);
  housingRooms.addEventListener('change', onHousingRoomsChange);
  housingGuests.addEventListener('change', onHousingGuestsChange);
})();
