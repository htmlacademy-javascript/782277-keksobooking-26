import {enableMapForm} from './filter.js';
import {enableAdvertForm} from './form.js';
import {createPopup} from './popup.js';

const mapCanvas = document.querySelector('#map-canvas');
const advertForm = document.querySelector('.ad-form');
const advertFormAddress = advertForm.querySelector('#address');
const mainMarkerLatitude = advertForm.querySelector('.js-marker__latitude');
const mainMarkerLongitude = advertForm.querySelector('.js-marker__longitude');
const advertFormReset = advertForm.querySelector('.ad-form__reset');

const COORDINATES_TOKYO = {
  lat: 35.6895,
  lng: 139.692,
};

const LOCATION_ACCURACY = 5;
const MAP_ZOOM = 12;

const MAIN_PIN = {
  source: './img/main-pin.svg',
  width: 52,
  height: 52,
  centerAnchor: 26,
  bottomAnchor: 52,
};

const ADVERT_PIN = {
  source: './img/pin.svg',
  width: 40,
  height: 40,
  centerAnchor: 20,
  bottomAnchor: 40,
};

// Создает карту Leaflet на основе данных openstreetmap
const createMap = () => {
  const map = L.map(mapCanvas)
    .on('load', () => {
      enableMapForm();
      enableAdvertForm();
    })
    .setView({
      lat: COORDINATES_TOKYO.lat,
      lng: COORDINATES_TOKYO.lng,
    }, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map);

  return map;
};

// Создает иконку маркера
const createMarkerIcon = ({source, width, height, centerAnchor, bottomAnchor}) => L.icon(
  {
    iconUrl: source,
    iconSize: [width, height],
    iconAnchor: [centerAnchor, bottomAnchor],
  }
);

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

// Записывает координаты в поле "адрес"
const setAddress = ({lat, lng}) => {
  const latitude = Number(lat.toFixed(LOCATION_ACCURACY));
  const longitude = Number(lng.toFixed(LOCATION_ACCURACY));
  mainMarkerLatitude.value = latitude;
  mainMarkerLongitude.value = longitude;
  advertFormAddress.value = `${latitude}, ${longitude}`;
};

// Инициализирует карту
const initializeMap = (popupData) => {
  const map = createMap();

  // Главный маркер
  const mainMarkerIcon = createMarkerIcon(MAIN_PIN);

  const mainMarker = createMarker(
    COORDINATES_TOKYO.lat,
    COORDINATES_TOKYO.lng,
    true,
    mainMarkerIcon
  ).addTo(map);

  mainMarker.on('move', (evt) => {
    setAddress(evt.target.getLatLng());
  });

  // Маркеры с объявлениями
  const markerGroup = L.layerGroup().addTo(map);

  const advertMarkerIcon = createMarkerIcon(ADVERT_PIN);

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

  // Создает маркер для каждого объявления
  popupData.forEach((popup) => {
    createAdvertMarker(popup);
  });

  // Возвращает карту в исходное состояние
  const resetMap = () => {
    map
      .setView(COORDINATES_TOKYO, MAP_ZOOM)
      .closePopup();
    mainMarker
      .setLatLng(COORDINATES_TOKYO);
  };

  advertFormReset.addEventListener('click', () => {
    resetMap();
  });
};

export {initializeMap};
