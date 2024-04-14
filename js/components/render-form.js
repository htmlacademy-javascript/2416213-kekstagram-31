import { isEscape } from '../util.js';
import { resetResize } from './resize-image.js';
import { resetEffects } from './effect-image.js';
import { sendData } from '../api.js';

const MAX_HASHTAGS_AMOUNT = 5;
const MAX_DESCRIPTION_AMOUNT = 140;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const ErrorText = {
  INVALID_FORMAT:
    'хэш-тег начинается с символа # (решётка), строка после решетки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д',
  NOT_UNIQUE: 'один и тот же хэш-тег не может быть использован дважды',
  INVALID_AMOUNT: `нельзя указать больше ${MAX_HASHTAGS_AMOUNT} хэш-тегов`,
};

const SubmitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Отправить',
};

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const fileInputElement = formElement.querySelector('.img-upload__input');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const redactorCancelButtonElement = formElement.querySelector(
  '.img-upload__cancel'
);
const inputHashtagElement = formElement.querySelector('.text__hashtags');
const inputDescriptionElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const photoPreviewElement = formElement.querySelector(
  '.img-upload__preview img'
);
const effectsPreviewsElement =
  formElement.querySelectorAll('.effects__preview');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const isErrorMessageExist = () => Boolean(document.querySelector('.error'));

const onRedactorEscKeydown = (evt) => {
  if (isEscape(evt) && !isErrorMessageExist()) {
    evt.preventDefault();
    closeRedactorPhoto();
  }
};

const isTextFieldFocused = (evt) => evt.stopPropagation();

const openRedactorPhoto = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  inputHashtagElement.addEventListener('keydown', isTextFieldFocused);
  inputDescriptionElement.addEventListener('keydown', isTextFieldFocused);
  document.addEventListener('keydown', onRedactorEscKeydown);
};

function closeRedactorPhoto() {
  formElement.reset();
  pristine.reset();
  fileInputElement.value = '';
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  inputHashtagElement.removeEventListener('keydown', isTextFieldFocused);
  inputDescriptionElement.removeEventListener('keydown', isTextFieldFocused);
  document.removeEventListener('keydown', onRedactorEscKeydown);
  resetResize();
  resetEffects();
}
const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const onFileInputChange = () => {
  const file = fileInputElement.files[0];

  if (file && isValidType(file)) {
    photoPreviewElement.src = URL.createObjectURL(file);
    effectsPreviewsElement.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreviewElement.src}')`;
    });
  }
  openRedactorPhoto();
};

const onCancelButtonClick = () => {
  closeRedactorPhoto();
};

const normalizeHashtags = (tagString) =>
  tagString
    .trim()
    .split(' ')
    .filter((tag) => Boolean(tag.length));

const validateHashtagsFormat = (value) =>
  normalizeHashtags(value).every((tag) => VALID_SYMBOLS.test(tag));

const validateHashtagsUniqueness = (value) => {
  const lowerCaseTags = normalizeHashtags(value).map((tag) =>
    tag.toLowerCase()
  );
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateHashtagsAmount = (value) =>
  normalizeHashtags(value).length <= MAX_HASHTAGS_AMOUNT;

pristine.addValidator(
  inputHashtagElement,
  validateHashtagsAmount,
  ErrorText.INVALID_AMOUNT,
  3,
  true
);

pristine.addValidator(
  inputHashtagElement,
  validateHashtagsUniqueness,
  ErrorText.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator(
  inputHashtagElement,
  validateHashtagsFormat,
  ErrorText.INVALID_FORMAT,
  1,
  true
);

const validateDescription = (value) => value.length <= MAX_DESCRIPTION_AMOUNT;

pristine.addValidator(
  inputDescriptionElement,
  validateDescription,
  `Не более ${MAX_DESCRIPTION_AMOUNT} символов`
);

const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled
    ? SubmitButtonCaption.SUBMITTING
    : SubmitButtonCaption.IDLE;
};

const setUserFormSubmit = (onSuccess, onFail) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      toggleSubmitButton(true);
      sendData(
        () => {
          onSuccess();
          toggleSubmitButton(false);
          closeRedactorPhoto();
        },
        () => {
          onFail();
          toggleSubmitButton(false);
        },
        new FormData(evt.target)
      );
    }
  });
};

fileInputElement.addEventListener('change', onFileInputChange);

redactorCancelButtonElement.addEventListener('click', onCancelButtonClick);

export { setUserFormSubmit };
