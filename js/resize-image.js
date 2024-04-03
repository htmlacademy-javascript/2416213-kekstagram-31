const MAX_SIZE = 100;
const MIN_SIZE = 25;
const DEFAULT_SIZE = 100;
const STEP = 25;

const form = document.querySelector('.img-upload__form');
const image = form.querySelector('.img-upload__preview img');
const inputScale = form.querySelector('.scale__control--value');
const scaleButtonSmaller = form.querySelector('.scale__control--smaller');
const scaleButtonBigger = form.querySelector('.scale__control--bigger');

const resizeImage = (value) => {
  image.style.transform = `scale(${value / 100})`;
  inputScale.value = `${value}%`;
};

const onScaleButtonSmallerClick = () => {
  resizeImage(Math.max(parseInt(inputScale.value, 10) - STEP, MIN_SIZE));
};

const onScaleButtonBiggerClick = () => {
  resizeImage(Math.min(parseInt(inputScale.value, 10) + STEP, MAX_SIZE));
};

const resetResize = () => resizeImage(DEFAULT_SIZE);

scaleButtonSmaller.addEventListener('click', onScaleButtonSmallerClick);
scaleButtonBigger.addEventListener('click', onScaleButtonBiggerClick);

export { resetResize };
