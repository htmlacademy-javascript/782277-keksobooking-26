import {sendData} from './data.js';
import {resetMap} from './map.js';
import {resetMapFilter} from './filter.js';
import {disableSubmitButton, enableSubmitButton, resetAdvertForm} from './form.js';
import {resetSlider} from './slider.js';

const TITLE_OPTION = {
  minLength: 30,
  maxLength: 100,
};

const CAPACITY_OPTION = {
  notGuest: 0,
  maxRoom: 100,
};

const priceOption = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
  maxPerNight: 100000,
};

const advertForm = document.querySelector('.ad-form');
const advertFormTitle = advertForm.querySelector('#title');
const advertFormType = advertForm.querySelector('#type');
const advertFormPrice = advertForm.querySelector('#price');
const advertFormSlider = advertForm.querySelector('.ad-form__slider');
const advertFormTimeIn = advertForm.querySelector('#timein');
const advertFormTimeOut = advertForm.querySelector('#timeout');
const advertFormRoom = advertForm.querySelector('#room_number');
const advertFormGuest = advertForm.querySelector('#capacity');
const advertFormReset = advertForm.querySelector('.ad-form__reset');

const pristine = new Pristine(advertForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

// Валидация заголовка объявления
const validateTitle = (value) => value.length >= TITLE_OPTION.minLength && value.length <= TITLE_OPTION.maxLength;

const createTitleValidationMessage = (value) => {
  if (value.length <= TITLE_OPTION.minLength) {
    return `Минимальная длинна заголовка ${TITLE_OPTION.minLength} символов`;
  } else if (value.length >= TITLE_OPTION.maxLength) {
    return `Максимальная длинна заголовка ${TITLE_OPTION.maxLength} символов`;
  }
};

pristine.addValidator(advertFormTitle, validateTitle, createTitleValidationMessage);

// Валидация цены за ночь и соотношение с типом жилья
const getMinPricePerNight = () => priceOption[advertFormType.value];
advertFormPrice.placeholder = getMinPricePerNight();

const validatePrice = (value) => {
  const price = Number(value);
  return price >= getMinPricePerNight() && price <= priceOption.maxPerNight;
};

const createPriceValidationMessage = (value) => {
  const price = Number(value);
  const minPricePerNight = getMinPricePerNight();
  if (price < minPricePerNight) {
    return `Минимальная цена за ночь ${minPricePerNight} руб.`;
  } else if (price >= priceOption.maxPerNight) {
    return `Максимальная цена за ночь ${priceOption.maxPerNight} руб.`;
  }
};

pristine.addValidator(advertFormPrice, validatePrice, createPriceValidationMessage);

advertFormType.addEventListener('change', () => {
  advertFormPrice.placeholder = getMinPricePerNight();
  pristine.validate(advertFormPrice);
});

advertFormPrice.addEventListener('input', () => {
  pristine.validate(advertFormPrice);
});

advertFormSlider.noUiSlider.on('slide', () => {
  pristine.validate(advertFormPrice);
});

// Валидация соотношение времени заезда и выезда
const synchronizeTimeInOut = (time) => {
  advertFormTimeIn.value = time.value;
  advertFormTimeOut.value = time.value;
};

advertFormTimeIn.addEventListener('change', (evt) => {
  synchronizeTimeInOut(evt.target);
});

advertFormTimeOut.addEventListener('change', (evt) => {
  synchronizeTimeInOut(evt.target);
});

// Валидация соотношения комнат и гостей
const validateCapacity = (value) => {
  const capacity = Number(value);
  const room = Number(advertFormRoom.value);
  const guest = Number(advertFormGuest.value);

  switch (capacity) {
    case CAPACITY_OPTION.maxRoom:
      return guest === CAPACITY_OPTION.notGuest;
    case CAPACITY_OPTION.notGuest:
      return room === CAPACITY_OPTION.maxRoom;
    default:
      return room >= guest
      && room !== CAPACITY_OPTION.maxRoom
      && guest !== CAPACITY_OPTION.notGuest;
  }
};

const createCapacityValidationMessage = () => {
  const room = Number(advertFormRoom.value);
  const guest = Number(advertFormGuest.value);

  if (room < guest) {
    return 'Мест для гостей не достаточно';
  } else if (room === CAPACITY_OPTION.maxRoom) {
    return 'Выберете количество мест - не для гостей';
  } else if (guest === CAPACITY_OPTION.notGuest) {
    return 'Выберете вариант размещения - 100 комнат';
  }
  return 'Попробуйте выбрать другой вариант';
};

pristine.addValidator(advertFormGuest, validateCapacity, createCapacityValidationMessage);

advertFormRoom.addEventListener('change', () => {
  pristine.validate(advertFormGuest);
});

advertFormGuest.addEventListener('change', () => {
  pristine.validate(advertFormGuest);
});

// Возвращает страницу в исходное состояние
const resetPage = () => {
  resetMapFilter();
  resetAdvertForm();
  resetSlider();
  resetMap();
};

advertFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});

// Валидация всей формы
const setAdvertFormSubmit = (onSuccess, onError) => {
  advertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      disableSubmitButton();
      sendData(
        () => {
          onSuccess();
          enableSubmitButton();
          resetPage();
        },
        () => {
          onError();
          enableSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
};

export {setAdvertFormSubmit};
