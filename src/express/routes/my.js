'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const myRouter = new Router();
const api = getAPI();

myRouter.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles();
  return res.render(`comments`, {noBg: true, articles});
});

myRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  return res.render(`my`, {admin: true, noBg: true, articles});
});

module.exports = myRouter;
