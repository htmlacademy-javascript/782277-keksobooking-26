const SERVER_URL_GET = 'https://26.javascript.pages.academy/keksobooking/data';
const SERVER_URL_POST = 'https://26.javascript.pages.academy/keksobooking';

let receivedData = [];
const getAdvertData = () => receivedData.slice();

// Получает данные от сервера
const getData = (onSuccess, onError) => {
  fetch(
    SERVER_URL_GET,
    {
      method: 'GET',
      credentials: 'same-origin',
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      receivedData = data;
      onSuccess(data);
    })
    .catch((err) => {
      onError(err.message);
    });
};

// Отправляет данные серверу
const sendData = (onSuccess, onError, body) => {
  fetch(
    SERVER_URL_POST,
    {
      method: 'POST',
      credentials: 'same-origin',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export{getData, sendData, getAdvertData};
