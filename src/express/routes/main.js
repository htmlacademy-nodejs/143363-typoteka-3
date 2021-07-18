'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const mainRouter = new Router();
const api = getAPI();

mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/categories`, (req, res) => res.render(`all-categories`, {noBg: true}));
mainRouter.get(`/search`, async (req, res) => {
  const {search} = req.query;
  let results = [];
  try {
    results = await api.search(search);
  } catch (e) {
    //
  }
  return res.render(`search`, {searchPage: true, results});
});

mainRouter.get(`/add`, (req, res) => res.render(`new-post`));

mainRouter.get(`/`, async (req, res) => {
  const [articles, categories] = await Promise.all([api.getArticles(), api.getCategories()]);
  return res.render(`main`, {articles, categories});
});

module.exports = mainRouter;
