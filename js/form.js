const advertForm = document.querySelector('.ad-form');
const advertFormFieldsets = advertForm.querySelectorAll('fieldset');
const advertFormSlider = advertForm.querySelector('.ad-form__slider');

// Блокирует форму создания нового объявления и поля внутри
const disableAdvertForm = () => {
  advertForm.classList.add('ad-form--disabled');
  advertFormSlider.setAttribute('disabled', true);
  advertFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

// Активирует форму создания нового объявления и поля внутри
const enableAdvertForm = () => {
  advertForm.classList.remove('ad-form--disabled');
  advertFormSlider.removeAttribute('disabled');
  advertFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

export {disableAdvertForm, enableAdvertForm};
