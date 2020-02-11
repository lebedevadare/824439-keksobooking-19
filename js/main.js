'use strict';

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
var mapAd = document.querySelector('.map');
var mapPinsBlock = mapAd.querySelector('.map__pins');
var filterContainer = mapAd.querySelector('.mapAd');
var popurFeatures = document.querySelector('.popup__features')
var QANTITY_ADS = 8;
var PIN_X_OFFSET = 20;
var PIN_Y_OFFSET = 40;
var headers = ['Уютное гнездышко для молодоженов', 'Прекрасный отдых не только для двоих', 'Роскошные аппартаменты с современным дизайном', 'Лучший номер с видом на море'];
var descriptions = ['Великолепная квартира-студия в центре Токио', 'Подходит как туристам, так и бизнесменам', 'Квартира полностью укомплектована и недавно отремонтирована', 'Дом с приведениями', 'Все включено'];
var typesOfHousing = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var price = [5000, 1000, 2000, 3000, 500, 1500, 2500];
var rooms = [1, 2, 6, 4, 3, 5, 7, 8];
var guests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var types = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};
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

var renderAdd = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x + 'px';
  pinElement.style.top = ad.location.y + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;
  return pinElement;
};

var createFeatures = function (feature) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < feature.length; i++) {
    var featureElement = document.createElement('li');
    fragment.appendChild(popurFeatures);
  }
  featureElement.classList.add('.popup__feature');
  featureElement.classList.add('.popup__feature-- + feature[i]');
}

var renderOfferCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = card.types.flat;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + 'гостей';
  cardElement.querySelector('.popup__text--time ').textContent = 'Заезд после  ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  popurFeatures.innerHTML = ' ';
  cardElement.querySelector('.popup__features').textContent = createFeatures(card.offer.features);
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  return cardElement;
};

var renderCard = function (cardElement) {
  for (var i = 0; i < cardElement.length; i++) {
    mapAd.insertBefore(cardElement, filterContainer);
  }
};

var renderAdds = function (adds) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adds.length; i++) {
    fragment.appendChild(renderAdd(adds[i]));
  }
  mapPinsBlock.appendChild(fragment);
  renderCard(renderOfferCard(adds[0]));
};

mapAd.classList.remove('map--faded');
renderAdds(createAdds(QANTITY_ADS));


