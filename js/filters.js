'use strict';

(function () {

  // var MAX_PINS_COUNT = 5;
  // var filters = {
  //   type: 'any',
  //   price: 'any',
  //   rooms: 'any',
  //   guests: 'any',
  //   features: []
  // };
  // var priceParams = {
  //   LOW: 10000,
  //   HIGH: 50000
  // };

  // var ddd = window.map.posterArr;

  // var mapFilters = document.querySelector('.map__filters');
  // var housingType = mapFilters.querySelector('#housing-type');
  // var housingPrice = mapFilters.querySelector('#housing-price');
  // var housingRooms = mapFilters.querySelector('#housing-rooms');
  // var housingGuests = mapFilters.querySelector('#housing-guests');
  // var housingFeatures = Array.from(document.querySelectorAll('#housing-features input'));

  // // function getDifferenceOfArrays(arr1, arr2) {
  // //   var result = [];
  // //   for (var i = 0; i < arr1.length; i++) {
  // //     if (arr2.indexOf(arr1[i]) === -1) {
  // //       result.push(arr1[i]);
  // //     }
  // //   }
  // //   return result;
  // // }

  // function onLoadData(data) {
  //   // for (var i = 0; i < window.map.pins.length; i++) {
  //   //   window.map.pins[i].classList.remove('hidden');
  //   // }
  //   var filterDataObject = getFilteredData(data);
  //   document.querySelector('.map__pins').appendChild(window.pin.createPinsFragment(filterDataObject));
  //   var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  //   var l = 0;
  //   while (l < mapPins.length) {
  //     mapPins[l].addEventListener('click', window.card.generateClickHandler(filterDataObject[l]));
  //     l = l + 1;
  //   }

  //   // for (i = 0; i < window.map.pins.length; i++) {
  //   //   window.map.pins[i].classList.remove('hidden');
  //   // }
  //   // var allIndexes = [];
  //   // for (i = 0; i < window.map.pins.length; i++) {
  //   //   allIndexes.push(i);
  //   // }
  //   // var indexesOfPins = [];
  //   // i = 0;
  //   // while (i < window.map.pins.length) {
  //   //   var j = 0;
  //   //   while (j < filterDataObject.length) {
  //   //     if (window.map.pins[i].children[0].alt === filterDataObject[j].offer.title) {
  //   //       indexesOfPins.push(i);
  //   //     }
  //   //     j = j + 1;
  //   //   }
  //   //   i = i + 1;
  //   // }
  //   // var indexesOfPinsForHiding = getDifferenceOfArrays(allIndexes, indexesOfPins);
  //   // for (i = 0; i < indexesOfPinsForHiding.length; i++) {
  //   //   window.map.pins[indexesOfPinsForHiding[i]].classList.add('hidden');
  //   // }
  // }

  // function filterByPrice(data) {
  //   switch (housingPrice.value) {
  //     case 'low':
  //       return data.offer.price < priceParams.LOW;
  //     case 'middle':
  //       return data.offer.price >= priceParams.LOW && data.offer.price <= priceParams.HIGH;
  //     case 'high':
  //       return data.offer.price > priceParams.HIGH;
  //   }
  //   return false;
  // }

  // function filterByFeatures(data) {
  //   for (var i = 0; i < filters.features.length; i++) {
  //     if (data.offer.features.indexOf(filters.features[i]) === -1) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // function filterData(data) {
  //   return ((housingType.value === 'any') ? true : (data.offer.type === housingType.value)) &&
  //     ((housingPrice.value === 'any') ? true : filterByPrice(data)) &&
  //     ((housingRooms.value === 'any') ? true : (data.offer.rooms === parseInt(housingRooms.value, 10))) &&
  //     ((housingGuests.value === 'any') ? true : (data.offer.guests === parseInt(housingGuests.value, 10))) &&
  //     filterByFeatures(data);
  // }

  // function getFilteredData(ads) {

  //   var newData = ads.filter(filterData(ads));

  //   return newData.slice(0, MAX_PINS_COUNT);
  // }

  // function filtersChangeHandlers() {
  //   var card = document.querySelector('.map__card');
  //   if (card !== null) {
  //     card.classList.add('hidden');
  //   }
  //   onLoadData(ddd);

  //   // window.backend.load(onLoadData, window.map.onError);
  // }

  // function onHousingTypeChange(evt) {
  //   filters.type = evt.target.value;
  //   window.debounce(filtersChangeHandlers);
  // }

  // function onHousingPriceChange(evt) {
  //   filters.price = evt.target.value;
  //   window.debounce(filtersChangeHandlers);
  // }

  // function onHousingRoomsChange(evt) {
  //   filters.rooms = evt.target.value;
  //   window.debounce(filtersChangeHandlers);
  // }

  // function onHousingGuestsChange(evt) {
  //   filters.rooms = evt.target.value;
  //   window.debounce(filtersChangeHandlers);
  // }

  // // какой элемент из списка выбран(checked) записываем его в массив filters.features]
  // function selectFeatures() {
  //   var accum = [];
  //   housingFeatures.map(function (item) {
  //     if (item.checked === true) {
  //       accum.push(item.value);
  //     }
  //   });
  //   return accum;
  // }

  // housingFeatures.forEach(function (item) {
  //   item.addEventListener('change', function () {
  //     filters.features = selectFeatures();
  //     window.debounce(filtersChangeHandlers);
  //   });
  // });

  // housingType.addEventListener('change', onHousingTypeChange);
  // housingPrice.addEventListener('change', onHousingPriceChange);
  // housingRooms.addEventListener('change', onHousingRoomsChange);
  // housingGuests.addEventListener('change', onHousingGuestsChange);


  // var filters = {
  //   type: 'any',
  //   price: 'any',
  //   rooms: 'any',
  //   guests: 'any',
  //   features: []
  // };
  // var MAX_PINS_COUNT = 5;

  // var mapFilters = document.querySelector('.map__filters');
  // var housingType = mapFilters.querySelector('#housing-type');
  // var housingPrice = mapFilters.querySelector('#housing-price');
  // var housingRooms = mapFilters.querySelector('#housing-rooms');
  // var housingGuests = mapFilters.querySelector('#housing-guests');
  // var housingFeatures = Array.from(document.querySelectorAll('#housing-features input'));
  // var priceParams = {
  //   LOW: 10000,
  //   HIGH: 50000
  // };
  // var map = document.querySelector('.map');
  // var mapPins = map.querySelector('.map__pins');

  // var onLoadData = function (data) {
  //   var filterDataObject = getFilteredData(data);
  //   var fragmentPin = document.createDocumentFragment();
  //   var pinsCount = MAX_PINS_COUNT;
  //   if (filterDataObject.length < pinsCount) {
  //     pinsCount = filterDataObject.length;
  //   }
  //   for (var i = 0; i < pinsCount; i++) {
  //     fragmentPin.appendChild(window.pin.renderPin(filterDataObject[i]));
  //   }

  //   mapPins.appendChild(fragmentPin);
  // };
  // // фильтр цены
  // var filteredByPrice = function (data) {
  //   switch (housingPrice.value) {
  //     case 'low':
  //       return data.offer.price < priceParams.LOW;
  //     case 'middle':
  //       return data.offer.price >= priceParams.LOW && data.offer.price <= priceParams.HIGH;
  //     case 'high':
  //       return data.offer.price > priceParams.HIGH;
  //   }
  //   return false;
  // };

  // // фильтр удобств
  // var filteredByFeatures = function (data) {
  //   for (var i = 0; i < filters.features.length; i++) {
  //     if (data.offer.features.indexOf(filters.features[i]) === -1) {
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  // var filterData = function (data) {
  //   return ((housingType.value === 'any') ? true : (data.offer.type === housingType.value)) &&
  //     ((housingPrice.value === 'any') ? true : filteredByPrice(data)) &&
  //     ((housingRooms.value === 'any') ? true : (data.offer.rooms === parseInt(housingRooms.value, 10))) &&
  //     ((housingGuests.value === 'any') ? true : (data.offer.guests === parseInt(housingGuests.value, 10))) &&
  //     filteredByFeatures(data);
  // };

  // // массив длинною pinLimits
  // var getFilteredData = function (ads) {

  //   var newData = ads.filter(filterData);
  //   return newData.slice(0, 5);
  // };

  // var filtersChangeHandlers = function () {
  //   var card = document.querySelector('.map__card');
  //   var mapPin = document.querySelectorAll('.map__pin'); // нашли все пины
  //   if (card !== null) {
  //     card.classList.add('hidden');
  //   }

  //   for (var j = 0; j < mapPin.length; j++) {
  //     if (!mapPin[j].classList.contains('map__pin--main')) {
  //       mapPins.removeChild(mapPin[j]);
  //     }
  //   }
  //   // window.card.generateCli(window.map.posterArr);
  //   window.backend.load(onLoadData, window.map.onError);
  //   //        var filterDataObject = getFilteredData(points);
  //   //  window.debounce(window.pin.getPinsFragment(filterDataObject));
  // };

  // var housingTypeChangeHandler = function (evt) {
  //   filters.type = evt.target.value;
  //   window.debounce(filtersChangeHandlers);
  // };

  // var housingPriceChangeHandler = function (evt) {
  //   filters.price = evt.target.value;
  //   window.debounce(filtersChangeHandlers);
  // };

  // var housingRoomsChangeHandler = function (evt) {
  //   filters.rooms = evt.target.value;
  //   window.debounce(filtersChangeHandlers);
  // };

  // var housingGuestsChangeHandler = function (evt) {
  //   filters.rooms = evt.target.value;
  //   window.debounce(filtersChangeHandlers);
  // };

  // // какой элемент из списка выбран(checked) записываем его в массив filters.features]
  // var selectFeatures = function () {
  //   var accum = [];
  //   housingFeatures.map(function (item) {
  //     if (item.checked === true) {
  //       accum.push(item.value);
  //     }
  //   });
  //   return accum;
  // };

  // housingFeatures.forEach(function (item) {
  //   item.addEventListener('change', function () {
  //     filters.features = selectFeatures();
  //     window.debounce(filtersChangeHandlers);
  //   });
  // });

  // housingType.addEventListener('change', housingTypeChangeHandler);
  // housingPrice.addEventListener('change', housingPriceChangeHandler);
  // housingRooms.addEventListener('change', housingRoomsChangeHandler);
  // housingGuests.addEventListener('change', housingGuestsChangeHandler);
})();
