'use strict';
const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    const {query} = req.query;

    if (!query) {
      return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
    }

    const results = service.findAll(query);

    if (results.length === 0) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }
    return res.status(HttpCode.OK).json(results);
  });
};
