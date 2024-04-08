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
  const filterValue = sliderElement.noUiSlider.get(true);
  effectLevelElement.value = filterValue;
  sliderContainerElement.classList.remove('hidden');
  const selectedEffect = document.querySelector(
    'input[name="effect"]:checked'
  ).value;
  if (selectedEffect !== effects.NONE) {
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
