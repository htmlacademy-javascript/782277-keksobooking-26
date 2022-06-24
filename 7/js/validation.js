const advertForm = document.querySelector('.ad-form');

const advertFormTitle = advertForm.querySelector('#title');
const advertFormPrice = advertForm.querySelector('#price');
const advertFormRoom = advertForm.querySelector('#room_number');
const advertFormGuest = advertForm.querySelector('#capacity');

const titleOption = {
  minLength: 30,
  maxLength: 100
};

const priceOption = {
  minPerNight: 0,
  maxPerNight: 100000
};

const capacityOption = {
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
const validateTitle = (value) => value.length >= titleOption.minLength && value.length <= titleOption.maxLength;

const createTitleValidationMessage = (value) => {
  if (value.length <= titleOption.minLength) {
    return `Минимальная длинна заголовка ${titleOption.minLength} символов`;
  } else if (value.length >= titleOption.maxLength) {
    return `Максимальная длинна заголовка ${titleOption.maxLength} символов`;
  }
};

pristine.addValidator(advertFormTitle, validateTitle, createTitleValidationMessage);

// Валидация цены за ночь
const validatePrice = (value) => parseInt(value, 10) >= priceOption.minPerNight && parseInt(value, 10) <= priceOption.maxPerNight;

const createPriceValidationMessage = (value) => {
  if (parseInt(value, 10) < priceOption.minPerNight) {
    return `Минимальная цена за ночь ${priceOption.minPerNight} руб.`;
  } else if (parseInt(value, 10) >= priceOption.maxPerNight) {
    return `Максимальная цена за ночь ${priceOption.maxPerNight} руб.`;
  }
};

pristine.addValidator(advertFormPrice, validatePrice, createPriceValidationMessage);

// Валидация соотношения комнат и гостей
const validateCapacity = (capacityValue) => {
  switch (parseInt(capacityValue, 10)) {
    case capacityOption.maxRoom:
      return parseInt(advertFormGuest.value, 10) === capacityOption.notGuest;
    case capacityOption.notGuest:
      return parseInt(advertFormRoom.value, 10) === capacityOption.maxRoom;
    default:
      return parseInt(advertFormRoom.value, 10) >= parseInt(advertFormGuest.value, 10)
      && parseInt(advertFormRoom.value, 10) !== capacityOption.maxRoom
      && parseInt(advertFormGuest.value, 10) !== capacityOption.notGuest;
  }
};

const createRoomValidationMessage = () => {
  if (parseInt(advertFormRoom.value, 10) < parseInt(advertFormGuest.value, 10)) {
    return 'Комната слишком мала';
  } else if (parseInt(advertFormRoom.value, 10) === capacityOption.maxRoom) {
    return 'Выберете количество мест - не для гостей';
  }
  return 'Попробуйте выбрать другой вариант';
};

const createGuestValidationMessage = () => {
  if (parseInt(advertFormRoom.value, 10) < parseInt(advertFormGuest.value, 10)) {
    return 'Мест для гостей не достаточно';
  } else if (parseInt(advertFormGuest.value, 10) === capacityOption.notGuest) {
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
