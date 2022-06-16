import {createAnnouncementPopup} from './announcement.js';

const mapCanvas = document.querySelector('#map-canvas');
const POPUP_COUNT = 1;

mapCanvas.append(createAnnouncementPopup(POPUP_COUNT));
