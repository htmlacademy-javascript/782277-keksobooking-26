const advertForm = document.querySelector('.ad-form');
const advertFormPrice = advertForm.querySelector('#price');
const advertFormSlider = advertForm.querySelector('.ad-form__slider');

const SLIDER = {
  min: 0,
  max: 100000,
  step: 100,
  accuracy: 0,
};

// Создает и настраивает слайдер
noUiSlider.create(advertFormSlider, {
  range: {
    min: SLIDER.min,
    max: SLIDER.max,
  },
  start: SLIDER.min,
  step: SLIDER.step,
  connect: 'lower',
  format: {
    to: function (value) {
      return Number(value.toFixed(SLIDER.accuracy));
    },
    from: function (value) {
      return Number(parseFloat(value).toFixed(SLIDER.accuracy));
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

const resetSlider = () => {
  advertFormSlider.noUiSlider.set(SLIDER.min);
};

export {resetSlider};
