'use strict';
// data.js — модуль, который создаёт данные;
(function () {
  var PIN_X_OFFSET = 20;
  var PIN_Y_OFFSET = 40;
  var QANTITY_ADS = 8;
  var mapAd = document.querySelector('.map');
  var mapPinsBlock = mapAd.querySelector('.map__pins');
  var headers = ['Уютное гнездышко для молодоженов', 'Прекрасный отдых не только для двоих', 'Роскошные аппартаменты с современным дизайном', 'Лучший номер с видом на море'];
  var descriptions = ['Великолепная квартира-студия в центре Токио', 'Подходит как туристам, так и бизнесменам', 'Квартира полностью укомплектована и недавно отремонтирована', 'Дом с приведениями', 'Все включено'];
  var price = [5000, 1000, 2000, 3000, 500, 1500, 2500];
  var typesOfHousing = ['palace', 'flat', 'house', 'bungalo'];
  var checkins = ['12:00', '13:00', '14:00'];
  var checkouts = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var rooms = [1, 2, 6, 4, 3, 5, 7, 8];
  var guests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  //  генерация случайного числа
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomArrayElements = function (array) {
    return array[getRandomInteger(0, array.length)];
  };

  var getRandomAvatarImages = function (number) {
    return 'img/avatars/user0' + number + '.png';
  };

  var getArrayPartRandom = function (array) {
    return array.slice(0, getRandomInteger(1, array.length));
  };
  var createObject = function (number) {
    var locationX = (getRandomInteger(mapPinsBlock.clientTop, mapPinsBlock.clientWidth) - PIN_X_OFFSET);
    var locationY = (getRandomInteger(130, 630) - PIN_Y_OFFSET);
    return {
      'author': {
        'avatar': getRandomAvatarImages(number)
      },
      'offer': {
        'title': getRandomArrayElements(headers),
        'address': locationX + ', ' + locationY,
        'price': getRandomArrayElements(price),
        'type': getRandomArrayElements(typesOfHousing),
        'rooms': getRandomArrayElements(rooms),
        'guests': getRandomArrayElements(guests),
        'checkin': getRandomArrayElements(checkins),
        'checkout': getRandomArrayElements(checkouts),
        'features': getArrayPartRandom(features),
        'description': getRandomArrayElements(descriptions),
        'photos': getArrayPartRandom(photos),
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  };
  var createAdds = function (addsCount) {
    var tempAds = [];
    for (var i = 1; i <= addsCount; i++) {
      tempAds.push(createObject(i));
    }
    return tempAds;
  };
  var adds = createAdds(QANTITY_ADS);
  window.data = {
    adds: adds
  };
})();
