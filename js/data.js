import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomSlicedArray} from './util.js';

const AVATAR = {
  from: 1,
  to: 10,
  prefix: '0'
};

const TITLES = [
  'Коробочка для котеи',
  'Квартира в центре столицы',
  'Квартира на берегу моря',
  'Уютный дом в лесу',
  'Апартаменты'
];

const PRICE = {
  from: 3000,
  to: 10000
};

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const ROOMS = {
  from: 1,
  to: 10
};

const GUESTS = {
  from: 1,
  to: 20
};

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTIONS = [
  'Удобное расположение',
  'Развитая инфраструктура',
  'Комфортная зона для встреч',
  'Паркинг для автомобилей',
  'Огромный лесной массив'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const LOCATION = {
  lat: {
    from: 35.65000,
    to: 35.70000
  },
  lng: {
    from: 139.70000,
    to: 139.80000
  },
  digits: 5
};

const QUANTITY_ADVERT = 10;

const getRandomAvatar = () => {
  const avatarSrc = [];

  for (let i = AVATAR.from; i <= AVATAR.to; i++) {
    const imageSrc = `img/avatars/user${i < 10 ? AVATAR.prefix + i : i}.png`;
    avatarSrc.push(imageSrc);
  }

  return () => {
    const randomIndex = getRandomPositiveInteger(0, avatarSrc.length - 1);
    const randomAvatar = avatarSrc[randomIndex];
    avatarSrc.splice(randomIndex, 1);
    return randomAvatar;
  };
};

const createAdvertData = (authorAvatar, locationLat, locationLng) => ({
  author: {
    avatar: authorAvatar
  },
  offer: {
    title: getRandomArrayElement(TITLES),
    address: `${locationLat}, ${locationLng}`,
    price: getRandomPositiveInteger(PRICE.from, PRICE.to),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomPositiveInteger(ROOMS.from, ROOMS.to),
    guests: getRandomPositiveInteger(GUESTS.from, GUESTS.to),
    checkin: getRandomArrayElement(CHECKINS),
    checkout: getRandomArrayElement(CHECKOUTS),
    features: getRandomSlicedArray(FEATURES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getRandomSlicedArray(PHOTOS)
  },
  location: {
    lat: locationLat,
    lng: locationLng
  }
});

const createSimilarAdvertData = () => {
  const randomAvatarSrc = getRandomAvatar();
  const similarAdvert = [];

  for (let i = 1; i <= QUANTITY_ADVERT; i++) {
    const avatarImage = randomAvatarSrc();
    const latitude = getRandomPositiveFloat(LOCATION.lat.from, LOCATION.lat.to, LOCATION.digits);
    const longitude = getRandomPositiveFloat(LOCATION.lng.from, LOCATION.lng.to, LOCATION.digits);
    const advert = createAdvertData(avatarImage, latitude, longitude);
    similarAdvert.push(advert);
  }

  return similarAdvert;
};

export {createSimilarAdvertData};
