import {createSimilarAnnouncements} from './data.js';
import {createAnnouncementPopup} from './popup.js';

const mapCanvas = document.querySelector('#map-canvas');
const announcementsData = createSimilarAnnouncements();

mapCanvas.append(createAnnouncementPopup(announcementsData[0]));
