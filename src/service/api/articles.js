'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExists = require(`../middlewares/article-exists`);
const commentValidator = require(`../middlewares/comment-validator`);

const route = new Router();
module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    return res.status(HttpCode.OK).json(articles);
  });

  route.get(`/:articleId`, articleExists(articleService), (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    return res.status(HttpCode.OK).json(article);
  });

  route.post(`/`, [articleValidator], (req, res) => {
    const article = req.body;
    const newArticle = articleService.create(article);

    return res.status(HttpCode.CREATED).json(newArticle);
  });

  route.put(`/:articleId`, [articleExists(articleService), articleValidator], (req, res) => {
    const {articleId} = req.params;

    const updatedArticle = articleService.update(articleId, req.body);
    return res.status(HttpCode.OK).json(updatedArticle);
  });

  route.delete(`/:articleId`, articleExists(articleService), (req, res) => {
    const {articleId} = req.params;
    const deletedArticle = articleService.drop(articleId);
    return res.status(HttpCode.OK).json(deletedArticle);
  });

  route.get(`/:articleId/comments`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;
    const comments = commentService.findAll(article);

    return res.status(HttpCode.OK).json(comments);
  });

  route.post(`/:articleId/comments`, [articleExists(articleService), commentValidator], (req, res) => {
    const {article} = res.locals;
    const comment = req.body;

    const addedComment = commentService.create(article, comment);
    return res.status(HttpCode.OK).json(addedComment);
  });

  route.delete(`/:articleId/comments/:commentId`, [articleExists(articleService)], (req, res) => {
    const {article} = res.locals;
    const {commentId} = req.params;

    const deletedComment = commentService.drop(article, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND).json(`Not found comment with id ${commentId}`);
    }

    return res.status(HttpCode.OK).json(deletedComment);
  });

};
