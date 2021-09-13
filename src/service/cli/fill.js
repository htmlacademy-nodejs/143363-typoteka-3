'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {getRandomInt, shuffle, getRandomItem} = require(`../../utils`);
const {MAX_COUNT, MAX_ANNOUNCE_LENGTH, ExitCodes} = require(`../../constants`);

const DEFAULT_COUNT = 3;
const MIN_COMMENTS_COUNT = 2;
const FILE_NAME = `fill-db.sql`;
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

const users = [
  {
    avatar: `photo01.jpg`,
    name: `Василий`,
    lastName: `Орлов`,
    email: `orlov@test.ru`,
    passwordHash: `5f4dcc3b5aa76523d61d8327deb882cf13`,
  },
  {
    avatar: `photo02.jpg`,
    name: `Иван`,
    lastName: `Ульянченко`,
    email: `ivan@test.ru`,
    passwordHash: `5f4dcc3b125aa76523d61d8327deb2cf13`,
  },
];

const generateComments = (comments, count, usersLength, articleId) => {
  return Array(count).fill({}).map(() => ({
    articleId,
    userId: getRandomInt(1, usersLength),
    text: shuffle(comments).slice(1, count).join(` `),
  }));
};


const generateData = (count, titles, sentences, categoryCount, comments, usersCount) => Array(count).fill({}).map((_, index) => ({
  title: getRandomItem(titles),
  announce: shuffle(sentences).slice(0, getRandomInt(1, MAX_ANNOUNCE_LENGTH)).join(` `),
  fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length)).join(` `),
  category: shuffle(Array.from({length: categoryCount}, (__, i) => i + 1)).slice(0, getRandomInt(1, categoryCount)),
  photo: `photo-${index}.jpg`,
  comments: generateComments(comments, getRandomInt(MIN_COMMENTS_COUNT, comments.length), usersCount, index + 1),
  userId: getRandomInt(1, usersCount)
}));

module.exports = {
  name: `--fill`,
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
    const commentsSentences = await readContent(COMMENTS_FILE);

    const articles = generateData(publicationsCount, titles, sentences, categories.length, commentsSentences, users.length);
    const comments = articles.flatMap(((article) => article.comments));
    const articleCategories = articles.flatMap((article, index) => {
      return article.category.map((category) => ({articleId: index + 1, categoryId: category}));
    });

    const categoriesValues = categories.map((c) => `('${c}')`).join(`,\n`);

    const userValues = users.map(({avatar, name, lastName, email, passwordHash}) =>`('${avatar}', '${name}', '${lastName}', '${email}', '${passwordHash}')`).join(`,\n`);

    const articlesValues = articles.map(({title, announce, fullText, photo, userId}) => `('${title}', '${announce}', '${fullText}', '${photo}', ${userId})`).join(`,\n`);

    const commentValues = comments.map(({userId, articleId, text})=> `(${userId}, ${articleId}, '${text}')`).join(`,\n`);

    const articleCategoriesValues = articleCategories.map(({articleId, categoryId}) => `(${articleId}, ${categoryId})`).join(`,\n`);

    const content = `INSERT INTO users(avatar, name, last_name,email, password_hash) VALUES \n${userValues};\n\nINSERT INTO categories(name) VALUES \n${categoriesValues};\n\nALTER TABLE articles DISABLE TRIGGER ALL;\nINSERT INTO articles(title, announce, full_text, photo, user_id) VALUES \n${articlesValues};\nALTER TABLE articles ENABLE TRIGGER ALL;\n\nALTER TABLE articles_categories DISABLE TRIGGER ALL;\nINSERT INTO articles_categories(article_id, category_id) VALUES \n${articleCategoriesValues};\nALTER TABLE articles_categories ENABLE TRIGGER ALL;\n\nALTER TABLE comments DISABLE TRIGGER ALL;\nINSERT INTO comments(user_id, article_id, text) VALUES \n${commentValues};\nALTER TABLE comments ENABLE TRIGGER ALL;`;

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Тестовые данные созданы успешно. См. файл ${FILE_NAME}`));
    } catch (err) {
      console.info(chalk.red(`Не удалось сгенерировать тестовые данные: ${err}`));
      process.exit(ExitCodes.ERROR);
    }
  }
};
