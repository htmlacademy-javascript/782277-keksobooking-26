// Вспомогательные функции getRandomPositiveInteger и getRandomPositiveFloat принес на хвосте Кекс
// Источник - https://up.htmlacademy.ru/profession/frontender/13/javascript/26/tasks/8

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

function getRandomSlicedArray (elements) {
  const randomSlicedArray = [];
  const randomSlicedArrayLength = getRandomPositiveInteger(1, elements.length);
  while (randomSlicedArray.length < randomSlicedArrayLength) {
    const randomElement = getRandomArrayElement(elements);
    if (!randomSlicedArray.includes(randomElement)) {
      randomSlicedArray.push(randomElement);
    }
  }
  return randomSlicedArray;
}

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomSlicedArray};
