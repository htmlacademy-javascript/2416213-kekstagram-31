import { onThumbnailClick } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const templateFragment = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const drawSimilarPhoto = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments }) => {
    const element = templateFragment.cloneNode(true);
    const imgElement = element.querySelector('.picture__img');
    const likesElement = element.querySelector('.picture__likes');
    const commentsElement = element.querySelector('.picture__comments');

    imgElement.src = url;
    imgElement.alt = description;
    likesElement.textContent = likes;
    commentsElement.textContent = comments.length;

    fragment.appendChild(element);
  });

  picturesContainer.appendChild(fragment);

  const thumbnails = document.querySelectorAll('.picture');

  thumbnails.forEach((thumbnail, i) => {
    onThumbnailClick(thumbnail, photos[i]);
  });
};

export { drawSimilarPhoto };
