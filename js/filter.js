const mapFilter = document.querySelector('.map__filters');
const mapFilters = mapFilter.querySelectorAll('.map__filter, .map__features');
// const mapFilterType = mapFilter.querySelector('#housing-type');
// const mapFilterPrice = mapFilter.querySelector('#housing-price');
// const mapFilterRoom = mapFilter.querySelector('#housing-rooms');
// const mapFilterGuest = mapFilter.querySelector('#housing-guests');
// const mapFilterFeature = mapFilter.querySelector('#housing-features');

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

export {disableMapFilter, enableMapFilter, resetMapFilter};
