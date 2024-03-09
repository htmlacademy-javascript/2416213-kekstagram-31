const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENTS_MAX_COUNT = 30;
const SIMILAR_PHOTO_COUNT = 25;
const NAMES = [
  'Даниил',
  'Лилия',
  'Мария',
  'Дарья',
  'Марина',
  'Виктория',
  'Елена',
  'Надежда',
  'Дарина',
  'Диана',
  'Евгения',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'На охоте',
  'В клубе',
  'С друзьями',
  'Встреча',
  'Отпуск',
  'На работе',
  'Дество',
  'Семья',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

function createIdGenerator() {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId++;
    return lastGeneratedId;
  };
}

const generateCommentsId = createIdGenerator();

const createMessage = () =>
  Array.from({ length: getRandomInteger(1, 2) }, () =>
    getRandomArrayElement(MESSAGES)
  ).join(' ');

function createComment() {
  return {
    id: generateCommentsId(),
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(NAMES),
  };
}

const createPhotoPublication = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from(
    { length: getRandomInteger(0, COMMENTS_MAX_COUNT) },
    () => createComment()
  ),
});

const similarPhoto = () =>
  Array.from({ length: SIMILAR_PHOTO_COUNT }, (_, pictureIndex) =>
    createPhotoPublication(pictureIndex + 1)
  );

similarPhoto();
