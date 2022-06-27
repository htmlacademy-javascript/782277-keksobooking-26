import {createSimilarAdvertData} from './data.js';
import {disableMapForm} from './filter.js';
import {disableAdvertForm} from './form.js';
import {initialMap} from './map.js';
import './slider.js';
import './validation.js';

const popupData = createSimilarAdvertData();

// Блокирует форму с фильтрами объявлений
disableMapForm();

// Блокирует форму создания нового объявления
disableAdvertForm();

// Инициализирует карту
initialMap(popupData);
