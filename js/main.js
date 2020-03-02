'use strict';
var QANTITY_ADS = 8;
var PIN_X_OFFSET = 20;
var PIN_Y_OFFSET = 40;
var ENTER_KEY = 'Enter';
var MAIN_PIN_X_OFFSET = 31;
var MAIN_PIN_Y_OFFSET = 31;
var MAIN_PIN_Y_ARROW_OFFSET = 84;

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
var mapAd = document.querySelector('.map');
var mapPinsBlock = mapAd.querySelector('.map__pins');
var mapPin = mapPinsBlock.querySelector('.map__pin--main');
var mapPinImage = mapPin.querySelector('img');
// var mapPin = mapPinsBlock.querySelector('button');
// var filterContainer = mapAd.querySelector('.map__filters-container');
var form = document.querySelector('.ad-form');
var fildSets = form.querySelectorAll('fieldset');
var adress = document.querySelector('#address');
var selectRoom = document.querySelector('#room_number');
var selectGuestsAll = document.querySelector('#capacity');
var selectGuests = document.querySelectorAll('#capacity option');
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
// var typesHousing = {
//   'flat': 'Квартира',
//   'bungalo': 'Бунгало',
//   'house': 'Дом',
//   'palace': 'Дворец'
// };
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

// var createFeatures = function (adFeatures) {
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < adFeatures.length; i++) {
//     var featureElement = document.createElement('li');
//     featureElement.classList.add('popup__feature');
//     featureElement.classList.add('popup__feature--' + adFeatures[i]);
//     fragment.appendChild(featureElement);
// }
// return fragment;
// };

// var createPhotos = function (adPhotos) {
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < adPhotos.length; i++) {
//     var photoElement = document.createElement('img');
//     photoElement.classList.add('.popup__photo');
//     photoElement.width = '70';
//     photoElement.height = '70';
//     photoElement.alt = 'Аватар пользователя';
//     photoElement.src = adPhotos[i];
//     fragment.appendChild(photoElement);
//   }
//   return fragment;
// };

//  var renderOfferCard = function (card) {
//  var cardElement = cardTemplate.cloneNode(true);
//  var popupFeatures = cardElement.querySelector('.popup__features');
//  var photoPopup = cardElement.querySelector('.popup__photos');
//  cardElement.querySelector('.popup__title').textContent = card.offer.title;
//  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
//  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
//  cardElement.querySelector('.popup__type').textContent = typesHousing[card.offer.type];
//  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
//  cardElement.querySelector('.popup__text--time ').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
//  popupFeatures.innerHTML = '';
//  popupFeatures.appendChild(createFeatures(card.offer.features));
//  photoPopup.innerHTML = '';
//  photoPopup.appendChild(createPhotos(card.offer.photos));
//  cardElement.querySelector('.popup__description').textContent = card.offer.description;
//  return cardElement;
//  };

// ?var renderCard = function (cardElement) {
//   mapAd.insertBefore(cardElement, filterContainer);
// };
var renderAdds = function (adds) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adds.length; i++) {
    fragment.appendChild(renderAdd(adds[i]));
  }
  mapPinsBlock.appendChild(fragment);
  // renderCard(renderOfferCard(adds[0]));
};

var deActivateInput = function () {
  for (var i = 0; i < fildSets.length; i++) {
    fildSets[i].disabled = true;
  }
  var x = mapPinImage.x;
  var y = mapPinImage.y;
  adress.value = (x + MAIN_PIN_X_OFFSET) + ',' + (y + MAIN_PIN_Y_OFFSET);
};

var activateInput = function () {
  for (var i = 0; i < fildSets.length; i++) {
    fildSets[i].disabled = false;
  }
};

var checksGuests = function () {
  var count = selectRoom.value;
  checkRoomCapacity(count);
};


var activation = function () {
  mapAd.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  checksGuests();
  renderAdds(createAdds(QANTITY_ADS));
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

deActivateInput();
mapPin.addEventListener('mousedown', onPinMousedown);
mapPin.addEventListener('keydown', onActivationKeydown);
selectRoom.addEventListener('change', onSelectRoom);
