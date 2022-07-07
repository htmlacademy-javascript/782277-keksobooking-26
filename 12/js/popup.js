// Добавляет source DOM-элементу
// Если данных нет, то скрывает DOM-элемент
const addElementSrc = (element, elementSrc) => {
  if (elementSrc) {
    element.src = elementSrc;
  } else {
    element.classList.add('hidden');
  }
};

// Добавляет textContent DOM-элементу
// Если данных нет, то скрывает DOM-элемент
const addElementData = (element, elementText) => {
  if (elementText) {
    element.textContent = elementText;
  } else {
    element.classList.add('hidden');
  }
};

// Возвращает тип жилья
const getHouseType = (houseType) => {
  switch (houseType) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalow':
      return 'Бунгало';
    case 'hotel':
      return 'Отель';
  }
};

// Добавляет преимущества жилья, на основе полученных данных
// Если данных нет, то скрывает поле с преимуществами
const getHouseFeatures = (templateFeatureBlock, templateFeatures, dataFeatures) => {
  if (dataFeatures) {
    templateFeatures.forEach((templateFeature) => {
      const isNecessary =  dataFeatures.some(
        (dataFeature) => templateFeature.classList.contains(`popup__feature--${dataFeature}`)
      );

      if (!isNecessary) {
        templateFeature.remove();
      }
    });
  } else {
    templateFeatureBlock.classList.add('hidden');
  }
};

// Добавляет фото жилья
// Если данных нет, то скрывает поле с фотографиями
const getHousePhotos = (templatePhotoBlock, templatePhoto, dataPhotos) => {
  if (dataPhotos) {
    const photoFragment = document.createDocumentFragment();

    dataPhotos.forEach((photoSource) => {
      const photo = templatePhoto.cloneNode(true);
      photo.src = photoSource;
      photoFragment.append(photo);
    });

    templatePhotoBlock.innerHTML = '';
    templatePhotoBlock.append(photoFragment);
  } else {
    templatePhotoBlock.classList.add('hidden');
  }
};

// Создает попап объявления на карте
const createPopup = ({
  author: {avatar},
  offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}
}) => {
  const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popup = popupTemplate.cloneNode(true);

  const popupAvatar = popup.querySelector('.popup__avatar');
  const popupTitle = popup.querySelector('.popup__title');
  const popupAddress = popup.querySelector('.popup__text--address');
  const popupPrice = popup.querySelector('.js-popup__price');
  const popupType = popup.querySelector('.popup__type');
  const popupCapacity = popup.querySelector('.popup__text--capacity');
  const popupTime = popup.querySelector('.popup__text--time');
  const popupFeatureBlock = popup.querySelector('.popup__features');
  const popupFeatures = popup.querySelectorAll('.popup__feature');
  const popupDescription = popup.querySelector('.popup__description');
  const popupPhotoBlock = popup.querySelector('.popup__photos');
  const popupPhoto = popupPhotoBlock.querySelector('.popup__photo');

  addElementSrc(popupAvatar, avatar);
  addElementData(popupTitle, title);
  addElementData(popupAddress, address);
  addElementData(popupPrice, price);
  addElementData(popupType, getHouseType(type));
  addElementData(popupCapacity, `${rooms} комнаты для ${guests} гостей`);
  addElementData(popupTime, `Заезд после ${checkin}, выезд до ${checkout}`);
  getHouseFeatures(popupFeatureBlock, popupFeatures, features);
  addElementData(popupDescription, description);
  getHousePhotos(popupPhotoBlock, popupPhoto, photos);

  return popup;
};

export {createPopup};
