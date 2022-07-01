const pageBody = document.querySelector('body');
const mapCanvas = document.querySelector('#map-canvas');

const isEscapeKey = (evt) => evt.key === 'Escape';

const createNotice = (serverMessage) => {
  const noticeTemplate = document.querySelector('#notice-message').content.querySelector('.notice-message');
  const notice = noticeTemplate.cloneNode(true);
  const noticeServerMessage = notice.querySelector('.notice-message__server');
  const noticeButton = notice.querySelector('.notice-message__button');

  if (serverMessage) {
    noticeServerMessage.textContent = serverMessage;
  }

  noticeButton.addEventListener('click', () => {
    notice.remove();
  });

  document.addEventListener('click', (evt) => {
    if (evt.target !== notice) {
      notice.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      notice.remove();
    }
  });

  mapCanvas.append(notice);
};

const createSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);

  document.addEventListener('click', (evt) => {
    if (evt.target === successMessage) {
      successMessage.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      successMessage.remove();
    }
  });

  pageBody.append(successMessage);
};

const createErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorMessageButton = errorMessage.querySelector('.error__button');

  errorMessageButton.addEventListener('click', () => {
    errorMessage.remove();
  });

  document.addEventListener('click', (evt) => {
    if (evt.target === errorMessage) {
      errorMessage.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      errorMessage.remove();
    }
  });

  pageBody.append(errorMessage);
};

export {createNotice, createSuccessMessage, createErrorMessage};
