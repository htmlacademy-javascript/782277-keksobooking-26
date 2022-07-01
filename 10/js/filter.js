const mapFilter = document.querySelector('.map__filters');
const mapFilters = mapFilter.querySelectorAll('.map__filter, .map__features');

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

const resetMapFilter = () => mapFilter.reset();

export {disableMapFilter, enableMapFilter, resetMapFilter};
