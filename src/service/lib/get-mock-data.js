'use strict';

const fs = require(`fs`).promises;
const {red} = require(`chalk`);
const {FILE_NAME} = require(`../../constants`);
let data = null;

const getMockData = async () => {
  if (data) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILE_NAME, {encoding: `utf-8`});
    data = JSON.parse(fileContent);
    return Promise.resolve(data);
  } catch (e) {
    console.error(red(`Не удалось прочитать файл ${FILE_NAME}: ${e}`));
    return Promise.reject(e);
  }
};

module.exports = getMockData;
