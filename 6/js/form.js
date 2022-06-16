const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const disablePage = () => {
  adForm.classList.add('ad-form--disabled');
  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].disabled = true;
  }

  mapFilters.classList.add('map__filters--disabled');
  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].disabled = true;
  }
};

const enablePage = () => {
  adForm.classList.remove('ad-form--disabled');
  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].disabled = false;
  }

  mapFilters.classList.remove('map__filters--disabled');
  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].disabled = false;
  }
};

export {disablePage, enablePage};
