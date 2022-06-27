const advertForm = document.querySelector('.ad-form');
const advertFormPrice = advertForm.querySelector('#price');
const advertFormSlider = advertForm.querySelector('.ad-form__slider');

const SLIDER_OPTIONS = {
  minPrice: 0,
  maxPrice: 100000,
  step: 100,
  accuracy: 0
};

// Создает и настраивает слайдер
noUiSlider.create(advertFormSlider, {
  range: {
    min: SLIDER_OPTIONS.minPrice,
    max: SLIDER_OPTIONS.maxPrice
  },
  start: SLIDER_OPTIONS.minPrice,
  step: SLIDER_OPTIONS.step,
  connect: 'lower',
  format: {
    to: function (value) {
      return Number(value.toFixed(SLIDER_OPTIONS.accuracy));
    },
    from: function (value) {
      return Number(parseFloat(value).toFixed(SLIDER_OPTIONS.accuracy));
    }
  }
});

// Отслеживает изменение в поле "цена за ночь" и изменяет положение слайдера
advertFormPrice.addEventListener('input', () => {
  advertFormSlider.noUiSlider.set(advertFormPrice.value);
});

// Отслеживает перетаскивание слайдера и задает значение в поле "цена за ночь"
advertFormSlider.noUiSlider.on('slide', () => {
  advertFormPrice.value = advertFormSlider.noUiSlider.get();
});
