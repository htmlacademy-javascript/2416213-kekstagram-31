import { isEscape } from './util.js';
import renderComments from './render-comments.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');

const renderBigPicture = ({ url, description, likes, comments }) => {
  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-total-count').textContent =
    comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  renderComments(comments);
};

const onPopupEscKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onOverlayClick = (evt) => {
  if (evt.target.classList.contains('overlay')) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture(item) {
  renderBigPicture(item);
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  bigPicture.addEventListener('click', onOverlayClick);
  closeBigPictureButton.addEventListener('click', closeBigPicture);
}

function closeBigPicture() {
  const commentsLoaderButton = document.querySelector('.comments-loader');
  commentsLoaderButton.replaceWith(commentsLoaderButton.cloneNode(true));
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPicture.removeEventListener('click', onOverlayClick);
  closeBigPictureButton.removeEventListener('click', closeBigPicture);
}

export default openBigPicture;
