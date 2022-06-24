import {createSimilarAdvertData} from './data.js';
import {createAdvertPopup} from './popup.js';
import {disableAdvertForm, enableAdvertForm} from './form.js';
import {disableMapFilter, enableMapFilter} from './filter.js';
import './validation.js';

disableMapFilter();
disableAdvertForm();

enableMapFilter();
enableAdvertForm();

const mapCanvas = document.querySelector('#map-canvas');
const advertData = createSimilarAdvertData();

mapCanvas.append(createAdvertPopup(advertData[0]));
