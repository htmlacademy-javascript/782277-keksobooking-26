import {getHouseType} from './popup.js';

const advertForm = document.querySelector('.ad-form');
const advertFormTitle = advertForm.querySelector('#title');
const advertFormType = advertForm.querySelector('#type');
const advertFormPrice = advertForm.querySelector('#price');
const advertFormTimeIn = advertForm.querySelector('#timein');
const advertFormTimeOut = advertForm.querySelector('#timeout');
const advertFormRoom = advertForm.querySelector('#room_number');
const advertFormGuest = advertForm.querySelector('#capacity');

const TITLE_OPTION = {
  minLength: 30,
  maxLength: 100
};

const priceOption = {
  'Бунгало': 0,
  'Квартира': 1000,
  'Отель': 3000,
  'Дом': 5000,
  'Дворец': 10000,
  maxPerNight: 100000
};

const CAPACITY_OPTION = {
  notGuest: 0,
  maxRoom: 100
};

const pristine = new Pristine(advertForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
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

// Валидация соотношение типа жилья с ценой за ночь
const getMinPricePerNight = () => {
  const typeHousing = getHouseType(advertFormType.value);
  return priceOption[typeHousing];
};

advertFormPrice.placeholder = getMinPricePerNight();

advertFormType.addEventListener('change', () => {
  advertFormPrice.placeholder = getMinPricePerNight();
  pristine.validate(advertFormPrice);
});

// Валидация цены за ночь
const validatePrice = (value) => parseInt(value, 10) >= getMinPricePerNight() && parseInt(value, 10) <= priceOption.maxPerNight;

const createPriceValidationMessage = (value) => {
  const minPricePerNight = getMinPricePerNight();
  if (parseInt(value, 10) < minPricePerNight) {
    return `Минимальная цена за ночь ${minPricePerNight} руб.`;
  } else if (parseInt(value, 10) >= priceOption.maxPerNight) {
    return `Максимальная цена за ночь ${priceOption.maxPerNight} руб.`;
  }
};

pristine.addValidator(advertFormPrice, validatePrice, createPriceValidationMessage);

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
const validateCapacity = (capacityValue) => {
  switch (parseInt(capacityValue, 10)) {
    case CAPACITY_OPTION.maxRoom:
      return parseInt(advertFormGuest.value, 10) === CAPACITY_OPTION.notGuest;
    case CAPACITY_OPTION.notGuest:
      return parseInt(advertFormRoom.value, 10) === CAPACITY_OPTION.maxRoom;
    default:
      return parseInt(advertFormRoom.value, 10) >= parseInt(advertFormGuest.value, 10)
      && parseInt(advertFormRoom.value, 10) !== CAPACITY_OPTION.maxRoom
      && parseInt(advertFormGuest.value, 10) !== CAPACITY_OPTION.notGuest;
  }
};

const createRoomValidationMessage = () => {
  if (parseInt(advertFormRoom.value, 10) < parseInt(advertFormGuest.value, 10)) {
    return 'Комната слишком мала';
  } else if (parseInt(advertFormRoom.value, 10) === CAPACITY_OPTION.maxRoom) {
    return 'Выберете количество мест - не для гостей';
  }
  return 'Попробуйте выбрать другой вариант';
};

const createGuestValidationMessage = () => {
  if (parseInt(advertFormRoom.value, 10) < parseInt(advertFormGuest.value, 10)) {
    return 'Мест для гостей не достаточно';
  } else if (parseInt(advertFormGuest.value, 10) === CAPACITY_OPTION.notGuest) {
    return 'Выберете вариант размещения - 100 комнат';
  }
  return 'Попробуйте выбрать другой вариант';
};

pristine.addValidator(advertFormRoom, validateCapacity, createRoomValidationMessage);
pristine.addValidator(advertFormGuest, validateCapacity, createGuestValidationMessage);

advertFormRoom.addEventListener('change', () => {
  pristine.validate(advertFormGuest);
});

advertFormGuest.addEventListener('change', () => {
  pristine.validate(advertFormRoom);
});

// Валидация всей формы
advertForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();

  // const isValid = pristine.validate();
  // if (isValid) {
  //   console.log('Можно отправлять');
  // } else {
  //   console.log('Форма невалидна');
  // }
});
