'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`./constants`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  const array = someArray.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
  }
  return array;
};

const getRandomItem = (array) => array[getRandomInt(0, array.length - 1)];

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateComments = (comments, count) => {
  return shuffle(comments).slice(0, count).map((text) => ({id: nanoid(MAX_ID_LENGTH), text}));
};

const getStartDate = (periodInMonth) => {
  const date = new Date();
  date.setMonth(date.getMonth() - periodInMonth);
  return date;
};

module.exports = {
  getRandomInt,
  shuffle,
  getRandomItem,
  getRandomDate,
  getStartDate,
  generateComments,
};
