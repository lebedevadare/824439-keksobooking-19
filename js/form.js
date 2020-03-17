'use strict';
(function () {
  var MAIN_PIN_X_OFFSET = 31;
  var MAIN_PIN_Y_OFFSET = 31;
  var MAIN_PIN_Y_ARROW_OFFSET = 84;
  var ENTER_KEY = 'Enter';
  // var ESC_KEY = 'Escape';
  var form = document.querySelector('.ad-form');
  var timeoutInput = form.querySelector('#timeout');
  var timeinInput = form.querySelector('#timein');
  var priceNight = form.querySelector('#price');
  var typeOfHousing = form.querySelector('#type');
  var fildSets = form.querySelectorAll('fieldset');
  var mapAd = document.querySelector('.map');
  var mapPinsBlock = mapAd.querySelector('.map__pins');
  var mapPin = mapPinsBlock.querySelector('.map__pin--main');
  var mapPinImage = mapPin.querySelector('img');
  var adress = document.querySelector('#address');
  var selectRoom = document.querySelector('#room_number');
  var selectGuestsAll = document.querySelector('#capacity');
  var selectGuests = document.querySelectorAll('#capacity option');
  var activateInput = function () {
    for (var i = 0; i < fildSets.length; i++) {
      fildSets[i].disabled = false;
    }
  };
  var deActivateInput = function () {
    for (var i = 0; i < fildSets.length; i++) {
      fildSets[i].disabled = true;
    }
    var x = mapPinImage.x;
    var y = mapPinImage.y;
    adress.value = (x + MAIN_PIN_X_OFFSET) + ',' + (y + MAIN_PIN_Y_OFFSET);
  };

  var checksGuests = function () {
    var count = selectRoom.value;
    checkRoomCapacity(count);
  };
  var activation = function () {
    mapAd.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    checksGuests();
    validationTypeHousing();
    window.card.renderAdds(window.data.adds);
    activateInput();
    adress.value = (mapPinImage.x + MAIN_PIN_X_OFFSET) + ',' + (mapPinImage.y + MAIN_PIN_Y_ARROW_OFFSET);
  };

  var onPinMousedown = function (e) {
    if (typeof e === 'object' && e.button === 0) {
      activation(e);
    }
    mapPin.removeEventListener('mousedown', onPinMousedown);
    mapPin.removeEventListener('keydown', onActivationKeydown);
  };

  var onActivationKeydown = function (e) {
    if (e.key === ENTER_KEY) {
      activation(e);
    }
    mapPin.removeEventListener('keydown', onActivationKeydown);
    mapPin.removeEventListener('mousedown', onPinMousedown);
  };

  var checkRoomCapacity = function (count) {
    selectGuests.forEach(function (option) {
      option.remove();
      if (option.value !== '0' && Number(option.value) <= Number(count)) {
        selectGuestsAll.appendChild(option);
      }

      if (count === '100') {
        selectGuests.forEach(function (element) {
          element.remove();
        });
        selectGuestsAll.appendChild(option);
      }
    });
  };

  var onSelectRoom = function (e) {

    var count = e.target.value;
    checkRoomCapacity(count);

  };

  var validationTypeHousing = function () {
    if (typeOfHousing.value === 'bungalo') {
      priceNight.placeholder = 0;
      priceNight.min = 0;
    } else if (typeOfHousing.value === 'flat') {
      priceNight.placeholder = 1000;
      priceNight.min = 1000;
    } else if (typeOfHousing.value === 'house') {
      priceNight.placeholder = 5000;
      priceNight.min = 5000;
    } else if (typeOfHousing.value === 'palace') {
      priceNight.placeholder = 10000;
      priceNight.min = 10000;
    }
  };

  var timingTime = function (e) {
    if (e.target === timeoutInput) {
      timeinInput.value = e.target.value;
    } else if (e.target === timeinInput) {
      timeoutInput.value = e.target.value;
    }
  };
  deActivateInput();
  mapPin.addEventListener('mousedown', onPinMousedown);
  mapPin.addEventListener('keydown', onActivationKeydown);
  selectRoom.addEventListener('change', onSelectRoom);
  typeOfHousing.addEventListener('change', validationTypeHousing);
  timeinInput.addEventListener('change', timingTime);
  timeoutInput.addEventListener('change', timingTime);
})();
