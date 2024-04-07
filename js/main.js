import { drawSimilarPhoto } from './components/picture.js';
import { setUserFormSubmit } from './components/render-form.js';
import { getData } from './api.js';
import { showDataErrorMessage } from './util.js';
import { showSuccesMessage, showErrorMessage } from './components/message.js';

getData(
  (photos) => drawSimilarPhoto(photos),
  () => showDataErrorMessage()
);

setUserFormSubmit(showSuccesMessage, showErrorMessage);
