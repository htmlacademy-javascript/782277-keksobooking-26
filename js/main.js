// При выполнении домашнего задания были использованы следующие материалы:
// [Современный учебник JavaScript](https://learn.javascript.ru/number)
// [Округление чисел в JavaScript](https://realadmin.ru/coding/rounding-number-js.html)

function getRandomNumber (min, max, fractional) {

  if (min < 0 || max < 0 || fractional < 0) {
    return NaN;
  } else if (min > max) {
    const swap = min;
    min =  max;
    max = swap;
  }

  if (fractional === undefined) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return parseFloat((Math.random() * (max - min) + min).toFixed(fractional));
}

getRandomNumber(1.5, 5.9, 6);
