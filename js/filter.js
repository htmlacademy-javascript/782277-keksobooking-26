const mapFilter = document.querySelector('.map__filters');
const mapFilters = mapFilter.querySelectorAll('.map__filter, .map__features');
const mapFilterType = mapFilter.querySelector('#housing-type');
const mapFilterPrice = mapFilter.querySelector('#housing-price');
const mapFilterRoom = mapFilter.querySelector('#housing-rooms');
const mapFilterGuest = mapFilter.querySelector('#housing-guests');
const mapFilterFeatures = mapFilter.querySelectorAll('#housing-features input');

const PRICE_RANGE = {
  low: 10000,
  high: 50000,
};

// Проверяет тип жилья
const checkType = (advertData) => {
  const filterType = mapFilterType.value;
  const advertType = advertData;

  switch (filterType) {
    case 'any':
      return true;
    default:
      return filterType === advertType;
  }
};

// Проверяет цену за ночь
const checkPrice = (advertData) => {
  const filterPrice = mapFilterPrice.value;
  const advertPrice = Number(advertData);

  switch (filterPrice) {
    case 'any':
      return true;
    case 'low':
      return advertPrice < PRICE_RANGE.low;
    case 'middle':
      return advertPrice >= PRICE_RANGE.low && advertPrice <= PRICE_RANGE.high;
    case 'high':
      return advertPrice > PRICE_RANGE.high;
  }
};

// Проверяет количество комнат
const checkRoom = (advertData) => {
  const filterRoom = mapFilterRoom.value;
  const advertRoom = Number(advertData);

  switch (filterRoom) {
    case 'any':
      return true;
    default:
      return Number(filterRoom) === advertRoom;
  }
};

// Проверяет количество гостей
const checkGuest = (advertData) => {
  const filterGuest = mapFilterGuest.value;
  const advertGuest = Number(advertData);

  switch (filterGuest) {
    case 'any':
      return true;
    default:
      return Number(filterGuest) === advertGuest;
  }
};

// Проверяет преимущества
const checkFeature = (advertData) => {
  const checkedFilterFeatures = [];
  const advertFeatures = advertData;

  mapFilterFeatures.forEach((feature) => {
    if(feature.checked) {
      checkedFilterFeatures.push(feature.value);
    }
  });

  if (checkedFilterFeatures.length && advertFeatures) {
    return checkedFilterFeatures.every((feature) => advertFeatures.includes(feature));
  }

  if (!checkedFilterFeatures.length) {
    return true;
  }
};

// Проверяет объявление на соответствие всех фильтров
const checkAdvert = ({offer: {type, price, rooms, guests, features}}) =>
  checkType(type) &&
  checkPrice(price) &&
  checkRoom(rooms) &&
  checkGuest(guests) &&
  checkFeature(features);

// Возвращает количество преимуществ в объявлении
const getFeatureRank = (data) => {
  const advertFeatures = data.offer.features;
  if (advertFeatures) {
    return advertFeatures.length;
  }

  return 0;
};

// Сравнивает объявления по количеству преимуществ
const compareAdvertFeature = (advertA, advertB) => {
  const rankA = getFeatureRank(advertA);
  const rankB = getFeatureRank(advertB);

  return rankB - rankA;
};

// Отслеживатет изменения в полях фильтра
const setFilter = (callback) => {
  mapFilter.addEventListener('change', () => {
    callback();
  });
};

// Блокирует форму с фильтрами и фильтры внутри
const disableMapFilter = () => {
  mapFilter.classList.add('map__filters--disabled');
  mapFilters.forEach((filter) => {
    filter.disabled = true;
  });
};

// Активирует форму с фильтрами и фильтры внутри
const enableMapFilter = () => {
  mapFilter.classList.remove('map__filters--disabled');
  mapFilters.forEach((filter) => {
    filter.disabled = false;
  });
};

// Возвращает форму с фильтрами в исходное состояние
const resetMapFilter = () => mapFilter.reset();

export {setFilter, checkAdvert, compareAdvertFeature, disableMapFilter, enableMapFilter, resetMapFilter};
