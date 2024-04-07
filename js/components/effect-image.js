const Effects = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [Effects.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effects.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effects.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [Effects.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [Effects.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [Effects.NONE]: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  [Effects.CHROME]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  [Effects.SEPIA]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  [Effects.MARVIN]: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  [Effects.PHOBOS]: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  [Effects.HEAT]: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

const form = document.querySelector('.img-upload__form');
const imageElement = form.querySelector('.img-upload__preview img');
const effectsElement = form.querySelector('.effects');
const sliderContainerElement = form.querySelector('.img-upload__effect-level');
const sliderElement = form.querySelector('.effect-level__slider');
const effectLevelElement = form.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
  start: 100,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  const filterValue = sliderElement.noUiSlider.get();
  effectLevelElement.value = filterValue;
  sliderContainerElement.classList.remove('hidden');
  const selectedEffect = document.querySelector(
    'input[name="effect"]:checked'
  ).value;
  if (selectedEffect !== Effects.NONE) {
    const { value } = effectLevelElement;
    const { style, unit } = effectToFilter[selectedEffect];

    imageElement.style.filter = `${style}(${value}${unit})`;
  } else {
    imageElement.style.filter = 'none';
    sliderContainerElement.classList.add('hidden');
  }
});

const onEffectChange = (evt) => {
  const effectValue = evt.target.value;
  sliderElement.noUiSlider.updateOptions(effectToSliderOptions[effectValue]);
};

effectsElement.addEventListener('change', onEffectChange);

const resetEffects = () => {
  document.querySelector('#effect-none').check = true;
  imageElement.style.filter = 'none';
  sliderContainerElement.classList.add('hidden');
};

export { resetEffects };
