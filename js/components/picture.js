import openBigPicture from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const templateFragment = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const drawSimilarPhoto = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const { url, description, likes, comments, id } = photo;
    const element = templateFragment.cloneNode(true);
    const imgElement = element.querySelector('.picture__img');
    const likesElement = element.querySelector('.picture__likes');
    const commentsElement = element.querySelector('.picture__comments');

    imgElement.src = url;
    imgElement.alt = description;
    likesElement.textContent = likes;
    commentsElement.textContent = comments.length;

    element.dataset.photoId = id;

    element.addEventListener('click', () => {
      openBigPicture(photo);
    });

    fragment.appendChild(element);
  });

  picturesContainer.appendChild(fragment);
};

export { drawSimilarPhoto };
