const pageBody = document.querySelector('body');
const mapCanvas = document.querySelector('#map-canvas');

const isEscapeKey = (evt) => evt.key === 'Escape';

// Создает сообщение об ошибке получения данных с сервера
const createNotice = (message) => {
  const noticeTemplate = document.querySelector('#notice-message').content.querySelector('.notice-message');
  const notice = noticeTemplate.cloneNode(true);
  const noticeError = notice.querySelector('.notice-message__error');
  const noticeButton = notice.querySelector('.notice-message__button');

  if (message) {
    noticeError.textContent = message;
  }

  const onNoticeButtonClick = () => {
    notice.remove();

    removeNoticeListeners();
  };

  const onNoticeClick = (evt) => {
    if (evt.target !== notice) {
      notice.remove();
    }

    removeNoticeListeners();
  };

  const onNoticeEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      notice.remove();
    }

    removeNoticeListeners();
  };

  function removeNoticeListeners () {
    noticeButton.removeEventListener('click', onNoticeButtonClick);
    document.removeEventListener('click', onNoticeClick);
    document.removeEventListener('keydown', onNoticeEscKeydown);
  }

  noticeButton.addEventListener('click', onNoticeButtonClick);
  document.addEventListener('click', onNoticeClick);
  document.addEventListener('keydown', onNoticeEscKeydown);

  mapCanvas.append(notice);
};

// Создает сообщение об успешной отправке формы на сервер
const createSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);

  const onSuccessMessageClick = (evt) => {
    if (evt.target === successMessage) {
      successMessage.remove();
    }

    removeSuccessMessageListeners();
  };

  const onSuccessMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMessage.remove();
    }

    removeSuccessMessageListeners();
  };

  function removeSuccessMessageListeners () {
    document.removeEventListener('click', onSuccessMessageClick);
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  }

  document.addEventListener('click', onSuccessMessageClick);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);

  pageBody.append(successMessage);
};

// Создает сообщение об ошибке отправке формы на сервер
const createErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorMessageButton = errorMessage.querySelector('.error__button');

  const onErrorMessageButtonClick = () => {
    errorMessage.remove();

    removeErrorMessageListeners();
  };

  const onErrorMessageClick = (evt) => {
    if (evt.target === errorMessage) {
      errorMessage.remove();
    }

    removeErrorMessageListeners();
  };

  const onErrorMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessage.remove();
    }

    removeErrorMessageListeners();
  };

  function removeErrorMessageListeners () {
    errorMessageButton.removeEventListener('click', onErrorMessageButtonClick);
    document.removeEventListener('click', onErrorMessageClick);
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
  }

  errorMessageButton.addEventListener('click', onErrorMessageButtonClick);
  document.addEventListener('click', onErrorMessageClick);
  document.addEventListener('keydown', onErrorMessageEscKeydown);

  pageBody.append(errorMessage);
};

export {createNotice, createSuccessMessage, createErrorMessage};
