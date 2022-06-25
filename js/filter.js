const mapForm = document.querySelector('.map__filters');
const mapFormFilters = mapForm.querySelectorAll('.map__filter, .map__features');

const disableMapForm = () => {
  mapForm.classList.add('map__filters--disabled');
  mapFormFilters.forEach((filter) => {
    filter.disabled = true;
  });
};

const enableMapForm = () => {
  mapForm.classList.remove('map__filters--disabled');
  mapFormFilters.forEach((filter) => {
    filter.disabled = false;
  });
};

export {disableMapForm, enableMapForm};
