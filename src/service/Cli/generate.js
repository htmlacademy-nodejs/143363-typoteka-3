'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`);
const {getRandomInt, shuffle, getRandomItem, getRandomDate, getStartDate} = require(`../../utils`);
const {MAX_COUNT, DEFAULT_COUNT, MAX_ANNOUNCE_LENGTH, FILE_NAME, PERIOD_MONTH, TITLES, CATEGORIES, ANNOUNCES, ExitCodes} = require(`../../constants`);

const generateData = (count) => Array(count).fill({}).map(() => ({
  title: getRandomItem(TITLES),
  createdDate: getRandomDate(getStartDate(PERIOD_MONTH), new Date()).toLocaleString(`ru`),
  announce: shuffle(ANNOUNCES).slice(0, getRandomInt(1, MAX_ANNOUNCE_LENGTH)).join(` `),
  fullText: shuffle(ANNOUNCES).slice(0, getRandomInt(1, ANNOUNCES.length)).join(` `),
  сategory: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length)),
}));

module.exports = {
  name: `--generate`,
  run: (args) => {
    const [count] = args;
    const publicationsCount = parseInt(count, 10) || DEFAULT_COUNT;
    if (publicationsCount > MAX_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_COUNT} публикаций`));
      process.exit(ExitCodes.ERROR);
    }

    const content = JSON.stringify(generateData(publicationsCount));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.info(chalk.red(`Не удалось сгенерировать тестовые данные: ${err}`));
        process.exit(ExitCodes.ERROR);
      }

      console.info(chalk.green(`Тестовые данные созданы успешно. См. файл ${FILE_NAME}`));
    });
  }
};
