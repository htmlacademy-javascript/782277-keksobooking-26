import {getAdvertData} from './data.js';
import {createPopup} from './popup.js';
import {checkAdvert, compareAdvertFeature, disableMapFilter, enableMapFilter} from './filter.js';
import {enableAdvertForm} from './form.js';

const MAP_OPTION = {
  accuracy: 5,
  zoom: 12.5,
};

const MAIN_MARKER = {
  source: './img/main-pin.svg',
  width: 52,
  height: 52,
  centerAnchor: 26,
  bottomAnchor: 52,
};

const ADVERT_MARKER = {
  source: './img/pin.svg',
  width: 40,
  height: 40,
  centerAnchor: 20,
  bottomAnchor: 40,
};

const COORDINATES_TOKYO = {
  lat: 35.68247,
  lng: 139.75219,
};

const MAX_ADVERTS = 10;

const mapCanvas = document.querySelector('#map-canvas');
const advertForm = document.querySelector('.ad-form');
const advertFormAddress = advertForm.querySelector('#address');
const mainMarkerLatitude = advertForm.querySelector('.js-marker__latitude');
const mainMarkerLongitude = advertForm.querySelector('.js-marker__longitude');

const map = L.map(mapCanvas);

// Инициализирует карту Leaflet на основе данных openstreetmap
const initializeMap = () => {
  map
    .on('load', () => {
      enableMapFilter();
      enableAdvertForm();
    })
    .setView({
      lat: COORDINATES_TOKYO.lat,
      lng: COORDINATES_TOKYO.lng,
    }, MAP_OPTION.zoom);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map);
};

// Создает иконку маркера
const createMarkerIcon = ({source, width, height, centerAnchor, bottomAnchor}) => L.icon(
  {
    iconUrl: source,
    iconSize: [width, height],
    iconAnchor: [centerAnchor, bottomAnchor],
  }
);

const mainMarkerIcon = createMarkerIcon(MAIN_MARKER);
const advertMarkerIcon = createMarkerIcon(ADVERT_MARKER);

// Создает маркер
const createMarker = (latitude, longitude, isDraggable, icon) => L.marker(
  {
    lat: latitude,
    lng: longitude,
  },
  {
    draggable: isDraggable,
    icon: icon,
  }
);

// Главный маркер
const mainMarker = createMarker(
  COORDINATES_TOKYO.lat,
  COORDINATES_TOKYO.lng,
  true,
  mainMarkerIcon
).addTo(map);

// Записывает координаты в поле "адрес"
const setAddressCoordinates = ({lat, lng}) => {
  const latitude = Number(lat.toFixed(MAP_OPTION.accuracy));
  const longitude = Number(lng.toFixed(MAP_OPTION.accuracy));
  mainMarkerLatitude.value = latitude;
  mainMarkerLongitude.value = longitude;
  advertFormAddress.value = `${latitude}, ${longitude}`;
};

setAddressCoordinates(COORDINATES_TOKYO);

mainMarker.on('move', (evt) => {
  setAddressCoordinates(evt.target.getLatLng());
});

// Маркер объявлений
const markerGroup = L.layerGroup().addTo(map);

const createAdvertMarker = (data) => {
  const advertMarker = createMarker(
    data.location.lat,
    data.location.lng,
    false,
    advertMarkerIcon
  );

  advertMarker
    .addTo(markerGroup)
    .bindPopup(createPopup(data));
};

// Добавляет объявления на карту
const addAdvertToMap = (popupData) => {

  map.closePopup();
  markerGroup.clearLayers();

  if (popupData) {
    popupData
      .slice()
      .filter((advert) => checkAdvert(advert))
      .sort(compareAdvertFeature)
      .slice(0, MAX_ADVERTS)
      .forEach((advert) => {
        createAdvertMarker(advert);
      });
  } else {
    disableMapFilter();
  }
};

// Возвращает карту в исходное состояние
const resetMap = () => {
  map
    .setView(COORDINATES_TOKYO, MAP_OPTION.zoom)
    .closePopup();
  mainMarker
    .setLatLng(COORDINATES_TOKYO);

  addAdvertToMap(getAdvertData());
  setAddressCoordinates(COORDINATES_TOKYO);
};

export {initializeMap, addAdvertToMap, resetMap};
