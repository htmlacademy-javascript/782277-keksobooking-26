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
const createAdvertPopup = ({
  author: {avatar},
  offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}
}) => {
  const advertPopupTemplate = document.querySelector('#card').content.querySelector('.popup');
  const advert = advertPopupTemplate.cloneNode(true);

  const advertAvatar = advert.querySelector('.popup__avatar');
  const advertTitle = advert.querySelector('.popup__title');
  const advertAddress = advert.querySelector('.popup__text--address');
  const advertPrice = advert.querySelector('.js-popup__price');
  const advertType = advert.querySelector('.popup__type');
  const advertCapacity = advert.querySelector('.popup__text--capacity');
  const advertTime = advert.querySelector('.popup__text--time');
  const advertFeatures = advert.querySelectorAll('.popup__feature');
  const advertDescription = advert.querySelector('.popup__description');
  const advertPhotos = advert.querySelector('.popup__photos');
  const advertPhoto = advertPhotos.querySelector('.popup__photo');

  addElementData(advertAvatar, 'image', avatar);
  addElementData(advertTitle, 'text', title);
  addElementData(advertAddress, 'text', address);
  addElementData(advertPrice, 'text', price);
  addElementData(advertType, 'text', getHouseType(type));
  addElementData(advertCapacity, 'text', `${rooms} комнаты для ${guests} гостей`);
  addElementData(advertTime, 'text', `Заезд после ${checkin}, выезд до ${checkout}`);
  getHouseFeatures(advertFeatures, features);
  addElementData( advertDescription, 'text', description);
  getHousePhotos(advertPhotos, advertPhoto, photos);

  return advert;
};

export {createAdvertPopup};
