import { isEscape } from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
const image = bigPicture.querySelector('.big-picture__img img');
const likes = bigPicture.querySelector('.likes-count');
const caption = bigPicture.querySelector('.social__caption');
const commentList = bigPicture.querySelector('.social__comments');
const commentItem = bigPicture.querySelector('.social__comment');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsShownCount = bigPicture.querySelector(
  '.social__comment-shown-count'
);
const commentsTotalCount = bigPicture.querySelector(
  '.social__comment-total-count'
);

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

  commentsShownCount.textContent = photoData.comments.length;
  commentsTotalCount.textContent = photoData.comments.length;
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  commentList.textContent = '';

  photoData.comments.forEach(({ avatar, name, message }) => {
    const commentElement = commentItem.cloneNode(true);

    const commentImage = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');

    commentImage.src = avatar;
    commentImage.alt = name;
    commentText.textContent = message;

    commentList.append(commentElement);
  });

  openBigPicture();
};

closeBigPictureButton.addEventListener('click', closeBigPicture);

export { onThumbnailClick };
