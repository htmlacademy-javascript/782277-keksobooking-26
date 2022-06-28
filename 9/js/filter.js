const mapForm = document.querySelector('.map__filters');
const mapFormFilters = mapForm.querySelectorAll('.map__filter, .map__features');

// Блокирует форму с фильтрами и фильтры внутри
const disableMapForm = () => {
  mapForm.classList.add('map__filters--disabled');
  mapFormFilters.forEach((filter) => {
    filter.disabled = true;
  });
};

// Активирует форму с фильтрами и фильтры внутри
const enableMapForm = () => {
  mapForm.classList.remove('map__filters--disabled');
  mapFormFilters.forEach((filter) => {
    filter.disabled = false;
  });
};

export {disableMapForm, enableMapForm};
