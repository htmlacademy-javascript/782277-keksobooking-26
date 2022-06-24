const advertForm = document.querySelector('.ad-form');
const advertFormFieldsets = advertForm.querySelectorAll('fieldset');

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

export {disableAdvertForm, enableAdvertForm};
