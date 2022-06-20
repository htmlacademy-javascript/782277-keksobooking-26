import {createSimilarAdvertData} from './data.js';
import {createAdvertPopup} from './popup.js';
import {enablePage} from './form.js';

const mapCanvas = document.querySelector('#map-canvas');
const advertData = createSimilarAdvertData();

enablePage();
mapCanvas.append(createAdvertPopup(advertData[0]));
