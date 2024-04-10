import { isEscape } from '../util.js';

const successMessageElement = document
  .querySelector('#success')
  .content.querySelector('.success');
const errorMessageElement = document
  .querySelector('#error')
  .content.querySelector('.error');

const hideMessage = () => {
  const existsElement =
    document.querySelector('.success') || document.querySelector('.error');
  existsElement.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

const onCLoseButtonClick = () => {
  hideMessage();
};

function onMessageEscKeydown(evt) {
  if (isEscape(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onBodyClick(evt) {
  if (
    evt.target.closest('.error__inner') ||
    evt.target.closest('.success__inner')
  ) {
    return;
  }
  hideMessage();
}

const showMessage = (element, buttonClass) => {
  document.body.append(element);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onMessageEscKeydown);
  element
    .querySelector(buttonClass)
    .addEventListener('click', onCLoseButtonClick);
};

const showSuccesMessage = () => {
  showMessage(successMessageElement, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageElement, '.error__button');
};

export { showSuccesMessage, showErrorMessage };
