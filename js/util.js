const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

function createIdGenerator() {
  let lastGeneratedID = 0;

  return () => {
    lastGeneratedID += 1;
    return lastGeneratedID;
  };
}

const isEscape = (evt) => evt.key === 'Escape';

export { getRandomInteger, getRandomArrayElement, createIdGenerator, isEscape };
