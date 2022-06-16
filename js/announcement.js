import {addElementData} from './util.js';
import {createSimilarAnnouncements} from './data.js';

const getHouseType = (announcementDataType) => {
  switch (announcementDataType) {
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

const getHouseFeatures = (announcementTemplateFeatures, announcementDataFeatures) => {
  announcementTemplateFeatures.forEach((templateFeature) => {
    const isNecessary =  announcementDataFeatures.some(
      (dataFeature) => templateFeature.classList.contains(`popup__feature--${dataFeature}`)
    );

    if (!isNecessary) {
      templateFeature.remove();
    }
  });
};

const getHousePhotos = (announcementTemplatePhotos, announcementTemplatePhoto, announcementDataPhotos) => {
  const announcementPhotoFragment = document.createDocumentFragment();

  announcementDataPhotos.forEach((photoSrc) => {
    const templatePhoto = announcementTemplatePhoto.cloneNode(true);
    templatePhoto.src = photoSrc;
    announcementPhotoFragment.append(templatePhoto);
  });

  announcementTemplatePhotos.innerHTML = '';
  announcementTemplatePhotos.append(announcementPhotoFragment);
};

const createAnnouncementPopup = (announcementPopupCount) => {
  const announcementsData = createSimilarAnnouncements(announcementPopupCount);
  const announcementPopupTemplate = document.querySelector('#card').content.querySelector('.popup');
  const announcementsPopupFragment = document.createDocumentFragment();

  announcementsData.forEach(({
    author: {avatar},
    offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}
  }) => {
    const announcement = announcementPopupTemplate.cloneNode(true);

    const announcementAvatar = announcement.querySelector('.popup__avatar');
    const announcementTitle = announcement.querySelector('.popup__title');
    const announcementAddress = announcement.querySelector('.popup__text--address');
    const announcementPrice = announcement.querySelector('.popup__text--price');
    const announcementType = announcement.querySelector('.popup__type');
    const announcementCapacity = announcement.querySelector('.popup__text--capacity');
    const announcementTime = announcement.querySelector('.popup__text--time');
    const announcementFeatures = announcement.querySelectorAll('.popup__feature');
    const announcementDescription = announcement.querySelector('.popup__description');
    const announcementPhotoList = announcement.querySelector('.popup__photos');
    const announcementPhotoItem = announcementPhotoList.querySelector('.popup__photo');

    addElementData(announcementAvatar, 'image', avatar);
    addElementData(announcementTitle, 'text', title);
    addElementData(announcementAddress, 'text', address);
    addElementData(announcementPrice, 'text', `${price} ₽/ночь`);
    addElementData(announcementType, 'text', getHouseType(type));
    addElementData(announcementCapacity, 'text', `${rooms} комнаты для ${guests} гостей`);
    addElementData(announcementTime, 'text', `Заезд после ${checkin}, выезд до ${checkout}`);
    getHouseFeatures(announcementFeatures, features);
    addElementData( announcementDescription, 'text', description);
    getHousePhotos(announcementPhotoList, announcementPhotoItem, photos);

    announcementsPopupFragment.append(announcement);
  });

  return announcementsPopupFragment;
};

export {createAnnouncementPopup};
