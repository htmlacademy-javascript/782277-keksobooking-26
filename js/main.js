import {getData} from './data.js';
import {setAdvertFormSubmit} from './validation.js';
import {initializeMap, addAdvertToMap} from './map.js';
import {disableMapFilter} from './filter.js';
import {disableAdvertForm} from './form.js';
import {createNotice, createSuccessMessage, createErrorMessage} from './notice.js';

const MAX_ADVERTS = 10;

// Блокирует фильтрацию объявлений
// Блокирует форму создания нового объявления
disableMapFilter();
disableAdvertForm();

// Инициализирует карту
initializeMap();

// Получает данные от сервера
// Отрисовывает объявления на карте
// Иначе блокирует фильтр объявлений и показывает сообщение об ошибке
getData(
  (adverts) => addAdvertToMap(adverts.slice(0, MAX_ADVERTS)),
  (message) => {
    disableMapFilter();
    createNotice(message);
  }
);

// Отправляет форму на сервер
// Показывает сообщение об успешной отправке
// Иначе показывает сообщение об ошибке
setAdvertFormSubmit(createSuccessMessage, createErrorMessage);
