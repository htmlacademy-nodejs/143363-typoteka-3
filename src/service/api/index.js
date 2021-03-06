'use strict';
const {Router} = require(`express`);
const {FILE_NAME} = require(`../../constants`);
const getMockData = require(`../lib/get-mock-data`);

const {CategoryService, ArticleService, CommentService, SearchService} = require(`../data-service`);

const articles = require(`./articles`);
const categories = require(`./categories`);
const search = require(`./search`);

module.exports = async () => {
  const app = new Router();
  const mockData = await getMockData(FILE_NAME);

  categories(app, new CategoryService(mockData));
  articles(app, new ArticleService(mockData), new CommentService());
  search(app, new SearchService(mockData));

  return app;
};
