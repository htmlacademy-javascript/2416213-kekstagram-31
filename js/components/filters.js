import { drawSimilarPhoto } from './picture.js';
import { debounce } from '../util.js';

const NUMBER_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;

const filtersElement = document.querySelector('.img-filters');
const defaultButtonElement = document.querySelector('#filter-default');
const randomButtonElement = document.querySelector('#filter-random');
const discussedButtonElement = document.querySelector('#filter-discussed');

const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const comparePhotos = (photoA, photoB) =>
  photoB.comments.length - photoA.comments.length;

const filterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,
  [FilterEnum.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(NUMBER_RANDOM_PHOTOS, data.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },
  [FilterEnum.DISCUSSED]: (data) => data.slice().sort(comparePhotos),
};

let currentFilter = FilterEnum.DEFAULT;

const repaint = (filter, data) => {
  const filteredData = filterHandlers[filter](data);
  const pictureElements = document.querySelectorAll('.picture');
  pictureElements.forEach((item) => item.remove());
  drawSimilarPhoto(filteredData);
};

const debounceRepaint = debounce(repaint, RERENDER_DELAY);

const toggleActive = (evt, filter, data) => {
  if (currentFilter !== filter) {
    const currentActiveElement = document.querySelector(
      '.img-filters__button--active'
    );
    currentActiveElement.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = filter;
    debounceRepaint(filter, data);
  }
};

const initFilter = (data) => {
  filtersElement.classList.remove('img-filters--inactive');

  defaultButtonElement.addEventListener('click', (evt) => {
    toggleActive(evt, FilterEnum.DEFAULT, data);
  });
  randomButtonElement.addEventListener('click', (evt) => {
    toggleActive(evt, FilterEnum.RANDOM, data);
  });
  discussedButtonElement.addEventListener('click', (evt) => {
    toggleActive(evt, FilterEnum.DISCUSSED, data);
  });
};

export { initFilter };
