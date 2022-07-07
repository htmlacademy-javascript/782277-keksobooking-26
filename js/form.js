const FILE_TYPES = ['jpeg', 'jpg', 'png'];

const advertForm = document.querySelector('.ad-form');
const advertFormFieldsets = advertForm.querySelectorAll('fieldset');
const advertFormSlider = advertForm.querySelector('.ad-form__slider');
const advertFormSubmit = advertForm.querySelector('.ad-form__submit');
const avatarImageChooser = advertForm.querySelector('#avatar');
const avatarImage = advertForm.querySelector('.ad-form-header__preview img');
const advertImageChooser = advertForm.querySelector('#images');
const advertImage = advertForm.querySelector('.ad-form__photo');

// Устанавливает превью картинки
const setPreview = (chooser, image) => {
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (matches) {
    image.src = URL.createObjectURL(file);
  }
};

// Предпросмотр аватара
avatarImageChooser.addEventListener('change', () => {
  setPreview(avatarImageChooser, avatarImage);
});

// Создает фото объявления
const createAdvertPhoto = (source = '#', width = 70, height = 70, alt = 'Фотография жилья') => {
  const photo = document.createElement('img');
  photo.classList.add('popup__photo');
  photo.src = source;
  photo.width = width;
  photo.height = height;
  photo.alt = alt;
  advertImage.append(photo);
  return photo;
};

// Предпросмотр фото объявления
advertImageChooser.addEventListener('change', () => {
  setPreview(advertImageChooser, createAdvertPhoto());
});

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

export {disableSubmitButton, enableSubmitButton, disableAdvertForm, enableAdvertForm, resetAdvertForm};
