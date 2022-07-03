const advertForm = document.querySelector('.ad-form');
const advertFormFieldsets = advertForm.querySelectorAll('fieldset');
const advertFormSlider = advertForm.querySelector('.ad-form__slider');
const advertFormSubmit = advertForm.querySelector('.ad-form__submit');

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

// Блокирует кнопку "опубликовать"
const disableSubmitButton = () => {
  advertFormSubmit.disabled = true;
  advertFormSubmit.textContent = 'Публикую...';
};

// Активирует кнопку "опубликовать"
const enableSubmitButton = () => {
  advertFormSubmit.disabled = false;
  advertFormSubmit.textContent = 'Опубликовать';
};

// Возвращает форму создания нового объявления в исходное состояние
const resetAdvertForm = () => advertForm.reset();

export {disableAdvertForm, enableAdvertForm, disableSubmitButton, enableSubmitButton, resetAdvertForm};
