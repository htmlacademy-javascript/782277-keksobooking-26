import {addElementData} from './util.js';

const getHouseType = (advertDataType) => {
  switch (advertDataType) {
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

const getHouseFeatures = (advertTemplateFeatures, advertDataFeatures) => {
  advertTemplateFeatures.forEach((templateFeature) => {
    const isNecessary =  advertDataFeatures.some(
      (dataFeature) => templateFeature.classList.contains(`popup__feature--${dataFeature}`)
    );

    if (!isNecessary) {
      templateFeature.remove();
    }
  });
};

const getHousePhotos = (advertTemplatePhotoList, advertTemplatePhoto, advertDataPhoto) => {
  const photoFragment = document.createDocumentFragment();

  advertDataPhoto.forEach((photoSrc) => {
    const templatePhoto = advertTemplatePhoto.cloneNode(true);
    templatePhoto.src = photoSrc;
    photoFragment.append(templatePhoto);
  });

  advertTemplatePhotoList.innerHTML = '';
  advertTemplatePhotoList.append(photoFragment);
};

const createAdvertPopup = ({
  author: {avatar},
  offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}
}) => {
  const advertPopupTemplate = document.querySelector('#card').content.querySelector('.popup');
  const advert = advertPopupTemplate.cloneNode(true);

  const advertAvatar = advert.querySelector('.popup__avatar');
  const advertTitle = advert.querySelector('.popup__title');
  const advertAddress = advert.querySelector('.popup__text--address');
  const advertPrice = advert.querySelector('.popup__text--price');
  const advertType = advert.querySelector('.popup__type');
  const advertCapacity = advert.querySelector('.popup__text--capacity');
  const advertTime = advert.querySelector('.popup__text--time');
  const advertFeatures = advert.querySelectorAll('.popup__feature');
  const advertDescription = advert.querySelector('.popup__description');
  const advertPhotoList = advert.querySelector('.popup__photos');
  const advertPhotoItem = advertPhotoList.querySelector('.popup__photo');

  addElementData(advertAvatar, 'image', avatar);
  addElementData(advertTitle, 'text', title);
  addElementData(advertAddress, 'text', address);
  addElementData(advertPrice, 'text', `${price} ₽/ночь`);
  addElementData(advertType, 'text', getHouseType(type));
  addElementData(advertCapacity, 'text', `${rooms} комнаты для ${guests} гостей`);
  addElementData(advertTime, 'text', `Заезд после ${checkin}, выезд до ${checkout}`);
  getHouseFeatures(advertFeatures, features);
  addElementData( advertDescription, 'text', description);
  getHousePhotos(advertPhotoList, advertPhotoItem, photos);

  return advert;
};

export {createAdvertPopup, getHouseType};
