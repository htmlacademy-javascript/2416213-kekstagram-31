const REMOVE_MESSAGE_TIMEOUT = 5000;

const dataErrorMessageElement = document
  .querySelector('#data-error')
  .content.querySelector('.data-error');

const isEscape = (evt) => evt.key === 'Escape';

// Ошибка загрузки файлов с сервера

const showDataErrorMessage = () => {
  const dataErrorMessage = dataErrorMessageElement.cloneNode(true);
  document.body.appendChild(dataErrorMessage);

  setTimeout(() => {
    dataErrorMessage.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscape, showDataErrorMessage, debounce };
