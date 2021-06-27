'use strict';

class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    const categories = this._articles.reduce((acc, article) => {
      article.сategory.forEach((c) => acc.add(c));
      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
