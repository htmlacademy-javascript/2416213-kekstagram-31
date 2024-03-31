import { similarPhoto } from './data.js';
import { drawSimilarPhoto } from './picture.js';
import './big-picture.js';
import './form.js';

const photos = similarPhoto();

drawSimilarPhoto(photos);
