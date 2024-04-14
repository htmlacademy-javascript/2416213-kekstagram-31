const effects = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [effects.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [effects.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [effects.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [effects.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [effects.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [effects.NONE]: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  [effects.CHROME]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  [effects.SEPIA]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  [effects.MARVIN]: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  [effects.PHOBOS]: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  [effects.HEAT]: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

const formElement = document.querySelector('.img-upload__form');
const imageElement = formElement.querySelector('.img-upload__preview img');
const effectsElement = formElement.querySelector('.effects');
const sliderContainerElement = formElement.querySelector(
  '.img-upload__effect-level'
);
const sliderElement = formElement.querySelector('.effect-level__slider');
const effectLevelElement = formElement.querySelector('.effect-level__value');

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
  const filterValue = sliderElement.noUiSlider.get(true);
  effectLevelElement.value = filterValue;
  sliderContainerElement.classList.remove('hidden');
  const selectedEffectElement = document.querySelector(
    'input[name="effect"]:checked'
  ).value;
  if (selectedEffectElement !== effects.NONE) {
    const { value } = effectLevelElement;
    const { style, unit } = effectToFilter[selectedEffectElement];

    imageElement.style.setProperty('filter', `${style}(${value}${unit})`);
  } else {
    imageElement.style.setProperty('filter', 'none');
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
  imageElement.style.setProperty('filter', 'none');
  sliderContainerElement.classList.add('hidden');
};

export { resetEffects };
