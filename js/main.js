'use strict';

var pinTemplate = document.querySelector('#pin').content.querySelector('map__pin');
var mapAd = document.querySelector('.map');
var mapPinsBlock = mapAd.querySelector('.map-pins');
var QANTITY_ADS = 8;
var PIN_X_OFFSET = 20;
var PIN_Y_OFFSET = 40;
var title = ['Уютное гнездышко для молодоженов', 'Прекрасный отдых не только для двоих', 'Роскошные аппартаменты с современным дизайном', 'Лучший номер с видом на море'];
var description = ['Великолепная квартира-студия в центре Токио', 'Подходит как туристам, так и бизнесменам', 'Квартира полностью укомплектована и недавно отремонтирована', 'Дом с приведениями', 'Все включено'];
var typeFix = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var price = [5000, 1000, 2000, 3000, 500, 1500, 2500];
var rooms = [1, 2, 6, 4, 3, 5, 7, 8];
var guests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

var createObject = function (number) {
  var locationX = (getRandomInteger(mapPinsBlock.clientLeft, mapPinsBlock.clientWidth) - 1 / 2 * PIN_X_OFFSET);
  var locationY = (getRandomInteger(130, 630) - PIN_Y_OFFSET);
  return {
    'author': {
      'avatar': getRandomAvatarImages(number)
    },
    'offer': {
      'title': getRandomArrayElements(title),
      'address': locationX + ',' + locationY,
      'price': getRandomArrayElements(price),
      'type': getRandomArrayElements(typeFix),
      'rooms': getRandomArrayElements(rooms),
      'guests': getRandomArrayElements(guests),
      'checkin': getRandomArrayElements(checkins),
      'checkout': getRandomArrayElements(checkout),
      'features': getArrayPartRandom(features),
      'description': getRandomArrayElements(description),
      'photos': getArrayPartRandom(photos),
    },
    'location': {
      'x': getRandomInteger(mapPinsBlock.clientTop, mapPinsBlock.clientWidth),
      'y': getRandomInteger(130, 630)
    }
  };

};

var createAdds = function (addsCount) {
  var tempAds = [];
  for (var i = 1; i <= addsCount; i++) {
    tempAds.push(createObject(QANTITY_ADS));
  }
  return tempAds;
};

var renderAdd = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = ad.locationX + 'px';
  pinElement.style.top = ad.locationY + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;
  return pinElement;
};

mapAd.classList.remove('map--faded');



