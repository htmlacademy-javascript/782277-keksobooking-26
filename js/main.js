import {getData} from './data.js';
import {setAdvertFormSubmit} from './validation.js';
import {initializeMap, addAdvertToMap} from './map.js';
import {setFilter, disableMapFilter} from './filter.js';
import {disableAdvertForm} from './form.js';
import {createNotice, createSuccessMessage, createErrorMessage} from './notice.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

// Блокирует фильтрацию объявлений
// Блокирует форму создания нового объявления
disableMapFilter();
disableAdvertForm();

// Инициализирует карту
initializeMap();

// Получает данные от сервера
// Отрисовывает объявления на карте
// Задает пользовательские фильтры
// Иначе блокирует фильтр объявлений и показывает сообщение об ошибке
getData(
  (adverts) => {
    addAdvertToMap(adverts);
    setFilter(debounce(() => addAdvertToMap(adverts), RERENDER_DELAY));
  },
  (message) => {
    disableMapFilter();
    createNotice(message);
  }
);

// Отправляет форму на сервер
// Показывает сообщение об успешной отправке
// Иначе показывает сообщение об ошибке
setAdvertFormSubmit(createSuccessMessage, createErrorMessage);
