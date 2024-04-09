import { drawSimilarPhoto } from './picture';
import { debounce } from '../util';

const NUMBER_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;

const filters = document.querySelector('.img-filters');
const defaultButton = document.querySelector('#filter-default');
const randomButton = document.querySelector('#filter-random');
const discussedButton = document.querySelector('#filter-discussed');

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
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  drawSimilarPhoto(filteredData);
};

const debounceRepaint = debounce(repaint, RERENDER_DELAY);

const toggleActive = (evt, filter, data) => {
  if (currentFilter !== filter) {
    const currentActiveEl = document.querySelector(
      '.img-filters__button--active'
    );
    currentActiveEl.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = filter;
    debounceRepaint(filter, data);
  }
};

const initFilter = (data) => {
  filters.classList.remove('img-filters--inactive');

  defaultButton.addEventListener('click', (evt) => {
    toggleActive(evt, FilterEnum.DEFAULT, data);
  });
  randomButton.addEventListener('click', (evt) => {
    toggleActive(evt, FilterEnum.RANDOM, data);
  });
  discussedButton.addEventListener('click', (evt) => {
    toggleActive(evt, FilterEnum.DISCUSSED, data);
  });
};

export { initFilter };
