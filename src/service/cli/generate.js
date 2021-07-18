'use strict';

const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const fs = require(`fs`).promises;
const {getRandomInt, shuffle, getRandomItem, getRandomDate, getStartDate, generateComments} = require(`../../utils`);
const {MAX_COUNT, DEFAULT_COUNT, MAX_ANNOUNCE_LENGTH, FILE_NAME, PERIOD_MONTH, ExitCodes, MAX_ID_LENGTH} = require(`../../constants`);

const TITLES_FILE = `./data/titles.txt`;
const SENTENCES_FILE = `./data/sentences.txt`;
const CATEGORIES_FILE = `./data/categories.txt`;
const COMMENTS_FILE = `./data/comments.txt`;

const readContent = async (fileName) => {
  try {
    const content = await fs.readFile(fileName, {encoding: `utf-8`});
    return content.trim().split(`\n`);
  } catch (e) {
    console.error(chalk.red(`Не удалось прочитать файл ${fileName}: ${e}`));
    return [];
  }
};

const generateData = (count, titles, sentences, categories, comments) => Array(count).fill({}).map(() => ({
  id: nanoid(MAX_ID_LENGTH),
  title: getRandomItem(titles),
  createdDate: getRandomDate(getStartDate(PERIOD_MONTH), new Date()).toLocaleString(`ru`),
  announce: shuffle(sentences).slice(0, getRandomInt(1, MAX_ANNOUNCE_LENGTH)).join(` `),
  fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length)).join(` `),
  category: shuffle(categories).slice(0, getRandomInt(1, categories.length)),
  comments: generateComments(comments, getRandomInt(1, comments.length))
}));

module.exports = {
  name: `--generate`,
  run: async (args) => {
    const [count] = args;
    const publicationsCount = parseInt(count, 10) || DEFAULT_COUNT;
    if (publicationsCount > MAX_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_COUNT} публикаций`));
      process.exit(ExitCodes.ERROR);
    }

    const titles = await readContent(TITLES_FILE);
    const sentences = await readContent(SENTENCES_FILE);
    const categories = await readContent(CATEGORIES_FILE);
    const comments = await readContent(COMMENTS_FILE);

    const content = JSON.stringify(generateData(publicationsCount, titles, sentences, categories, comments));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Тестовые данные созданы успешно. См. файл ${FILE_NAME}`));
    } catch (err) {
      console.info(chalk.red(`Не удалось сгенерировать тестовые данные: ${err}`));
      process.exit(ExitCodes.ERROR);
    }
  }
};
