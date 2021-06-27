'use strict';

const {HttpCode} = require(`../../constants`);

const articleKeys = [`title`, `announce`, `fullText`, `сategory`];


module.exports = (req, res, next) => {
  const article = req.body;
  const keys = Object.keys(article);
  const keysExists = articleKeys.every((k) => keys.includes(k));

  if (!keysExists) {
    res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  } else {
    next();
  }
};
