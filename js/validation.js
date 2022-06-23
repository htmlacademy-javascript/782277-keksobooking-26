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

const roomOption = {
  minRoom: 1,
  maxRoom: 100
};

const guestOption = {
  notForGuest: 0,
  maxGuest: 3
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

const createValidateTitleMessage = (value) => {
  if (value.length <= titleOption.minLength) {
    return `Минимальная длинна заголовка ${titleOption.minLength} символов`;
  } else if (value.length >= titleOption.maxLength) {
    return `Максимальная длинна заголовка ${titleOption.maxLength} символов`;
  }
};

pristine.addValidator(advertFormTitle, validateTitle, createValidateTitleMessage);

// Валидация цены за ночь
const validatePrice = (value) => parseInt(value, 10) >= priceOption.minPerNight && parseInt(value, 10) <= priceOption.maxPerNight;

const createValidatePriceMessage = (value) => {
  if (parseInt(value, 10) < priceOption.minPerNight) {
    return `Минимальная цена за ночь ${priceOption.minPerNight} руб.`;
  } else if (parseInt(value, 10) >= priceOption.maxPerNight) {
    return `Максимальная цена за ночь ${priceOption.maxPerNight} руб.`;
  }
};

pristine.addValidator(advertFormPrice, validatePrice, createValidatePriceMessage);

// Валидация соотношения комнат и гостей
const validateCapacity = () => {
  if (parseInt(advertFormRoom.value, 10) < roomOption.maxRoom && parseInt(advertFormGuest.value, 10) > guestOption.notForGuest) {
    return parseInt(advertFormRoom.value, 10) >= parseInt(advertFormGuest.value, 10);
  } else if (parseInt(advertFormRoom.value, 10) === roomOption.maxRoom && parseInt(advertFormGuest.value, 10) === guestOption.notForGuest) {
    return true;
  }
};

const createValidateRoomMessage = () => {
  if (parseInt(advertFormRoom.value, 10) < parseInt(advertFormGuest.value, 10)) {
    return 'Комната слишком мала';
  } else if (parseInt(advertFormRoom.value, 10) === roomOption.maxRoom) {
    return 'Вариант размещения не для гостей';
  }
};

const createValidateGuestMessage = () => {
  if (parseInt(advertFormRoom.value, 10) < parseInt(advertFormGuest.value, 10)) {
    return 'Мест для гостей не достаточно';
  } else if (parseInt(advertFormGuest.value, 10) === guestOption.notForGuest) {
    return 'Вариант размещения 100 комнат';
  }
};

pristine.addValidator(advertFormRoom, validateCapacity, createValidateRoomMessage);
pristine.addValidator(advertFormGuest, validateCapacity, createValidateGuestMessage);

advertFormRoom.addEventListener('change', () => {
  pristine.validate(advertFormRoom);
  pristine.validate(advertFormGuest);
});

advertFormGuest.addEventListener('change', () => {
  pristine.validate(advertFormRoom);
  pristine.validate(advertFormGuest);
});

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
