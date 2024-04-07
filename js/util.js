const REMOVE_MESSAGE_TIMEOUT = 5000;

const dataErrorMessageTemplate = document
  .querySelector('#data-error')
  .content.querySelector('.data-error');

const isEscape = (evt) => evt.key === 'Escape';

// Ошибка загрузки файлов с сервера

const showDataErrorMessage = () => {
  const dataErrorMessage = dataErrorMessageTemplate.cloneNode(true);
  document.body.appendChild(dataErrorMessage);

  setTimeout(() => {
    dataErrorMessage.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

export { isEscape, showDataErrorMessage };
