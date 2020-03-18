'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var mapAd = document.querySelector('.map');
  var mapPinsBlock = mapAd.querySelector('.map__pins');
  var buttonDrag = mapPinsBlock.querySelector('.map__pin--main');
  var filterContainer = mapAd.querySelector('.map__filters-container');
  var typesHousing = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var pinsElements = [];
  var renderAdd = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x + 'px';
    pinElement.style.top = ad.location.y + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    return pinElement;
  };
  var createFeatures = function (adFeatures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adFeatures.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--' + adFeatures[i]);
      fragment.appendChild(featureElement);
    }
    return fragment;
  };
  var createPhotos = function (adPhotos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adPhotos.length; i++) {
      var photoElement = document.createElement('img');
      photoElement.classList.add('.popup__photo');
      photoElement.width = '70';
      photoElement.height = '70';
      photoElement.alt = 'Аватар пользователя';
      photoElement.src = adPhotos[i];
      fragment.appendChild(photoElement);
    }
    return fragment;
  };
  var renderOfferCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    var popupFeatures = cardElement.querySelector('.popup__features');
    var photoPopup = cardElement.querySelector('.popup__photos');
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typesHousing[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time ').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    popupFeatures.innerHTML = '';
    popupFeatures.appendChild(createFeatures(card.offer.features));
    photoPopup.innerHTML = '';
    photoPopup.appendChild(createPhotos(card.offer.photos));
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    return cardElement;
  };
  var renderCard = function (cardElement) {
    mapAd.insertBefore(cardElement, filterContainer);
  };
  var renderAdds = function (add) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < add.length; i++) {
      var pinElement = renderAdd(window.data.adds[i]);
      fragment.appendChild(pinElement);
      pinsElements.push(pinElement);
    }
    mapPinsBlock.appendChild(fragment);
  };

  var removeCardElement = function () {
    var cardElement = document.querySelector('.map__card');
    if (cardElement) {
      cardElement.remove();
    }
  };
  var onPinEscPress = function (e) {
    if (e.key === ESC_KEY) {
      removeCardElement();
    }
  };

  var onPinCloseCard = function (e) {
    if (typeof e === 'object' && e.button === 0) {
      removeCardElement();
    }
  };
  var onMapPinsBlockMousedown = function (e) {
    if (e.button !== 0) {
      return;
    }
    removeCardElement();
    var targetPin;
    if (e.target.classList.contains('map__pin') && !e.target.classList.contains('map__pin--main')) {
      targetPin = e.target;
      // ;
    } else if (e.target.tagName === 'IMG' && e.target.parentElement.classList.contains('map__pin') && !e.target.parentElement.classList.contains('map__pin--main')) {
      targetPin = e.target.parentElement;
    }
    if (targetPin) {
      var index = pinsElements.indexOf(targetPin);
      if (index !== -1 && index < window.data.adds.length) {
        renderCard(renderOfferCard(window.data.adds[index]));
        var cardOnMap = document.querySelector('.map__card');
        document.addEventListener('keydown', onPinEscPress);
        cardOnMap.addEventListener('mousedown', onPinCloseCard);
      }
    }
  };
  mapPinsBlock.addEventListener('mousedown', onMapPinsBlockMousedown);
  window.card = {
    renderOfferCard: renderOfferCard,
    renderAdds: renderAdds,
    renderCard: renderCard,
    pinsElements: pinsElements
  };
  buttonDrag.addEventListener('mousedown', function (e) {
    e.preventDefault();
    var startCoords = {
      x: e.clientX,
      y: e.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      buttonDrag.style.top = (buttonDrag.offsetTop - shift.y) + 'px';
      buttonDrag.style.left = (buttonDrag.offsetLeft - shift.x) + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

