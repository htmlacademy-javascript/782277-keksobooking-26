import {getData} from './data.js';
import {setAdvertFormSubmit} from './validation.js';
import {createMarkerForAdvert} from './map.js';
import {disableMapFilter} from './filter.js';
import {createNotice, createSuccessMessage, createErrorMessage} from './notice.js';

const MAX_ADVERTS = 10;

// Получаем данные от сервера
// Отрисовываем объявления на карте
// Иначе показываем сообщение об ошибке
getData(
  (adverts) => createMarkerForAdvert(adverts.slice(0, MAX_ADVERTS)),
  (message) => {
    disableMapFilter();
    createNotice(message);
  }
);

// Отправляем форму
// Показываем сообщение об успешной отправке
// Иначе показываем сообщение об ошибке
setAdvertFormSubmit(createSuccessMessage, createErrorMessage);
