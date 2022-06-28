import {addElementData} from './util.js';

// Возвращает тип жилья
const getHouseType = (dataTypes) => {
  switch (dataTypes) {
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

// Удаляет из разметки преимущества жилья, на основе полученных данных
const getHouseFeatures = (templateFeatures, dataFeatures) => {
  templateFeatures.forEach((templateFeature) => {
    const isNecessary =  dataFeatures.some(
      (dataFeature) => templateFeature.classList.contains(`popup__feature--${dataFeature}`)
    );

    if (!isNecessary) {
      templateFeature.remove();
    }
  });
};

// Добавляет фото жилья
const getHousePhotos = (templatePhotos, templatePhoto, dataPhotos) => {
  const photoFragment = document.createDocumentFragment();

  dataPhotos.forEach((photoSource) => {
    const photo = templatePhoto.cloneNode(true);
    photo.src = photoSource;
    photoFragment.append(photo);
  });

  templatePhotos.innerHTML = '';
  templatePhotos.append(photoFragment);
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
  const popupFeatures = popup.querySelectorAll('.popup__feature');
  const popupDescription = popup.querySelector('.popup__description');
  const popupPhotos = popup.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');

  addElementData(popupAvatar, 'image', avatar);
  addElementData(popupTitle, 'text', title);
  addElementData(popupAddress, 'text', address);
  addElementData(popupPrice, 'text', price);
  addElementData(popupType, 'text', getHouseType(type));
  addElementData(popupCapacity, 'text', `${rooms} комнаты для ${guests} гостей`);
  addElementData(popupTime, 'text', `Заезд после ${checkin}, выезд до ${checkout}`);
  getHouseFeatures(popupFeatures, features);
  addElementData( popupDescription, 'text', description);
  getHousePhotos(popupPhotos, popupPhoto, photos);

  return popup;
};

export {createPopup};
