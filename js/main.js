import {createSimilarAdvertData} from './data.js';
import {createAdvertPopup} from './advert-popup.js';
import {disableAdvertForm, enableAdvertForm} from './advert-form.js';
import {disableMapFilter, enableMapFilter} from './map-filter.js';
import './advert-form-validation.js';

disableMapFilter();
disableAdvertForm();

enableMapFilter();
enableAdvertForm();

const mapCanvas = document.querySelector('#map-canvas');
const advertData = createSimilarAdvertData();

mapCanvas.append(createAdvertPopup(advertData[0]));
