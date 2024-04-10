import { drawSimilarPhoto } from './components/picture.js';
import { setUserFormSubmit } from './components/render-form.js';
import { getData } from './api.js';
import { showSuccesMessage, showErrorMessage } from './components/message.js';
import { showDataErrorMessage } from './util.js';
import { initFilter } from './components/filters.js';

getData(
  (photos) => {
    drawSimilarPhoto(photos);
    initFilter(photos);
  },
  () => showDataErrorMessage()
);

setUserFormSubmit(showSuccesMessage, showErrorMessage);
