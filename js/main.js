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

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUT = [
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

const DESCRIPTION = [
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

// Вспомогательные функции getRandomPositiveInteger и getRandomPositiveFloat принес на хвосте Кекс
// Источник - https://up.htmlacademy.ru/profession/frontender/13/javascript/26/tasks/8

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

function getRandomSlicedArray (elements) {
  const randomSlicedArray = [];
  const randomSlicedArrayLength = getRandomPositiveInteger(1, elements.length);
  while (randomSlicedArray.length < randomSlicedArrayLength) {
    const randomElement = getRandomArrayElement(elements);
    if (!randomSlicedArray.includes(randomElement)) {
      randomSlicedArray.push(randomElement);
    }
  }
  return randomSlicedArray;
}

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

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
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getRandomSlicedArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTION),
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

// Добавил в игнор, чтобы была возможность отправить задание на проверку
/* eslint-disable */
console.log(createSimilarAnnouncements());
/* eslint-enable */
