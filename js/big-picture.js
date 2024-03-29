import { isEscape } from './util.js';
import renderComments from './render-comments.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
const image = bigPicture.querySelector('.big-picture__img img');
const likes = bigPicture.querySelector('.likes-count');
const caption = bigPicture.querySelector('.social__caption');

const onPopupEscKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

const onThumbnailClick = (photoData) => {
  image.src = photoData.url;
  likes.textContent = photoData.likes;
  caption.textContent = photoData.description;

  renderComments(photoData.comments);
  openBigPicture();
};

closeBigPictureButton.addEventListener('click', closeBigPicture);

export { onThumbnailClick };
