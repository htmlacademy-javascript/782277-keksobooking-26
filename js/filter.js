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

// Фильтр по типу жилья
const filterType = (data) => {
  const filterTypeValue = mapFilterType.value;
  const advertTypeValue = data.offer.type;

  switch (filterTypeValue) {
    case 'any':
      return true;
    default:
      return filterTypeValue === advertTypeValue;
  }
};

// Фильтр по цене за ночь
const filterPrice = (data) => {
  const filterPriceValue = mapFilterPrice.value;
  const advertPriceValue = Number(data.offer.price);

  switch (filterPriceValue) {
    case 'any':
      return true;
    case 'low':
      return advertPriceValue < PRICE_RANGE.low;
    case 'middle':
      return advertPriceValue >= PRICE_RANGE.low && advertPriceValue <= PRICE_RANGE.high;
    case 'high':
      return advertPriceValue > PRICE_RANGE.high;
  }
};

// Фильтр по количеству комнат
const filterRoom = (data) => {
  const filterRoomValue = mapFilterRoom.value;
  const advertRoomValue = Number(data.offer.rooms);

  switch (filterRoomValue) {
    case 'any':
      return true;
    default:
      return Number(filterRoomValue) === advertRoomValue;
  }
};

// Фильтр по количеству гостей
const filterGuest = (data) => {
  const filterGuestValue = mapFilterGuest.value;
  const advertGuestValue = Number(data.offer.guests);

  switch (filterGuestValue) {
    case 'any':
      return true;
    default:
      return Number(filterGuestValue) === advertGuestValue;
  }
};

// Фильтр по преимуществам
const filterFeature = (data) => {
  const checkedFilterFeatures = [];
  const advertFeatures = data.offer.features;

  mapFilterFeatures.forEach((feature) => {
    if(feature.checked) {
      checkedFilterFeatures.push(feature.value);
    }
  });

  if (checkedFilterFeatures.length > 0 && advertFeatures) {
    return checkedFilterFeatures.every((feature) => advertFeatures.includes(feature));
  }

  if (checkedFilterFeatures.length === 0) {
    return true;
  }
};

// Возвращает количество преимуществ в объявлении
const getFeatureRank = (data) => {
  const advertFeatures = data.offer.features;
  if (advertFeatures) {
    return advertFeatures.length;
  }

  return 0;
};

// Сравнивает количество преимуществ в объявлениях
const compareFeature = (advertA, advertB) => {
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

export {
  setFilter,
  filterType,
  filterPrice,
  filterRoom,
  filterGuest,
  filterFeature,
  compareFeature,
  disableMapFilter,
  enableMapFilter,
  resetMapFilter
};
