const COMMENTS_STEP = 5;

const commentsList = document.querySelector('.social__comments');
const commentsLoaderButton = document.querySelector('.comments-loader');
const shownCommentsCount = document.querySelector(
  '.social__comment-shown-count'
);
const commentListFragment = document.createDocumentFragment();
const commentTemplate = commentsList.children[0].cloneNode(true);

const createCommentElement = (item) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = item.avatar;
  commentElement.querySelector('.social__picture').alt = item.name;
  commentElement.querySelector('.social__text').textContent = item.message;

  return commentElement;
};

const renderComments = (commentArray) => {
  let commentCounter = 0;

  const showNextComments = () => {
    const startIndex = commentCounter * COMMENTS_STEP;
    const endIndex =
      startIndex + COMMENTS_STEP > commentArray.length
        ? commentArray.length
        : startIndex + COMMENTS_STEP;

    for (let i = startIndex; i < endIndex; i++) {
      commentListFragment.append(createCommentElement(commentArray[i]));
    }

    commentCounter++;
    shownCommentsCount.textContent = endIndex;
    commentsLoaderButton.classList.toggle(
      'hidden',
      endIndex === commentArray.length
    );
    commentsList.append(commentListFragment);
  };

  commentsList.innerHTML = '';
  showNextComments();

  commentsLoaderButton.addEventListener('click', showNextComments);
};

export default renderComments;
