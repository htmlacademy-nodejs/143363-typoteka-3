'use strict';

const axios = require(`axios`);
const {DEFAULT_PORT, TIMEOUT} = require(`../constants`);

class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout
    });
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

  getArticles() {
    return this._load(`/articles`);
  }

  getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  createArticle(data) {
    return this._load(`/articles`, {data, method: `POST`});
  }

  getCategories() {
    return this._load(`/categories`);
  }

  search(query) {
    return this._load(`/search`, {params: {query}});
  }
}

const port = process.env.API_PORT || DEFAULT_PORT;
const baseURL = `http://localhost:${port}/api`;
const apiInstanse = new API(baseURL, TIMEOUT);

module.exports = {
  API,
  getAPI: () => apiInstanse
};
