'use strict';

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    const article = this._articles.find((a) => a.id === id);
    return article || null;
  }

  create(article) {
    const newArticle = {comments: [], createdDate: new Date().toLocaleString(`ru`), ...article};

    this._articles.push(newArticle);
    return newArticle;
  }

  update(id, article) {
    const oldArticle = this.findOne(id);
    return Object.assign(oldArticle, article);
  }

  drop(id) {
    const droppedArticle = this.findOne(id);
    this._articles = this._articles.filter((a) => a.id !== id);
    return droppedArticle;
  }
}

module.exports = ArticleService;
