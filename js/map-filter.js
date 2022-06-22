const mapFilterForm = document.querySelector('.map__filters');
const mapFilters = mapFilterForm.querySelectorAll('.map__filter, .map__features');

const disableMapFilter = () => {
  mapFilterForm.classList.add('map__filters--disabled');
  mapFilters.forEach((filter) => {
    filter.disabled = true;
  });
};

const enableMapFilter = () => {
  mapFilterForm.classList.remove('map__filters--disabled');
  mapFilters.forEach((filter) => {
    filter.disabled = false;
  });
};

export {disableMapFilter, enableMapFilter};
