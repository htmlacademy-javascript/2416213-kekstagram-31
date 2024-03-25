const picturesContainer = document.querySelector('.pictures');
const templateFragment = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const drawSimilarPhoto = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments }) => {
    const element = templateFragment.cloneNode(true);
    element.querySelector('.picture__img').src = url;
    element.querySelector('.picture__img').alt = description;
    element.querySelector('.picture__likes').textContent = likes;
    element.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(element);
  });

  picturesContainer.appendChild(fragment);
};

export { drawSimilarPhoto };
