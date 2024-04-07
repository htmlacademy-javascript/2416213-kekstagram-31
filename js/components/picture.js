import openBigPicture from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const templateFragment = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const drawSimilarPhoto = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const element = templateFragment.cloneNode(true);
    const imgElement = element.querySelector('.picture__img');
    const likesElement = element.querySelector('.picture__likes');
    const commentsElement = element.querySelector('.picture__comments');

    imgElement.src = photo.url;
    imgElement.alt = photo.description;
    likesElement.textContent = photo.likes;
    commentsElement.textContent = photo.comments.length;

    element.dataset.photoId = photo.id;

    element.addEventListener('click', () => {
      openBigPicture(photo);
    });

    fragment.appendChild(element);
  });

  picturesContainer.appendChild(fragment);
};

export { drawSimilarPhoto };
