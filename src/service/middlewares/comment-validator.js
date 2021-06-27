'use strict';

const {HttpCode} = require(`../../constants`);

const commentKeys = [`text`];

module.exports = (req, res, next) => {
  const comment = req.body;
  const keys = Object.keys(comment);
  const keysExist = commentKeys.every((k) => keys.includes(k));

  if (!keysExist) {
    res.status(HttpCode.BAD_REQUEST).json(`Bad request`);
  } else {
    next();
  }
};
