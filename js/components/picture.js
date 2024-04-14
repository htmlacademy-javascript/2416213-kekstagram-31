import openBigPicture from './big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');
const templateElement = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const drawSimilarPhoto = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const { url, description, likes, comments, id } = photo;
    const photoElement = templateElement.cloneNode(true);
    const imgElement = photoElement.querySelector('.picture__img');
    const likesElement = photoElement.querySelector('.picture__likes');
    const commentsElement = photoElement.querySelector('.picture__comments');

    imgElement.src = url;
    imgElement.alt = description;
    likesElement.textContent = likes;
    commentsElement.textContent = comments.length;

    photoElement.dataset.photoId = id;

    photoElement.addEventListener('click', () => {
      openBigPicture(photo);
    });

    fragment.appendChild(photoElement);
  });

  picturesContainerElement.appendChild(fragment);
};

export { drawSimilarPhoto };
