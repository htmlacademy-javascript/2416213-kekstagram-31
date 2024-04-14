import { isEscape } from '../util.js';
import renderComments from './render-comments.js';

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const closeBigPictureButtonElement = bigPictureElement.querySelector(
  '.big-picture__cancel'
);

const renderBigPicture = ({ url, description, likes, comments }) => {
  bigPictureElement.querySelector('img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__comment-total-count').textContent =
    comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;

  renderComments(comments);
};

const onPopupEscKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    onCloseBigPicture();
  }
};

const onOverlayClick = (evt) => {
  if (evt.target.classList.contains('overlay')) {
    evt.preventDefault();
    onCloseBigPicture();
  }
};

function openBigPicture(item) {
  renderBigPicture(item);
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  bigPictureElement.addEventListener('click', onOverlayClick);
  closeBigPictureButtonElement.addEventListener('click', onCloseBigPicture);
}

function onCloseBigPicture() {
  const commentsLoaderButtonElement =
    document.querySelector('.comments-loader');
  commentsLoaderButtonElement.replaceWith(
    commentsLoaderButtonElement.cloneNode(true)
  );
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPictureElement.removeEventListener('click', onOverlayClick);
  closeBigPictureButtonElement.removeEventListener('click', onCloseBigPicture);
}

export default openBigPicture;
