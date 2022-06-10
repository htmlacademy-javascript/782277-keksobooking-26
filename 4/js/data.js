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
  from: 99000,
  to: 1000000
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
  to: 100
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

const QUANTITY_ANNOUNCEMENT = 10;

function createAnnouncement (authorAvatar, locationLat, locationLng) {
  return {
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
  };
}

function createSimilarAnnouncements () {
  const avatarImageSrc = getAvatarSrc();
  const similarAnnouncements = [];

  function getAvatarSrc () {
    const avatarSrc = [];
    for (let i = AVATAR.from; i <= AVATAR.to; i++) {
      const imageSrc = `img/avatars/user${i < 10 ? AVATAR.prefix + i : i}.png`;
      avatarSrc.push(imageSrc);
    }
    return avatarSrc;
  }

  function getRandomAvatar (avatars) {
    const randomIndex = getRandomPositiveInteger(0, avatars.length - 1);
    const randomAvatar = avatars[randomIndex];
    avatars.splice(randomIndex, 1);
    return randomAvatar;
  }

  for (let i = 1; i <= QUANTITY_ANNOUNCEMENT; i++) {
    const avatarImage = getRandomAvatar(avatarImageSrc);
    const latitude = getRandomPositiveFloat(LOCATION.lat.from, LOCATION.lat.to, LOCATION.digits);
    const longitude = getRandomPositiveFloat(LOCATION.lng.from, LOCATION.lng.to, LOCATION.digits);
    const announcement = createAnnouncement(avatarImage, latitude, longitude);
    similarAnnouncements.push(announcement);
  }

  return similarAnnouncements;
}

export {createSimilarAnnouncements};
