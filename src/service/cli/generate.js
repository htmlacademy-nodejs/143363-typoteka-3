'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {getRandomInt, shuffle, getRandomItem, getRandomDate, getStartDate} = require(`../../utils`);
const {MAX_COUNT, DEFAULT_COUNT, MAX_ANNOUNCE_LENGTH, FILE_NAME, PERIOD_MONTH, ExitCodes} = require(`../../constants`);

const TITLES_FILE = `./data/titles.txt`;
const SENTENCES_FILE = `./data/sentences.txt`;
const CATEGORIES_FILE = `./data/categories.txt`;

const readContent = async (fileName) => {
  try {
    const content = await fs.readFile(fileName, {encoding: `utf-8`});
    return content.trim().split(`\n`);
  } catch (e) {
    console.error(chalk.red(`Не удалось прочитать файл ${fileName}: ${e}`));
    return [];
  }
};

const generateData = (count, titles, sentences, categories) => Array(count).fill({}).map(() => ({
  title: getRandomItem(titles),
  createdDate: getRandomDate(getStartDate(PERIOD_MONTH), new Date()).toLocaleString(`ru`),
  announce: shuffle(sentences).slice(0, getRandomInt(1, MAX_ANNOUNCE_LENGTH)).join(` `),
  fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length)).join(` `),
  сategory: shuffle(categories).slice(0, getRandomInt(1, categories.length)),
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

    const content = JSON.stringify(generateData(publicationsCount, titles, sentences, categories));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Тестовые данные созданы успешно. См. файл ${FILE_NAME}`));
    } catch (err) {
      console.info(chalk.red(`Не удалось сгенерировать тестовые данные: ${err}`));
      process.exit(ExitCodes.ERROR);
    }
  }
};
