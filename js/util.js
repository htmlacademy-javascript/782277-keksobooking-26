// Вспомогательные функции getRandomPositiveInteger и getRandomPositiveFloat принес на хвосте Кекс
// Источник - https://up.htmlacademy.ru/profession/frontender/13/javascript/26/tasks/8

// Возвращает целое случайное число из диапазона
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Возвращает случайное число с плавающей точкой из диапазона
const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

// Возвращает случайный элемент из массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

// Возвращает массив случайной длинны со случайными элементами
const getRandomSlicedArray = (elements) => {
  const randomSlicedArray = [];
  const randomSlicedArrayLength = getRandomPositiveInteger(1, elements.length);
  while (randomSlicedArray.length < randomSlicedArrayLength) {
    const randomElement = getRandomArrayElement(elements);
    if (!randomSlicedArray.includes(randomElement)) {
      randomSlicedArray.push(randomElement);
    }
  }
  return randomSlicedArray;
};

// Добавляет данные DOM-элементу в зависимости от типа, если данных нет => скрывает DOM-элемент
const addElementData = (element, elementProperty, elementData) => {
  if (elementData && elementProperty === 'image') {
    element.src = elementData;
  } else if (elementData && elementProperty === 'text') {
    element.textContent = elementData;
  } else {
    element.classList.add('hidden');
  }
};

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomSlicedArray, addElementData};
