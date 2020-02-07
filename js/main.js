'use strict';

var adTemplate = document.querySelector('#card').content.querySelector('.popup');
var mapAd = document.querySelector('.map');
var mapPinsBlock = mapAd.querySelector('.map-pins');
var QANTITY_ADS = 8;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var typeFix = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var price = [5000, 1000, 2000, 3000, 500, 1500, 2500];
var rooms = [1, 2, 6, 4, 3, 5, 7, 8];
var guests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ads = [];

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomArrayElements = function (array) {
  return array[getRandomInteger(0, array.length)];
};

var getRandomAvatarImages = function (number) {
  return 'img/avatars/user0' + getRandomArrayElements(number) + '.png';
};

var getArrayPartRandom = function (array) {
  return array.slice(0, getRandomInteger(1, array.length));
};

var createObject;
createObject = function () {
  return {
    'author': {
      'avatar': getRandomAvatarImages(QANTITY_ADS)
    },
    'offer': {
      'title': 'Заголовок предложения',
      'address': (location['x'] - 1 / 2 * PIN_WIDTH) + ',' + (location['y'] + PIN_HEIGHT),
      'price': getRandomArrayElements(price),
      'type': getRandomArrayElements(typeFix),
      'rooms': getRandomArrayElements(rooms),
      'guests': getRandomArrayElements(guests),
      'checkin': getRandomArrayElements(checkins),
      'checkout': getRandomArrayElements(checkout),
      'features': getArrayPartRandom(features),
      'description': 'строка с описанием',
      'photos': getArrayPartRandom(photos),
    },
    'location': {
      'x': getRandomInteger(mapPinsBlock.clientTop, mapPinsBlock.clientWidth),
      'y': getRandomInteger(130, 630)
    }
  };
};

var createAdds  = function (AddsCount) {
  for (var i = 0; i < AddsCount; i++) {
    ads[i] = createObject();
  }
};

var renderAdd = function (ad) {
  var adElement = adTemplate.cloneNode(true);
  adElement.querySelector('.popup__avatar').textContent = ad.avatar;
  adElement.querySelector('popup__title').textContent = ad.title;
  adElement.querySelector('.wizard-eyes').style.fill = ad. eyesColor;
  return adElement;
};

mapAd.classList.remove('map--faded');



