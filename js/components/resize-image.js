const MAX_SIZE = 100;
const MIN_SIZE = 25;
const DEFAULT_SIZE = 100;
const STEP = 25;

const formElement = document.querySelector('.img-upload__form');
const imageElement = formElement.querySelector('.img-upload__preview img');
const inputScaleElement = formElement.querySelector('.scale__control--value');
const scaleButtonSmallerElement = formElement.querySelector(
  '.scale__control--smaller'
);
const scaleButtonBiggerElement = formElement.querySelector(
  '.scale__control--bigger'
);

const resizeImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  inputScaleElement.value = `${value}%`;
};

const onScaleButtonSmallerClick = () => {
  resizeImage(Math.max(parseInt(inputScaleElement.value, 10) - STEP, MIN_SIZE));
};

const onScaleButtonBiggerClick = () => {
  resizeImage(Math.min(parseInt(inputScaleElement.value, 10) + STEP, MAX_SIZE));
};

const resetResize = () => resizeImage(DEFAULT_SIZE);

scaleButtonSmallerElement.addEventListener('click', onScaleButtonSmallerClick);
scaleButtonBiggerElement.addEventListener('click', onScaleButtonBiggerClick);

export { resetResize };
