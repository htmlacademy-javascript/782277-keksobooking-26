import {resetMap} from './map.js';

const advertForm = document.querySelector('.ad-form');
const advertFormFieldsets = advertForm.querySelectorAll('fieldset');
const advertFormReset = advertForm.querySelector('.ad-form__reset');

const disableAdvertForm = () => {
  advertForm.classList.add('ad-form--disabled');
  advertFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const enableAdvertForm = () => {
  advertForm.classList.remove('ad-form--disabled');
  advertFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

advertFormReset.addEventListener('click', () => {
  resetMap();
});

export {disableAdvertForm, enableAdvertForm};
