import {disableMapForm, enableMapForm} from './filter.js';
import {disableAdvertForm, enableAdvertForm} from './form.js';
import {createSimilarAdvertData} from './data.js';
import {createAdvertPopup} from './popup.js';

const mapCanvas = document.querySelector('#map-canvas');
const advertForm = document.querySelector('.ad-form');
const advertFormAddress = advertForm.querySelector('#address');
const mainMarkerLatitude = advertForm.querySelector('.js-marker__latitude');
const mainMarkerLongitude = advertForm.querySelector('.js-marker__longitude');
const advertFormReset = advertForm.querySelector('.ad-form__reset');

const COORDINATES_TOKYO = {
  lat: 35.6895,
  lng: 139.692
};

const LOCATION_ACCURACY = 5;
const MAP_ZOOM = 12;

const MAIN_PIN = {
  width: 52,
  height: 52
};

const MAIN_ANCHOR = {
  center: MAIN_PIN.width / 2,
  bottom:  MAIN_PIN.height
};

const ADVERT_PIN = {
  width: 40,
  height: 40
};

const ADVERT_ANCHOR = {
  center: ADVERT_PIN.width / 2,
  bottom:  ADVERT_PIN.height
};

const similarAdvertData = createSimilarAdvertData();

// Блокирует фильтр объявлений на карте
disableMapForm();
// Блокирует форму создания нового объявления
disableAdvertForm();

// Записывает переданные координаты в поле адрес и в скрытые поля формы
const setAddress = ({lat, lng}) => {
  const latitude = Number(lat.toFixed(LOCATION_ACCURACY));
  const longitude = Number(lng.toFixed(LOCATION_ACCURACY));
  mainMarkerLatitude.value = latitude;
  mainMarkerLongitude.value = longitude;
  advertFormAddress.value = `Широта, долгота: ${latitude}, ${longitude}`;
};

// Настройки карты Leaflet
const map = L.map(mapCanvas)
  .on('load', () => {
    enableMapForm();
    enableAdvertForm();
  })
  .setView({
    lat: COORDINATES_TOKYO.lat,
    lng: COORDINATES_TOKYO.lng
  }, MAP_ZOOM);

// Подключение openstreetmap карт
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(map);

// Настройка кастомной иконки главного маркера
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_PIN.width, MAIN_PIN.height],
  iconAnchor: [MAIN_ANCHOR.center, MAIN_ANCHOR.bottom]
});

// Настройка главного маркера
const mainPinMarker = L.marker(
  {
    lat: COORDINATES_TOKYO.lat,
    lng: COORDINATES_TOKYO.lng
  },
  {
    draggable: true,
    icon: mainPinIcon
  }
).addTo(map);

// Задает координаты в поле адрес, при передвижении главного маркера
mainPinMarker.on('moveend', (evt) => {
  setAddress(evt.target.getLatLng());
});

// Настройка кастомной иконки маркера объявлений
const advertPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [ADVERT_PIN.width, ADVERT_PIN.height],
  iconAnchor: [ADVERT_ANCHOR.center, ADVERT_ANCHOR.bottom]
});

// Создаем слой с маркерами объявлений
const markerGroup = L.layerGroup().addTo(map);

// Настройка маркера объявления и попапа
const createAdvertPinMarker = (data) => {
  L.marker(
    {
      lat: data.location.lat,
      lng: data.location.lng
    },
    {
      draggable: false,
      icon: advertPinIcon
    }
  )
    .addTo(markerGroup)
    .bindPopup(createAdvertPopup(data));
};

// Добавляет объявления на карту
similarAdvertData.forEach((advertData) => {
  createAdvertPinMarker(advertData);
});

// Возвращает карту в исходное состояние
const resetMap = () => {
  map
    .setView(COORDINATES_TOKYO, MAP_ZOOM)
    .closePopup();
  mainPinMarker
    .setLatLng(COORDINATES_TOKYO);
};

advertFormReset.addEventListener('click', () => {
  resetMap();
});
