'use strict';

var mapCardElement = document.querySelector('.map__card');
var mapCardTEmplate = document.querySelector('#card').content.querySelector('')
var QANTITY_ADS = 8;
var typeFix = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ad = [];
var randomNumber = function () {
  return (Math.floor(Math.random() * (QANTITY_ADS + 1)));
};

var getRandomArrayElement = function (array) {
  return array[randomNumber(0, array.length)];
};

var getRandomNumber = function (array) {
  return array[randomNumber(130, 630)];
};

var getRandomArrayString = function (array) {
  return array[randomNumber(0, array)];
};

var getRandomArrayElements = function (array) {
  return array[getRandomInteger(0, array.length)];
};

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};


var getRandomAvatarImages = function () {
  return 'img/avatars/user{{0' + getRandomArrayElement(QANTITY_ADS) + '}}.png';
};

var createObject = function () {
  return {
    'author': {
      'avatar': getRandomAvatarImages()
    },
    'offer': {
      'title': 'Заголовок предложения',
      'address': '600, 350',
      'price': 5000,
      'type': getRandomArrayElements(typeFix),
      'rooms': 2,
      'guests': 1,
      'checkin': getRandomArrayElements(checkins),
      'checkout': getRandomArrayElements(checkout),
      'features': getRandomArrayString(features),
      'description': 'строка с описанием',
      'photos': getRandomArrayString(photos),
    },
    'location': {
      'x': 100,
      'y': getRandomNumber()
    }
  };
};


var createAdds  = function (AddsCount) {
  for (var i = 0; i < AddsCount; i++) {
    ad[i] = createObject();
  }
};

var mapAd = document.querySelector('.map');
mapAd.classList.remove('map--faded');

var renderAds = function (ad) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};
