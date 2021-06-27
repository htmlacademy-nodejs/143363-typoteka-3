'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll(query) {
    return this._articles.filter((a) => {
      return a.title.toLowerCase().includes(query.toLowerCase());
    });
  }
}

module.exports = SearchService;
