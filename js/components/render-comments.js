const COMMENTS_STEP = 5;

const commentsListElement = document.querySelector('.social__comments');
const shownCommentsCountElement = document.querySelector(
  '.social__comment-shown-count'
);
const commentListFragment = document.createDocumentFragment();
const commentTemplate = commentsListElement.children[0].cloneNode(true);

const createCommentElement = (item) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = item.avatar;
  commentElement.querySelector('.social__picture').alt = item.name;
  commentElement.querySelector('.social__text').textContent = item.message;

  return commentElement;
};

const renderComments = (commentArray) => {
  const loaderButtonElement = document.querySelector('.comments-loader');

  let commentCounter = 0;

  const onShowNextComments = () => {
    const startIndex = commentCounter * COMMENTS_STEP;
    const endIndex =
      startIndex + COMMENTS_STEP > commentArray.length
        ? commentArray.length
        : startIndex + COMMENTS_STEP;

    for (let i = startIndex; i < endIndex; i++) {
      commentListFragment.append(createCommentElement(commentArray[i]));
    }

    commentCounter++;
    shownCommentsCountElement.textContent = endIndex;
    loaderButtonElement.classList.toggle(
      'hidden',
      endIndex === commentArray.length
    );
    commentsListElement.append(commentListFragment);
  };

  commentsListElement.innerHTML = '';
  onShowNextComments();

  loaderButtonElement.addEventListener('click', onShowNextComments);
};

export default renderComments;
