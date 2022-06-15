import {addElementData} from './util.js';
import {createSimilarAnnouncements} from './data.js';

const map = document.querySelector('.map');
const mapCanvas = map.querySelector('#map-canvas');
const announcementPopupTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarAnnouncementsData = createSimilarAnnouncements();
const similarAnnouncementsFragment = document.createDocumentFragment();

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
  const announcementPhotosFragment = document.createDocumentFragment();

  announcementDataPhotos.forEach((announcementDataPhoto) => {
    const templatePhoto = announcementTemplatePhoto.cloneNode(true);
    templatePhoto.src = announcementDataPhoto;
    announcementPhotosFragment.append(templatePhoto);
  });

  announcementTemplatePhotos.innerHTML = '';
  announcementTemplatePhotos.append(announcementPhotosFragment);
};

similarAnnouncementsData.forEach(({
  author: {avatar},
  offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}
}) => {
  const announcementItem = announcementPopupTemplate.cloneNode(true);

  const announcementAvatar = announcementItem.querySelector('.popup__avatar');
  const announcementTitle = announcementItem.querySelector('.popup__title');
  const announcementAddress = announcementItem.querySelector('.popup__text--address');
  const announcementPrice = announcementItem.querySelector('.popup__text--price');
  const announcementType = announcementItem.querySelector('.popup__type');
  const announcementCapacity = announcementItem.querySelector('.popup__text--capacity');
  const announcementTime = announcementItem.querySelector('.popup__text--time');
  const announcementFeatures = announcementItem.querySelectorAll('.popup__feature');
  const announcementDescription = announcementItem.querySelector('.popup__description');
  const announcementPhotoList = announcementItem.querySelector('.popup__photos');
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

  similarAnnouncementsFragment.append(announcementItem);
});

mapCanvas.append(similarAnnouncementsFragment);
